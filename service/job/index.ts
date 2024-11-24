import { Request, Response } from "express"
import { Controller, resources } from "express-ext"
import { Log, Manager, Search } from "onecore"
import { DB, Repository, SearchBuilder } from "query-core"
import { getView } from "../../core"
import { Job, JobFilter, jobModel, JobRepository, JobService } from "./job"
export * from "./job"

export class SqlJobRepository extends Repository<Job, string> implements JobRepository {
  constructor(db: DB) {
    super(db, "jobs", jobModel)
  }
}
export class JobManager extends Manager<Job, string, JobFilter> implements JobService {
  constructor(search: Search<Job, JobFilter>, repository: JobRepository) {
    super(search, repository)
  }
}
export class JobController extends Controller<Job, string, JobFilter> {
  constructor(log: Log, protected jobService: JobService) {
    super(log, jobService)
    this.render = this.render.bind(this)
  }
  render(req: Request, res: Response) {
    const filter: JobFilter = {
      limit: resources.defaultLimit,
      // title: "Java",
    }
    this.jobService.search(filter, 6).then((result) => {
      res.render(getView(req, "careers"), {
        list: result.list,
      })
    })
  }
}

export function useJobService(db: DB): JobService {
  const builder = new SearchBuilder<Job, JobFilter>(db.query, "jobs", jobModel, db.driver)
  const repository = new SqlJobRepository(db)
  return new JobManager(builder.search, repository)
}
export function useJobController(log: Log, db: DB): JobController {
  return new JobController(log, useJobService(db))
}
