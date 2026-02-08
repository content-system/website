import { Request, Response } from "express"
import { escape, toMap } from "express-ext"
import { validate } from "xvalidators"
import { getLang, getResource } from "../resources"
import { render, renderError500 } from "../template"
import { Contact, contactModel, ContactService } from "./contact"

export class ContactController {
  constructor(protected service: ContactService) {
    this.render = this.render.bind(this)
    this.submit = this.submit.bind(this)
  }
  render(req: Request, res: Response) {
    const lang = getLang(req)
    const resource = getResource(lang)
    render(req, res, "contact", { resource, contact: {} })
  }
  async submit(req: Request, res: Response) {
    const resource = getResource(req)
    console.log("Enter post contact " + JSON.stringify(req.body))
    const contact = req.body
    const errors = validate<Contact>(contact, contactModel, resource)
    if (errors.length > 0) {
      const errorMap = toMap(errors)
      console.log(JSON.stringify(errorMap))
      return render(req, res, "contact", { resource, contact: escape(contact), errors: errorMap })
      // return res.status(getStatusCode(errors)).json(errors).end()
    }
    try {
      await this.service.submit(contact)
      render(req, res, "contact", { resource, contact: escape(contact) })
      // res.status(201).json(contact).end()
    } catch (err) {
      renderError500(req, res, resource, err)
      // handleError(err, res)
    }
  }
}
