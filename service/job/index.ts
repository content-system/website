import { Request, Response } from "express"
import {
  buildPages,
  buildPageSearch,
  buildSortFromRequest,
  buildSortSearch,
  cloneFilter,
  Controller,
  format,
  fromRequest,
  getSearch,
  getView,
  hasSearch,
  queryNumber,
  resources,
} from "express-ext"
import { Log, Manager, Search } from "onecore"
import { DB, Repository, SearchBuilder } from "query-core"
import { formatDateTime, getDateFormat } from "ui-formatter"
import { getResource } from "../../resources"
import { Job, JobFilter, jobModel, JobRepository, JobService } from "./job"
export * from "./job"

export class SqlJobRepository extends Repository<Job, string> implements JobRepository {
  constructor(db: DB) {
    super(db, "jobs", jobModel)
  }
}
export class JobUseCase extends Manager<Job, string, JobFilter> implements JobService {
  constructor(search: Search<Job, JobFilter>, repository: JobRepository) {
    super(search, repository)
  }
}

const fields = ["title", "publishedAt", "description"]
export class JobController extends Controller<Job, string, JobFilter> {
  constructor(log: Log, protected jobService: JobService) {
    super(log, jobService)
    this.render = this.render.bind(this)
  }
  render(req: Request, res: Response) {
    const dateFormat = getDateFormat()
    const resource = getResource()
    let filter: JobFilter = {
      limit: resources.defaultLimit,
      // title: "Java",
    }
    if (hasSearch(req)) {
      filter = fromRequest<JobFilter>(req)
      format(filter, ["publishedAt"])
    }
    const page = queryNumber(req, resources.page, 1)
    const limit = queryNumber(req, resources.limit, resources.defaultLimit)
    this.jobService.search(cloneFilter(filter, page, limit), limit, page).then((result) => {
      for (const item of result.list) {
        item.publishedAt = formatDateTime(item.publishedAt, dateFormat)
      }
      const search = getSearch(req.url)
      const sort = buildSortFromRequest(req)
      res.render(getView(req, "careers"), {
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

export function useJobService(db: DB): JobService {
  const builder = new SearchBuilder<Job, JobFilter>(db.query, "jobs", jobModel, db.driver)
  const repository = new SqlJobRepository(db)
  return new JobUseCase(builder.search, repository)
}
export function useJobController(log: Log, db: DB): JobController {
  return new JobController(log, useJobService(db))
}
