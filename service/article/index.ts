import { SqlSavedRepository } from "pg-extension"
import { DB } from "sql-core"
import { ArticleController } from "./controller"
import { SqlArticleRepository } from "./repository"
import { ArticleUseCase } from "./service"
export * from "./controller"

export function useArticleController(db: DB): ArticleController {
  const repository = new SqlArticleRepository(db)
  const savedRepository = new SqlSavedRepository(db, "saved_articles", "user_id", "id", "saved_at")
  const service = new ArticleUseCase(repository, savedRepository, 200)
  return new ArticleController(service)
}
