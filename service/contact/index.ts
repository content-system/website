import { nanoid } from "nanoid"
import { CRUDRepository, DB } from "query-core"
import { Contact, contactModel, ContactRepository, ContactService } from "./contact"
import { ContactController } from "./controller"
export * from "./controller"

export class SqlContactRepository extends CRUDRepository<Contact, string> implements ContactRepository {
  constructor(db: DB) {
    super(db, "contacts", contactModel)
  }
}
export class ContactUseCase implements ContactService {
  constructor(private repository: ContactRepository) {}
  submit(contact: Contact): Promise<number> {
    contact.id = nanoid(10)
    contact.submittedAt = new Date()
    return this.repository.create(contact)
  }
}


export function useContactController(db: DB): ContactController {
  const repository = new SqlContactRepository(db)
  const service = new ContactUseCase(repository)
  return new ContactController(service)
}
