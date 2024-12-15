import { Authenticator, initializeStatus, SqlAuthTemplateConfig, useUserRepository } from "authen-service"
import { compare } from "bcrypt"
import { HealthController, LogController, Logger, Middleware, MiddlewareController, resources } from "express-ext"
import { generateToken } from "jsonwebtoken-plus"
import { StringMap } from "onecore"
import { createChecker, DB } from "query-core"
import { check } from "types-validation"
import { createValidator } from "xvalidators"
import { ArticleController, useArticleController } from "./article"
import { LoginController } from "./authentication"
import { ContactController, useContactController } from "./contact"
import { JobController, useJobController } from "./job"
import { UserController, useUserController } from "./user"

resources.createValidator = createValidator
resources.check = check

export interface Config {
  cookie?: boolean
  auth: SqlAuthTemplateConfig
  map: StringMap
}
export interface ApplicationContext {
  health: HealthController
  log: LogController
  middleware: MiddlewareController
  login: LoginController
  user: UserController
  article: ArticleController
  job: JobController
  contact: ContactController
}

export function useContext(db: DB, logger: Logger, midLogger: Middleware, cfg: Config): ApplicationContext {
  const log = new LogController(logger)
  const middleware = new MiddlewareController(midLogger)
  const sqlChecker = createChecker(db)
  const health = new HealthController([sqlChecker])

  const auth = cfg.auth
  const status = initializeStatus(cfg.auth.status)
  const userRepository = useUserRepository<string, SqlAuthTemplateConfig>(db, cfg.auth, cfg.map)
  const authenticator = new Authenticator(
    status,
    compare,
    generateToken,
    auth.token,
    auth.payload,
    auth.account,
    userRepository,
    undefined,
    auth.lockedMinutes,
    2,
  )
  const login = new LoginController(authenticator)

  const user = useUserController(logger.error, db)
  const article = useArticleController(db, logger.error)
  const job = useJobController(db, logger.error)
  const contact = useContactController(db, logger.error)

  return { health, log, middleware, login, user, article, job, contact }
}
