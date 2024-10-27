export type Type =
  | "ObjectId"
  | "date"
  | "datetime"
  | "time"
  | "boolean"
  | "number"
  | "integer"
  | "string"
  | "text"
  | "object"
  | "array"
  | "binary"
  | "primitives"
  | "booleans"
  | "numbers"
  | "integers"
  | "strings"
  | "dates"
  | "datetimes"
  | "times"
export type Format = "currency" | "percentage" | "email" | "url" | "phone" | "fax" | "ipv4" | "ipv6"

export type DataType = Type
export type FormatType = Format

export interface ErrorMessage {
  field: string
  code: string
  param?: string | number | Date
  message?: string
}

export interface Model {
  attributes: Attributes
}

export interface StringMap {
  [key: string]: string
}
export interface Attribute {
  name?: string
  type?: Type
  format?: Format
  required?: boolean
  enum?: string[] | number[]
  length?: number
  min?: number | Date
  max?: number | Date
  gt?: number | Date
  lt?: number | Date
  precision?: number
  scale?: number
  exp?: RegExp | string
  code?: string
  typeof?: Attributes
  noValidate?: boolean
  resource?: string
}
export interface Attributes {
  [key: string]: Attribute
}

export interface Phones {
  [key: string]: string
}
// tslint:disable-next-line:class-name
export class resources {
  static phonecodes?: Phones
  static ignoreDate?: boolean
  static digit = /^\d+$/
  static email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/i
  static url = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
  static ipv4 = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/
  static ipv6 =
    /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/
  static isPhone(str: string): boolean {
    if (!str || str.length === 0 || str === "+") {
      return false
    }
    if (str.charAt(0) !== "+") {
      return isDigitOnly(str)
    } else {
      const phoneNumber = str.substring(1)
      if (!resources.phonecodes) {
        return isDigitOnly(phoneNumber)
      } else {
        if (isDigitOnly(phoneNumber)) {
          for (let degit = 1; degit <= 3; degit++) {
            const countryCode = phoneNumber.substr(0, degit)
            if (countryCode in resources.phonecodes) {
              return true
            }
          }
          return false
        } else {
          return false
        }
      }
    }
  }
  static isFax(fax: string): boolean {
    return resources.isPhone(fax)
  }
}
export function isPhone(str: string): boolean {
  return resources.isPhone(str)
}
export function isFax(str: string): boolean {
  return resources.isFax(str)
}
export function isStrings(s?: string[]): boolean {
  if (!s || s.length === 0) {
    return true
  }
  for (const x of s) {
    if (typeof x !== "string") {
      return false
    }
  }
  return true
}
export function isDates(s?: Date[] | string[]): boolean {
  if (!s || s.length === 0) {
    return true
  }
  for (let i = 0; i < s.length; i++) {
    const x = toDate(s[i])
    if (x) {
      s[i] = x
    } else {
      return false
    }
  }
  return true
}
export function isNumbers(s?: number[]): boolean {
  if (!s || s.length === 0) {
    return true
  }
  for (const x of s) {
    if (typeof x !== "number") {
      return false
    }
  }
  return true
}
export function isIntegers(s?: number[]): boolean {
  if (!s || s.length === 0) {
    return true
  }
  for (const x of s) {
    if (!Number.isInteger(x)) {
      return false
    }
  }
  return true
}
export function exist<T>(v: T, s: T[]) {
  for (const x of s) {
    if (v === x) {
      return true
    }
  }
  return false
}
export function toString(s: string[] | number[]): string {
  if (!s || s.length === 0) {
    return ""
  }
  const x: string[] = []
  for (const u of s) {
    x.push("" + u)
  }
  return x.join(",")
}
export function isDigitOnly(str: string): boolean {
  if (!str) {
    return false
  }
  const r = new RegExp(resources.digit)
  return r.test(str)
}
export function isIPv4(ipv4: string): boolean {
  if (!ipv4 || ipv4.length === 0) {
    return false
  }
  const r = new RegExp(resources.ipv4)
  return r.test(ipv4)
}
export function isIPv6(ipv6: string): boolean {
  if (!ipv6 || ipv6.length === 0) {
    return false
  }
  const r = new RegExp(resources.ipv6)
  return r.test(ipv6)
}
export function isEmail(email: string): boolean {
  if (!email || email.length === 0) {
    return false
  }
  const r = new RegExp(resources.email)
  return r.test(email)
}
export function isUrl(url: string): boolean {
  const r = new RegExp(resources.url)
  return r.test(url)
}
export function isValidScale(n: number, scale?: number): boolean {
  if (isNaN(n) || n === undefined || n == null) {
    return true
  }
  if (scale === undefined || scale == null || scale < 0) {
    return true
  }
  const s = n.toString()
  const i = s.indexOf(".")
  if (i < 0) {
    return true
  }
  const s2 = s.substr(i + 1)
  return s2.length <= scale
}
export function isValidPrecision(n: number, precision: number, scale?: number): boolean {
  if (isNaN(n) || n === undefined || n == null) {
    return true
  }
  if (precision === undefined || precision == null || precision < 0) {
    return isValidScale(n, scale)
  }
  if (scale === undefined || scale == null || scale < 0) {
    scale = 0
  }
  const s = n.toString()
  const i = s.indexOf(".")
  if (i < 0) {
    return s.length <= precision - scale
  }
  const s2 = s.substr(i + 1)
  if (s2.length > scale) {
    return false
  }
  const s3 = s.substr(0, i)
  return s3.length <= precision - scale
}
export function format(...args: any[]): string {
  let formatted = args[0]
  if (!formatted || formatted === "") {
    return ""
  }
  if (args.length > 1 && Array.isArray(args[1])) {
    const params = args[1]
    for (let i = 0; i < params.length; i++) {
      const regexp = new RegExp("\\{" + i + "\\}", "gi")
      formatted = formatted.replace(regexp, params[i])
    }
  } else {
    for (let i = 1; i < args.length; i++) {
      const regexp = new RegExp("\\{" + (i - 1) + "\\}", "gi")
      formatted = formatted.replace(regexp, args[i])
    }
  }
  return formatted
}
function createError(path: string, name: string, code?: string, param?: string | number | Date): ErrorMessage {
  let x = name
  if (path && path.length > 0) {
    x = path + "." + name
  }
  if (!code) {
    code = "string"
  }
  const error: ErrorMessage = {
    field: x,
    code,
  }
  if (param) {
    error.param = param
  }
  return error
}

