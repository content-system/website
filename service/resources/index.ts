import { Request } from "express"
import { en as authenticationEN } from "./authentication/en"
import { vi as authenticationVI } from "./authentication/vi"
import { en as commonEN } from "./en"
import { vi as commonVI } from "./vi"

export interface Resource {
  resource(): StringMap
  value(key: string, param?: any): string
  format(f: string, ...args: any[]): string
}
export interface StringMap {
  [key: string]: string
}
export interface Resources {
  [key: string]: StringMap
}

const en: StringMap = {
  ...commonEN,
  ...authenticationEN,
}
const vi: StringMap = {
  ...commonVI,
  ...authenticationVI,
}

export const resources: Resources = {
  en: en,
  vi: vi,
}

export function getResource(req: Request, lang?: string): StringMap {
  if (lang && lang.length > 0) {
    const r = resources[lang]
    if (r) {
      return r
    }
  }
  const l = "en"
  const r = resources[l]
  return r ? r : resources["en"]
}
