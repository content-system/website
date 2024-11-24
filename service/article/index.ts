import { Request, Response } from "express"
import {
  buildPages,
  buildPageSearch,
  buildSortFromRequest,
  buildSortSearch,
  cloneFilter,
  format,
  fromRequest,
  getSearch,
  getView,
  hasSearch,
  queryNumber,
  resources,
} from "express-ext"
import { Manager, Search } from "onecore"
import { DB, Repository, SearchBuilder } from "query-core"
import { formatDateTime, getDateFormat } from "ui-formatter"
import { getResource } from "../../resources"
import { Article, ArticleFilter, articleModel, ArticleRepository, ArticleService } from "./article"
export * from "./article"

export class SqlArticleRepository extends Repository<Article, string> implements ArticleRepository {
  constructor(db: DB) {
    super(db, "news", articleModel)
  }
}
export class ArticleUseCase extends Manager<Article, string, ArticleFilter> implements ArticleService {
  constructor(search: Search<Article, ArticleFilter>, repository: ArticleRepository) {
    super(search, repository)
  }
}

const fields = ["title", "publishedAt", "description"]
export class ArticleController {
  constructor(protected service: ArticleService) {
    this.render = this.render.bind(this)
  }
  render(req: Request, res: Response) {
    const dateFormat = getDateFormat()
    const resource = getResource()
    let filter: ArticleFilter = {
      limit: resources.defaultLimit,
      q: "",
    }
    if (hasSearch(req)) {
      filter = fromRequest<ArticleFilter>(req)
      format(filter, ["publishedAt"])
    }
    const page = queryNumber(req, resources.page, 1)
    const limit = queryNumber(req, resources.limit, resources.defaultLimit)
    this.service.search(cloneFilter(filter, page, limit), limit, page).then((result) => {
      for (const item of result.list) {
        item.publishedAt = formatDateTime(item.publishedAt, dateFormat)
      }
      const search = getSearch(req.url)
      const sort = buildSortFromRequest(req)
      res.render(getView(req, "news"), {
        resource,
        limits: resources.limits,
        filter,
        list: result.list,
        pages: buildPages(limit, result.total),
        pageSearch: buildPageSearch(search),
        sort: buildSortSearch(search, fields, sort),
      })
    })
  }
}
export function useArticleService(db: DB): ArticleService {
  const builder = new SearchBuilder<Article, ArticleFilter>(db.query, "news", articleModel, db.driver)
  const repository = new SqlArticleRepository(db)
  return new ArticleUseCase(builder.search, repository)
}
export function useArticleController(db: DB): ArticleController {
  return new ArticleController(useArticleService(db))
}
