import { Request } from "express"

export function getView(req: Request, view: string): string {
  const partial = req.query["partial"]
  return partial == "true" ? "pages/" + view : view
}
