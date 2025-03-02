import { Attributes, Filter, SearchResult, Service, TimeRange } from "onecore"

export interface Article {
  id: string
  title: string
  description?: string
  thumbnail?: string
  publishedAt: Date
  tags?: string[]
  type?: string
  content: string
  author?: string
  status?: string
}

export interface ArticleFilter extends Filter {
  id?: string
  title?: string
  description?: string
  publishedAt?: TimeRange
}

export interface ArticleRepository {
  load(id: string, ctx?: any): Promise<Article | null>
  create(article: Article, ctx?: any): Promise<number>
  update(article: Article, ctx?: any): Promise<number>
  patch(article: Partial<Article>, ctx?: any): Promise<number>
  delete(id: string, ctx?: any): Promise<number>
}
export interface ArticleService extends Service<Article, string, ArticleFilter> {
  load(id: string, ctx?: any): Promise<Article | null>
  create(article: Article, ctx?: any): Promise<number>
  update(article: Article, ctx?: any): Promise<number>
  patch(article: Partial<Article>, ctx?: any): Promise<number>
  delete(id: string, ctx?: any): Promise<number>
  search(s: ArticleFilter, limit: number, offset?: number | string, fields?: string[]): Promise<SearchResult<Article>>
}

export const articleModel: Attributes = {
  id: {
    key: true,
    length: 40,
    required: true,
  },
  author: {
    length: 40,
    required: true,
  },
  title: {
    length: 255,
    required: true,
    q: true,
  },
  description: {
    length: 1000,
    required: true,
    q: true,
  },
  publishedAt: {
    column: "published_at",
    type: "datetime",
  },
  content: {
    length: 5000,
    required: true,
  },
  tags: {
    type: "strings",
  },
  type: {},
}
