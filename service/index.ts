import { Application } from "express"
import { check } from "express-ext"
import multer from "multer"
import { ApplicationContext } from "./context"
import { userModel } from "./user"

export * from "./context"

const parser = multer()

export function route(app: Application, ctx: ApplicationContext): void {
  app.get("/health", ctx.health.check)
  app.patch("/log", ctx.log.config)
  app.patch("/middleware", ctx.middleware.config)

  const checkUser = check(userModel)
  app.post("/users/search", ctx.user.search)
  app.get("/users/search", ctx.user.search)
  app.get("/users/:id", ctx.user.load)
  app.post("/users", checkUser, ctx.user.create)
  app.put("/users/:id", checkUser, ctx.user.update)
  app.patch("/users/:id", checkUser, ctx.user.patch)
  app.delete("/users/:id", ctx.user.delete)

  app.get("/news", ctx.article.search)
  app.get("/news/:id", ctx.article.view)

  app.get("/careers", ctx.job.search)
  app.get("/careers/:id", ctx.job.view)

  app.get("/contact", ctx.contact.render)
  app.post("/contact", parser.none(), ctx.contact.submit)
}