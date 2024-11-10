import { Request, Response } from "express"
import { ErrorMessage } from "express-ext"
import { nanoid } from "nanoid"
import { Log } from "onecore"
import { DB, Repository } from "query-core"
import { getView } from "../../core"
import { getResource } from "../../resources"
import { validate } from "../../validator"
import { Contact, contactModel, ContactRepository, ContactService } from "./contact"
export * from "./contact"

export class SqlContactRepository extends Repository<Contact, string> implements ContactRepository {
  constructor(db: DB) {
    super(db, "contacts", contactModel)
  }
}
export class ContactManager implements ContactService {
  constructor(protected repository: ContactRepository) {}
  submit(contact: Contact): Promise<number> {
    contact.id = nanoid(10)
    return this.repository.create(contact)
  }
}

export class ContactController {
  constructor(protected service: ContactService) {
    this.render = this.render.bind(this)
    this.submit = this.submit.bind(this)
  }
  render(req: Request, res: Response) {
    const resource = getResource()
    res.render(getView(req, "contact"), {
      resource,
      contact: {
        name: "Duc Nguyen",
      },
    })
  }
  submit(req: Request, res: Response) {
    const resource = getResource()
    console.log("Enter post contact " + JSON.stringify(req.body))
    const contact = req.body
    const errors = validate<Contact>(contact, contactModel, true, false, resource)
    if (errors.length > 0) {
      const x = toMap(errors)
      console.log(JSON.stringify(x))
      res.render("pages/contact", {
        resource,
        contact,
        errors: x,
      })
    } else {
      this.service.submit(contact).then((result) => {
        res.render("pages/contact", {
          resource,
          contact,
        })
      })
    }
  }
}

export interface ErrorMap {
  [key: string]: ErrorMessage
}
export function toMap(errors: ErrorMessage[]): ErrorMap {
  const errorMap: ErrorMap = {}
  if (!errors) {
    return errorMap
  }
  for (let i = 0; i < errors.length; i++) {
    ;(errors[i] as any)["invalid"] = "invalid"
    errorMap[errors[i].field] = errors[i]
  }
  return errorMap
}

export function useContactController(log: Log, db: DB): ContactController {
  const repository = new SqlContactRepository(db)
  const service = new ContactManager(repository)
  return new ContactController(service)
}
