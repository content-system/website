import { nanoid } from "nanoid"
import { DB } from "onecore"
import { Contact, ContactRepository, ContactService } from "./contact"
import { ContactController } from "./controller"
import { SqlContactRepository } from "./repository"
export * from "./controller"

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
