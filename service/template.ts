import { Request, Response } from "express"
import { buildError404, buildError500, getView, toString } from "express-ext"
import fs from "fs"
import nunjucks from "nunjucks"
import { Log, StringMap } from "onecore"
import path from "path"
import { datetimeToString } from "ui-formatter"

export class resources {
  static nunjucks: nunjucks.Environment
  static log?: Log
}
export function getTemplateString(name: string, partial?: boolean): string {
  if (partial) {
    const templatePath = path.join("views", "pages/" + name + ".html")
    const template = fs.readFileSync(templatePath, "utf8")
    return template
  } else {
    return '{% extends "layouts/default.html" %} {% block content %}{% include "pages/' + name + '.html" %}{% endblock %}'
  }
}
export function render(req: Request, res: Response, name: string, obj?: any): void {
  const partial = req.query["partial"]
  const template = getTemplateString(name, partial === "true")
  if (obj) {
    obj.datetimeToString = datetimeToString
    obj.menu = res.locals.menu
  }
  const html = resources.nunjucks.renderString(template, obj)
  res.send(html)
}

export function renderError(req: Request, res: Response, obj?: any): void {
  res.render(getView(req, "error"), obj)
}
export function renderError404(req: Request, res: Response, resource: StringMap): void {
  res.render(getView(req, "error"), buildError404(resource, res))
}
export function renderError500(req: Request, res: Response, resource: StringMap, err: any): void {
  if (resources.log) {
    resources.log(toString(err))
  }
  res.render(getView(req, "error"), buildError500(resource, res))
}
