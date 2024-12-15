import { Request, Response } from "express"
import { Attributes } from "onecore"
import { validate } from "xvalidators"
import { getResource } from "../resources"

export const userModel: Attributes = {
  username: {
    required: true,
    length: 100,
    resource: "username",
  },
  email: {
    required: true,
    length: 120,
    resource: "email",
  },
  password: {
    required: true,
    length: 100,
    resource: "password",
  },
}
export interface User {
  username: string
  email: string
  password: string
}

export class SignUpController {
  constructor() {
    this.render = this.render.bind(this)
    this.submit = this.submit.bind(this)
  }
  render(req: Request, res: Response) {
    const resource = getResource()
    res.render("signup", {
      resource,
      user: {
        username: "minhduc",
        email: "minhduc140583@gmail.com",
        password: "Password1!",
      },
      message: "Enter login",
    })
  }
  submit(req: Request, res: Response) {
    const resource = getResource()
    const user: User = req.body
    console.log("user " + JSON.stringify(user))
    const errors = validate<User>(user, userModel, resource, true)
    if (errors.length > 0) {
      console.log("Login error: " + JSON.stringify(errors))
      res.status(422).json(errors)
    } else {
      res.status(200).json(user).end()
    }
  }
}
