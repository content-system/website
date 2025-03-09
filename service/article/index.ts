import { Request, Response } from "express"
import {
  buildMessage,
  buildPages,
  buildPageSearch,
  buildSortSearch,
  cloneFilter,
  escapeArray,
  format,
  fromRequest,
  getSearch,
  getView,
  hasSearch,
  query,
  queryNumber,
  queryPage,
  resources,
  toString,
} from "express-ext"
import { Log, Manager, Search } from "onecore"
import { DB, Repository, SearchBuilder } from "query-core"
import { formatDateTime, getDateFormat } from "ui-formatter"
import { buildError404, buildError500, getResource } from "../resources"
import { Article, ArticleFilter, articleModel, ArticleRepository, ArticleService } from "./article"
export * from "./article"

export class SqlArticleRepository extends Repository<Article, string> implements ArticleRepository {
  constructor(db: DB) {
    super(db, "articles", articleModel)
  }
}
export class ArticleUseCase extends Manager<Article, string, ArticleFilter> implements ArticleService {
  constructor(search: Search<Article, ArticleFilter>, repository: ArticleRepository) {
    super(search, repository)
  }
}

const fields = ["title", "publishedAt", "description"]
export class ArticleController {
  constructor(private service: ArticleService, private log: Log) {
    this.view = this.view.bind(this)
    this.search = this.search.bind(this)
  }
  view(req: Request, res: Response) {
    const resource = getResource(query(req, "lang"))
    const dateFormat = getDateFormat()
    const id = req.params["id"]
    this.service
      .load(id)
      .then((article) => {
        if (!article) {
          res.render(getView(req, "error"), buildError404(resource, res))
        } else {
          article.publishedAt = formatDateTime(article.publishedAt, dateFormat)
          res.render(getView(req, "article"), {
            resource,
            article,
          })
        }
      })
      .catch((err) => {
        this.log(toString(err))
        res.render(getView(req, "error"), buildError500(resource, res))
      })
  }
  search(req: Request, res: Response) {
    const resource = getResource(query(req, "lang"))
    const dateFormat = getDateFormat()
    let filter: ArticleFilter = {
      limit: resources.defaultLimit,
      q: "",
    }
    if (hasSearch(req)) {
      filter = fromRequest<ArticleFilter>(req)
      format(filter, ["publishedAt"])
    }
    const page = queryPage(req, filter)
    const limit = queryNumber(req, resources.limit, resources.defaultLimit)
    this.service
      .search(cloneFilter(filter, page, limit), limit, page)
      .then((result) => {
        const list = escapeArray(result.list)
        for (const item of result.list) {
          item.publishedAt = formatDateTime(item.publishedAt, dateFormat)
        }
        const search = getSearch(req.url)
        res.render(getView(req, "news"), {
          resource,
          limits: resources.limits,
          filter,
          list,
          pages: buildPages(limit, result.total),
          pageSearch: buildPageSearch(search),
          sort: buildSortSearch(search, fields, filter.sort),
          message: buildMessage(resource, list, limit, page, result.total),
        })
      })
      .catch((err) => {
        this.log(toString(err))
        res.render(getView(req, "error"), buildError500(resource, res))
      })
  }
}
export function useArticleService(db: DB): ArticleService {
  const builder = new SearchBuilder<Article, ArticleFilter>(db.query, "articles", articleModel, db.driver)
  const repository = new SqlArticleRepository(db)
  return new ArticleUseCase(builder.search, repository)
}
export function useArticleController(db: DB, log: Log): ArticleController {
  return new ArticleController(useArticleService(db), log)
}
