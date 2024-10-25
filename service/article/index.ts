import { Request, Response } from "express"
import { Controller } from "express-ext"
import { Log, Manager, Search } from "onecore"
import { DB, Repository, SearchBuilder } from "query-core"
import { getView } from "../../core"
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
    const filter: ArticleFilter = {
      title: "FPT Software",
    }
    this.articleService.search(filter, 6).then((result) => {
      res.render(getView(req, "news"), {
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
