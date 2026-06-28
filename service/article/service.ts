import { SavedRepository, SearchResult } from "onecore"
import { SavedService } from "saved-service"
import { Article, ArticleFilter, ArticleRepository, ArticleService } from "./article"

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
