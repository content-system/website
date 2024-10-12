import { merge } from "config-plus"
import dotenv from "dotenv"
import express, { json, Request, Response } from "express"
import { allow, MiddlewareLogger } from "express-ext"
import http from "http"
import { createLogger } from "logger-core"
import nunjucks from "nunjucks"
import { Pool } from "pg"
import { PoolManager } from "pg-extension"
import { config, env } from "./config"
import { useContext } from "./context"
import { route } from "./route"

dotenv.config()
const conf = merge(config, process.env, env, process.env.ENV)

const app = express()
// Define public folder :
app.use(express.static(__dirname + "/public"))
// Setup views folder :
app.set("views", __dirname + "/views")
// Setup view engine :
// Setting Nunjucks as default view
nunjucks.configure("views", {
  autoescape: false,
  express: app,
})
app.set("view engine", "html")

const logger = createLogger(conf.log)
const middleware = new MiddlewareLogger(logger.info, conf.middleware)
app.use(allow(conf.allow), json(), middleware.log)

const pool = new Pool(conf.db)
const db = new PoolManager(pool)
const ctx = useContext(db, logger, middleware)
route(app, ctx)

app.get("/", (req: Request, res: Response) => {
  res.render("index", {
    message: "Welcome in Express",
  })
})
app.get("/works", (req: Request, res: Response) => {
  res.render("works", {
    message: "Welcome in works Express",
  })
})
app.get("/services", (req: Request, res: Response) => {
  res.render("services", {
    message: "Welcome in services Express",
  })
})
app.get("/news", (req: Request, res: Response) => {
  res.render("news", {
    message: "Welcome in news Express",
  })
})
app.get("/careers", (req: Request, res: Response) => {
  res.render("careers", {
    message: "Welcome in careers Express",
  })
})
app.get("/contact", (req: Request, res: Response) => {
  res.render("contact", {
    message: "Welcome in contact Express",
  })
})
app.get("/milestones", (req: Request, res: Response) => {
  res.render("milestones", {
    message: "Welcome in milestones Express",
  })
})
app.get("/companies", (req: Request, res: Response) => {
  res.render("companies", {
    message: "Welcome in companies Express",
  })
})
app.get("/leadership", (req: Request, res: Response) => {
  res.render("leadership", {
    message: "Welcome in leadership Express",
  })
})

http.createServer(app).listen(conf.port, () => {
  console.log("Start server at port " + conf.port)
})
