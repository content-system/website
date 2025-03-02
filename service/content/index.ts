import { Request, Response } from "express"
import { getView, toString } from "express-ext"
import { Log } from "onecore"
import { DB } from "query-core"
import { MenuItemLoader, renderItems } from "../common/navigation"
import { getResource } from "../resources"
import { Content, ContentRepository, ContentService } from "./content"
export * from "./content"

export class SqlContentRepository implements ContentRepository {
  constructor(protected db: DB) {}
  load(id: string, lang: string): Promise<Content | null> {
    return this.db.query<Content>("select id, lang, body from contents where id = $1 and lang = $2", [id, lang]).then((rows) => {
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
  constructor(private service: ContentService, private log: Log, private langs: string[], private menuLoader: MenuItemLoader) {
    this.view = this.view.bind(this)
  }
  view(req: Request, res: Response) {
    let id = req.params["id"]
    let lang = req.params["lang"]
    if (!id && !lang) {
      id = "home"
      lang = "en"
    }
    if (!lang) {
      lang = "en"
    }
    if (this.langs.includes(id)) {
      lang = id
      id = "home"
    }
    const resource = getResource(req, lang)
    this.service
      .load(id, lang)
      .then((content) => {
        if (!content) {
          res.render(getView(req, "error-404"), { resource })
        } else {
          this.menuLoader.load().then((items) => {
            res.render(getView(req, "content"), {
              resource,
              content,
              menu: renderItems(items),
            })
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
export function useContentController(db: DB, log: Log, langs: string[], menuLoader: MenuItemLoader): ContentController {
  return new ContentController(useContentService(db), log, langs, menuLoader)
}
