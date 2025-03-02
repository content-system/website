import { Request, Response } from "express"
import { getView, toString } from "express-ext"
import { Log } from "onecore"
import { DB } from "query-core"
import { getResource } from "../resources"
import { Content, ContentRepository, ContentService } from "./content"
export * from "./content"

export class SqlContentRepository implements ContentRepository {
  constructor(protected db: DB) {}
  load(id: string, lang: string): Promise<Content | null> {
    return this.db.query<Content>("select * from contents where id = $1 and lang = $2", [id, lang]).then((rows) => {
      if (rows.length === 0) {
        return null
      }
      return rows[0]
    })
  }
}
export class ContentUseCase implements ContentService {
  constructor(protected repository: ContentRepository) {}
  load(id: string, lang: string): Promise<Content | null> {
    return this.repository.load(id, lang).then((content) => {
      if (!content) {
        return this.repository.load(id, "en")
      }
      return content
    })
  }
}

export class ContentController {
  constructor(private service: ContentService, private log: Log) {
    this.view = this.view.bind(this)
  }
  view(req: Request, res: Response) {
    const resource = getResource(req)
    const id = req.params["id"]
    this.service
      .load(id, "en")
      .then((content) => {
        if (!content) {
          res.render(getView(req, "error-404"), { resource })
        } else {
          res.render(getView(req, "content"), {
            resource,
            content,
          })
        }
      })
      .catch((err) => {
        this.log(toString(err))
        res.render(getView(req, "error-500"), { resource })
      })
  }
}
export function useContentService(db: DB): ContentService {
  const repository = new SqlContentRepository(db)
  return new ContentUseCase(repository)
}
export function useContentController(db: DB, log: Log): ContentController {
  return new ContentController(useContentService(db), log)
}