const _datereg = "/Date("
const _re = /-?\d+/
function toDate(v: any): Date | null | undefined {
  if (!v) {
    return null
  }
  if (v instanceof Date) {
    return v
  } else if (typeof v === "number") {
    return new Date(v)
  }
  const i = v.indexOf(_datereg)
  if (i >= 0) {
    const m = _re.exec(v)
    if (m !== null) {
      const d = parseInt(m[0], 10)
      return new Date(d)
    } else {
      return null
    }
  } else {
    if (isNaN(v)) {
      return new Date(v)
    } else {
      const d = parseInt(v, 10)
      return new Date(d)
    }
  }
}

function handleMinMax(v: number | Date, attr: Attribute, path: string, errors: ErrorMessage[]): void {
  let na = attr.name
  if (!na) {
    na = ""
  }
  if (attr.min) {
    if (getNumber(v) < getNumber(attr.min)) {
      errors.push(createError(path, na, "min", attr.min))
    }
  } else if (attr.gt) {
    if (getNumber(v) <= getNumber(attr.gt)) {
      errors.push(createError(path, na, "gt", attr.gt))
    }
  }
  if (attr.max) {
    if (getNumber(v) > getNumber(attr.max)) {
      errors.push(createError(path, na, "max", attr.max))
    }
  } else if (attr.lt) {
    if (getNumber(v) >= getNumber(attr.lt)) {
      errors.push(createError(path, na, "lt", attr.lt))
    }
  }
}
export function getNumber(v: number | Date): number {
  return typeof v === "number" ? v : v.getTime()
}
function validateObject(
  obj: any,
  attributes: Attributes,
  errors: ErrorMessage[],
  path: string,
  allowUndefined?: boolean,
  patch?: boolean,
  max?: number,
  resource?: StringMap,
): void {
  const keys = Object.keys(obj)
  let count = 0
  for (const key of keys) {
    count = count + 1
    const attr: Attribute = attributes[key]
    if (!attr) {
      if (!allowUndefined) {
        errors.push(createError(path, key, "undefined"))
      }
    } else {
      attr.name = key
      if (attr.noValidate) {
        continue
      }
      const na = attr.name
      const v = obj[na]
      if (v == null) {
        if (attr.required && !patch) {
          errors.push(createError(path, na, "required"))
        }
      } else {
        const t = typeof v
        const at = attr.type
        switch (at) {
          case "datetime":
            const date = toDate(v)
            if (date) {
              const error = date.toString()
              if (!(date instanceof Date) || error === "Invalid Date") {
                errors.push(createError(path, na, "date"))
                return
              } else {
                if (!(v instanceof Date)) {
                  obj[na] = date
                }
                handleMinMax(v, attr, path, errors)
              }
            }
            break
          case "date": {
            if (resources.ignoreDate) {
              const date2 = toDate(v)
              if (date2) {
                const error2 = date2.toString()
                if (!(date2 instanceof Date) || error2 === "Invalid Date") {
                  errors.push(createError(path, na, "date"))
                  return
                } else {
                  if (!(v instanceof Date)) {
                    obj[na] = date
                  }
                  handleMinMax(v, attr, path, errors)
                }
              }
            }
            break
          }
          default: {
            switch (t) {
              case "string":
                if (at === undefined || at === "string" || at === "text" || at === "ObjectId") {
                  if (v.length === 0) {
                    if (attr.required) {
                      errors.push(createError(path, na, "required"))
                    }
                  } else {
                    if (attr.min && typeof attr.min === "number" && attr.min > 0 && v.length < attr.min) {
                      errors.push(createError(path, na, "minlength", attr.min))
                    }
                    if (attr.length && attr.length > 0 && v.length > attr.length) {
                      errors.push(createError(path, na, "maxlength", attr.length))
                    }
                    if (attr.format) {
                      switch (attr.format) {
                        case "email": {
                          if (!isEmail(v)) {
                            errors.push(createError(path, na, "email"))
                          }
                          break
                        }
                        case "url": {
                          if (!isUrl(v)) {
                            errors.push(createError(path, na, "url"))
                          }
                          break
                        }
                        case "phone": {
                          if (!resources.isPhone(v)) {
                            errors.push(createError(path, na, "phone"))
                          }
                          break
                        }
                        case "fax": {
                          if (!resources.isFax(v)) {
                            errors.push(createError(path, na, "fax"))
                          }
                          break
                        }
                        case "ipv4": {
                          if (!isIPv4(v)) {
                            errors.push(createError(path, na, "ipv4"))
                          }
                          break
                        }
                        case "ipv6": {
                          if (!isIPv6(v)) {
                            errors.push(createError(path, na, "ipv6"))
                          }
                          break
                        }
                        default: {
                          break
                        }
                      }
                    }
                    if (attr.exp) {
                      if (typeof attr.exp === "string") {
                        attr.exp = new RegExp(attr.exp)
                      }
                      const exp: RegExp = attr.exp
                      if (!exp.test(v)) {
                        const code = attr.code ? attr.code : "exp"
                        errors.push(createError(path, na, code))
                      }
                    }
                    if (attr.enum && attr.enum.length > 0) {
                      if (!exist(v, attr.enum as string[])) {
                        errors.push(createError(path, na, "enum", toString(attr.enum)))
                      }
                    }
                  }
                } else {
                  errors.push(createError(path, na, at))
                  return
                }
                break
              case "number":
                if (attr.type === "integer") {
                  if (!Number.isInteger(v) || isNaN(v)) {
                    errors.push(createError(path, na, "integer"))
                  }
                } else if (attr.type === "number") {
                  if (isNaN(v)) {
                    errors.push(createError(path, na, "number"))
                  } else {
                    if (!attr.precision) {
                      if (!isValidScale(v, attr.scale)) {
                        errors.push(createError(path, na, "scale"))
                      }
                    } else {
                      if (!isValidPrecision(v, attr.precision, attr.scale)) {
                        errors.push(createError(path, na, "precision"))
                      }
                    }
                  }
                } else {
                  errors.push(createError(path, na, attr.type))
                  return
                }
                handleMinMax(v, attr, path, errors)
                if (attr.enum && attr.enum.length > 0) {
                  if (!exist(v, attr.enum as number[])) {
                    errors.push(createError(path, na, "enum", toString(attr.enum)))
                  }
                }
                break
              case "boolean":
                if (at !== "boolean") {
                  errors.push(createError(path, na, at))
                  return
                }
                break
              case "object":
                if (Array.isArray(v)) {
                  switch (at) {
                    case "strings": {
                      if (!isStrings(v)) {
                        errors.push(createError(path, na, "strings"))
                      }
                      break
                    }
                    case "numbers": {
                      if (!isNumbers(v)) {
                        errors.push(createError(path, na, "numbers"))
                      }
                      break
                    }
                    case "integers": {
                      if (!isIntegers(v)) {
                        errors.push(createError(path, na, "integers"))
                      }
                      break
                    }
                    case "datetimes": {
                      if (!isDates(v)) {
                        errors.push(createError(path, na, "datetimes"))
                      }
                      break
                    }
                    case "dates": {
                      if (resources.ignoreDate) {
                        if (!isDates(v)) {
                          errors.push(createError(path, na, "dates"))
                        }
                      }
                      break
                    }
                    case "array": {
                      for (let i = 0; i < v.length; i++) {
                        if (typeof v !== "object") {
                          const y = path != null && path.length > 0 ? path + "." + key + "[" + i + "]" : key + "[" + i + "]"
                          errors.push(createError("", y, "object"))
                        } else if (attr.typeof) {
                          const y = path != null && path.length > 0 ? path + "." + key + "[" + i + "]" : key + "[" + i + "]"
                          validateObject(v[i], attr.typeof, errors, y)
                        }
                      }
                      break
                    }
                    case "primitives": {
                      if (typeof v !== "object") {
                        errors.push(createError(path, na, "array"))
                        return
                      } else {
                        if (!Array.isArray(v)) {
                          errors.push(createError(path, na, "array"))
                          return
                        } else {
                          if (attr.code) {
                            if (attr.code === "date") {
                              for (let i = 0; i < v.length; i++) {
                                if (v[i]) {
                                  const date3 = toDate(v)
                                  if (date3) {
                                    const error3 = date3.toString()
                                    if (!(date3 instanceof Date) || error3 === "Invalid Date") {
                                      const y = path != null && path.length > 0 ? path + "." + key + "[" + i + "]" : key + "[" + i + "]"
                                      const err = createError("", y, "date")
                                      errors.push(err)
                                    }
                                  }
                                }
                              }
                            } else {
                              for (let i = 0; i < v.length; i++) {
                                if (v[i] && typeof v[i] !== attr.code) {
                                  const y = path != null && path.length > 0 ? path + "." + key + "[" + i + "]" : key + "[" + i + "]"
                                  const err = createError("", y, attr.code)
                                  errors.push(err)
                                }
                              }
                            }
                          }
                        }
                      }
                      break
                    }
                    case "times":
                      break
                    default:
                      errors.push(createError(path, na, at))
                      return
                  }
                  if (attr.min && typeof attr.min === "number" && attr.min > 0 && v.length < attr.min) {
                    errors.push(createError(path, na, "min", attr.min))
                  }
                  if (attr.max && typeof attr.max === "number" && attr.max > 0 && v.length > attr.max) {
                    errors.push(createError(path, na, "max", attr.max))
                  }
                } else if (at === "object") {
                  if (typeof v !== "object") {
                    errors.push(createError(path, na, "object"))
                    return
                  } else {
                    if (Array.isArray(v)) {
                      errors.push(createError(path, na, "object"))
                    } else if (attr.typeof) {
                      const x = path != null && path.length > 0 ? path + "." + key : key
                      validateObject(v, attr.typeof, errors, x)
                    }
                  }
                }
                break
              default:
                break
            }
            break
          }
        }
        if (max !== undefined && errors.length >= max) {
          return
        }
      }
    }
  }
  if (patch) {
    return
  }
  const aks = Object.keys(attributes)
  if (!allowUndefined) {
    if (count >= aks.length) {
      return
    }
  }
  checkUndefined(obj, attributes, errors, aks)
}
export function checkUndefined<T>(obj: T, attrs: Attributes, errors: ErrorMessage[], keys?: string[]): void {
  if (!keys) {
    keys = Object.keys(attrs)
  }
  for (const key of keys) {
    const attr = attrs[key]
    if (attr.required) {
      const v = (obj as any)[key]
      if (!v && v !== 0 && v !== false) {
        errors.push(createError("", key, "required"))
      }
    }
  }
}
export function check(obj: any, attributes: Attributes, allowUndefined?: boolean, patch?: boolean, max?: number): ErrorMessage[] {
  const errors: ErrorMessage[] = []
  const path = ""
  if (max == null) {
    max = undefined
  }
  validateObject(obj, attributes, errors, path, allowUndefined, patch, max)
  return errors
}
export function validate(obj: any, attributes: Attributes, allowUndefined?: boolean, patch?: boolean, max?: number): ErrorMessage[] {
  return check(obj, attributes, allowUndefined, patch, max)
}
// tslint:disable-next-line:max-classes-per-file
export class Validator<T> {
  max: number
  constructor(public attributes: Attributes, public allowUndefined?: boolean, max?: number) {
    this.max = max ? max : 10
    this.validate = this.validate.bind(this)
  }
  validate(obj: T, patch?: boolean): Promise<ErrorMessage[]> {
    const errors = check(obj, this.attributes, this.allowUndefined, patch, this.max)
    return Promise.resolve(errors)
  }
}
export function createValidator<T>(attributes: Attributes, allowUndefined?: boolean, max?: number): Validator<T> {
  return new Validator(attributes, allowUndefined, max)
}
