import { SavedRepository, SavedService, SearchResult } from "onecore"
import { SqlSavedRepository } from "pg-extension"
import { DB } from "sql-core"
import { Article, ArticleFilter, ArticleRepository, ArticleService } from "./article"
import { ArticleController } from "./controller"
import { SqlArticleRepository } from "./repository"
export * from "./controller"

export class ArticleUseCase extends SavedService<string, string> implements ArticleService {
  constructor(private repository: ArticleRepository, savedRepository: SavedRepository<string, string>, max: number) {
    super(savedRepository, max)
  }
  search(filter: ArticleFilter, limit: number, page?: number, fields?: string[]): Promise<SearchResult<Article>> {
    return this.repository.search(filter, limit, page, fields)
  }
  load(id: string, userId?: string): Promise<Article | null> {
    return this.repository.load(id, userId)
  }
}

export function useArticleController(db: DB): ArticleController {
  const repository = new SqlArticleRepository(db)
  const savedRepository = new SqlSavedRepository(db, "saved_articles", "user_id", "id", "saved_at")
  const service = new ArticleUseCase(repository, savedRepository, 200)
  return new ArticleController(service)
}
