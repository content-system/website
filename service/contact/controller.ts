import { Request, Response } from "express"
import { escape, handleError, toMap } from "express-ext"
import { Log } from "onecore"
import { validate } from "xvalidators"
import { getLang, getResource } from "../resources"
import { render } from "../template"
import { Contact, contactModel, ContactService } from "./contact"

export class ContactController {
  constructor(protected service: ContactService, private log: Log) {
    this.render = this.render.bind(this)
    this.submit = this.submit.bind(this)
  }
  render(req: Request, res: Response) {
    const lang = getLang(req)
    const resource = getResource(lang)
    render(req, res, "contact", { resource, contact: {} })
  }
  submit(req: Request, res: Response) {
    const resource = getResource(req)
    console.log("Enter post contact " + JSON.stringify(req.body))
    const contact = req.body
    const errors = validate<Contact>(contact, contactModel, resource)
    if (errors.length > 0) {
      // res.status(getStatusCode(errors)).json(errors).end()
      const errorMap = toMap(errors)
      console.log(JSON.stringify(errorMap))
      render(req, res, "contact", { resource, contact: escape(contact), errors: errorMap })
    } else {
      this.service
        .submit(contact)
        .then((result) => {
          // res.status(201).json(contact).end()
          render(req, res, "contact", { resource, contact: escape(contact) })
        })
        .catch((err) => handleError(err, res, this.log))
    }
  }
}