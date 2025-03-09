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
export class JobController {
  constructor(private jobService: JobService, private log: Log) {
    this.view = this.view.bind(this)
    this.search = this.search.bind(this)
  }
  view(req: Request, res: Response) {
    const resource = getResource(query(req, "lang"))
    const id = req.params["id"]
    this.jobService
      .load(id)
      .then((job) => {
        if (!job) {
          res.render(getView(req, "error"), buildError404(resource, res))
        } else {
          res.render(getView(req, "job"), {
            resource,
            job,
          })
        }
      })
      .catch((err) => {
        this.log(toString(err))
        res.render(getView(req, "error"), buildError500(resource, res))
      })
  }
  search(req: Request, res: Response) {
    const dateFormat = getDateFormat()
    const resource = getResource(query(req, "lang"))
    let filter: JobFilter = {
      limit: resources.defaultLimit,
      // title: "Java",
    }
    if (hasSearch(req)) {
      filter = fromRequest<JobFilter>(req)
      format(filter, ["publishedAt"])
    }
    const page = queryPage(req, filter)
    const limit = queryNumber(req, resources.limit, resources.defaultLimit)
    this.jobService
      .search(cloneFilter(filter, page, limit), limit, page)
      .then((result) => {
        const list = escapeArray(result.list)
        for (const item of list) {
          item.publishedAt = formatDateTime(item.publishedAt, dateFormat)
        }
        const search = getSearch(req.url)
        res.render(getView(req, "careers"), {
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

export function useJobService(db: DB): JobService {
  const builder = new SearchBuilder<Job, JobFilter>(db.query, "jobs", jobModel, db.driver)
  const repository = new SqlJobRepository(db)
  return new JobUseCase(builder.search, repository)
}
export function useJobController(db: DB, log: Log): JobController {
  return new JobController(useJobService(db), log)
}
