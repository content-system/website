import { Request, Response } from "express"
import { Controller, format, fromRequest } from "express-ext"
import { Log, Manager, Search } from "onecore"
import { DB, Repository, SearchBuilder } from "query-core"
import { addDays, cloneFilter, defaultLimit, formatDateTime, getDateFormat, getOffset, getView, hasParam, pageSizes, queryNumber } from "../../core"
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
export class ArticleController extends Controller<Article, string, ArticleFilter> {
  constructor(log: Log, protected articleService: ArticleService) {
    super(log, articleService)
    this.render = this.render.bind(this)
  }
  render(req: Request, res: Response) {
    const dateFormat = getDateFormat()
    const resource = getResource()
    console.log(req.url)
    let filter: ArticleFilter = {
      q: "",
      limit: defaultLimit,
      publishedAt: {
        max: new Date(),
        min: addDays(new Date(), -60),
      },
    }
    if (hasParam(req)) {
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
      /*
      if (filter.publishedAt) {
        filter.publishedAt.min = datetimeToString(filter.publishedAt.min)
        filter.publishedAt.max = datetimeToString(filter.publishedAt.max)
      }
        */
      res.render(getView(req, "news"), {
        resource,
        pageSizes,
        filter,
        list: result.list,
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
