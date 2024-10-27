import { Request, Response } from "express"
import { buildPages, Controller, format, fromRequest, getOffset, hasQuery, queryNumber } from "express-ext"
import { Log, Manager, Search } from "onecore"
import { DB, Repository, SearchBuilder } from "query-core"
import {
  buildPageSearch,
  buildSortFromRequest,
  buildSortSearch,
  cloneFilter,
  defaultLimit,
  formatDateTime,
  getDateFormat,
  getSearch,
  getView,
  pageSizes,
} from "../../core"
import { getResource } from "../../resources"
import { Article, ArticleFilter, articleModel, ArticleRepository, ArticleService } from "./article"
export * from "./article"

export class SqlArticleRepository extends Repository<Article, string> implements ArticleRepository {
  constructor(db: DB) {
    super(db, "news", articleModel)
  }
}
export class ArticleManager extends Manager<Article, string, ArticleFilter> implements ArticleService {
  constructor(search: Search<Article, ArticleFilter>, repository: ArticleRepository) {
    super(search, repository)
  }
}
const fields = ["title", "publishedAt", "description"]
export class ArticleController extends Controller<Article, string, ArticleFilter> {
  constructor(log: Log, protected articleService: ArticleService) {
    super(log, articleService)
    this.render = this.render.bind(this)
  }
  render(req: Request, res: Response) {
    const dateFormat = getDateFormat()
    const resource = getResource()
    let filter: ArticleFilter = {
      q: "",
      limit: defaultLimit,
    }
    if (hasQuery(req)) {
      filter = fromRequest<ArticleFilter>(req)
      format(filter, ["publishedAt"])
    }
    const page = queryNumber(req, "page", 1)
    const limit = queryNumber(req, "limit", defaultLimit)
    const offset = getOffset(limit, page)
    console.log(JSON.stringify(filter) + " " + limit + " " + offset)
    this.articleService.search(cloneFilter(filter, page, limit), limit, offset).then((result) => {
      for (const item of result.list) {
        item.publishedAt = formatDateTime(item.publishedAt, dateFormat)
      }
      const search = getSearch(req.url)
      console.log("search: " + search)
      const sort = buildSortFromRequest(req)
      res.render(getView(req, "news"), {
        resource,
        pageSizes,
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
  return new ArticleManager(builder.search, repository)
}
export function useArticleController(log: Log, db: DB): ArticleController {
  return new ArticleController(log, useArticleService(db))
}
