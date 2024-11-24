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
            const countryCode = phoneNumber.substring(0, degit)
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
  const s2 = s.substring(i + 1)
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
  const s2 = s.substring(i + 1)
  if (s2.length > scale) {
    return false
  }
  const s3 = s.substring(0, i)
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
function createError(path: string, name: string, code: string | undefined, msg: string, param?: string | number | Date): ErrorMessage {
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
  if (msg) {
    error.message = msg
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

function handleMinMax(v: number | Date, attr: Attribute, path: string, errors: ErrorMessage[], key: string, resource?: StringMap): void {
  let na = attr.name
  if (!na) {
    na = ""
  }
  if (attr.min) {
    if (getNumber(v) < getNumber(attr.min)) {
      const msg = createMessage(key, "min", "error_min", resource, attr.resource)
      errors.push(createError(path, na, "min", msg, attr.min))
    }
  } else if (attr.gt) {
    if (getNumber(v) <= getNumber(attr.gt)) {
      const msg = createMessage(key, "gt", "error_gt", resource, attr.resource)
      errors.push(createError(path, na, "gt", msg, attr.gt))
    }
  }
  if (attr.max) {
    if (getNumber(v) > getNumber(attr.max)) {
      const msg = createMessage(key, "max", "error_max", resource, attr.resource)
      errors.push(createError(path, na, "max", msg, attr.max))
    }
  } else if (attr.lt) {
    if (getNumber(v) >= getNumber(attr.lt)) {
      const msg = createMessage(key, "lt", "error_lt", resource, attr.resource)
      errors.push(createError(path, na, "lt", msg, attr.lt))
    }
  }
}
export function getNumber(v: number | Date): number {
  return typeof v === "number" ? v : v.getTime()
}
export function createMessage(field: string, code: string, errorKey: string, resource?: StringMap, resourceKey?: string, param?: string | number): string {
  if (!resource) {
    return ""
  }
  const p1b: string | undefined = resourceKey && resourceKey.length > 0 ? resource[resourceKey] : field
  const p1 = p1b ? p1b : field
  const um = resource[errorKey]
  if (!um) {
    return code
  } else {
    return format(um, p1, param)
  }
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
        const msg = createMessage(key, "undefined", "error_undefined", resource)
        errors.push(createError(path, key, "undefined", msg))
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
          const msg = createMessage(key, "required", "error_required", resource, attr.resource)
          errors.push(createError(path, na, "required", msg))
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
                const msg = createMessage(key, "date", "error_date", resource, attr.resource)
                errors.push(createError(path, na, "date", msg))
                return
              } else {
                if (!(v instanceof Date)) {
                  obj[na] = date
                }
                handleMinMax(v, attr, path, errors, key, resource)
              }
            }
            break
          case "date": {
            if (resources.ignoreDate) {
              const date2 = toDate(v)
              if (date2) {
                const error2 = date2.toString()
                if (!(date2 instanceof Date) || error2 === "Invalid Date") {
                  const msg = createMessage(key, "date", "error_date", resource, attr.resource)
                  errors.push(createError(path, na, "date", msg))
                  return
                } else {
                  if (!(v instanceof Date)) {
                    obj[na] = date
                  }
                  handleMinMax(v, attr, path, errors, key, resource)
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
                      const msg = createMessage(key, "required", "error_required", resource, attr.resource)
                      const err = createError(path, na, "required", msg)
                      errors.push(err)
                    }
                  } else {
                    if (attr.min && typeof attr.min === "number" && attr.min > 0 && v.length < attr.min) {
                      const msg = createMessage(key, "minlength", "error_minlength", resource, attr.resource)
                      errors.push(createError(path, na, "minlength", msg, attr.min))
                    }
                    if (attr.length && attr.length > 0 && v.length > attr.length) {
                      const msg = createMessage(key, "maxlength", "error_maxlength", resource, attr.resource)
                      errors.push(createError(path, na, "maxlength", msg, attr.length))
                    }
                    if (attr.format) {
                      switch (attr.format) {
                        case "email": {
                          if (!isEmail(v)) {
                            const msg = createMessage(key, "email", "error_email", resource, attr.resource)
                            errors.push(createError(path, na, "email", msg))
                          }
                          break
                        }
                        case "url": {
                          if (!isUrl(v)) {
                            const msg = createMessage(key, "url", "error_url", resource, attr.resource)
                            errors.push(createError(path, na, "url", msg))
                          }
                          break
                        }
                        case "phone": {
                          if (!resources.isPhone(v)) {
                            const msg = createMessage(key, "phone", "error_phone", resource, attr.resource)
                            errors.push(createError(path, na, "phone", msg))
                          }
                          break
                        }
                        case "fax": {
                          if (!resources.isFax(v)) {
                            const msg = createMessage(key, "fax", "error_fax", resource, attr.resource)
                            errors.push(createError(path, na, "fax", msg))
                          }
                          break
                        }
                        case "ipv4": {
                          if (!isIPv4(v)) {
                            const msg = createMessage(key, "ipv4", "error_ipv4", resource, attr.resource)
                            errors.push(createError(path, na, "ipv4", msg))
                          }
                          break
                        }
                        case "ipv6": {
                          if (!isIPv6(v)) {
                            const msg = createMessage(key, "ipv6", "error_ipv6", resource, attr.resource)
                            errors.push(createError(path, na, "ipv6", msg))
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
                        const msg = createMessage(key, "exp", "error_exp", resource, attr.resource)
                        errors.push(createError(path, na, "exp", msg))
                      }
                    }
                    if (attr.enum && attr.enum.length > 0) {
                      if (!exist(v, attr.enum as string[])) {
                        errors.push(createError(path, na, "enum", toString(attr.enum)))
                      }
                    }
                  }
                } else {
                  const msg = createMessage(key, "type", "error_type", resource, attr.resource, "string")
                  errors.push(createError(path, na, "type", msg, "string"))
                  return
                }
                break
              case "number":
                if (attr.type === "integer") {
                  if (!Number.isInteger(v) || isNaN(v)) {
                    const msg = createMessage(key, "integer", "error_integer", resource, attr.resource)
                    errors.push(createError(path, na, "integer", msg))
                  }
                } else if (attr.type === "number") {
                  if (isNaN(v)) {
                    const msg = createMessage(key, "number", "error_number", resource, attr.resource)
                    errors.push(createError(path, na, "number", msg))
                  } else {
                    if (!attr.precision) {
                      if (!isValidScale(v, attr.scale)) {
                        const msg = createMessage(key, "scale", "error_scale", resource, attr.resource, attr.scale)
                        errors.push(createError(path, na, "scale", msg))
                      }
                    } else {
                      if (!isValidPrecision(v, attr.precision, attr.scale)) {
                        const msg = createMessage(key, "precision", "error_precision", resource, attr.resource, attr.precision)
                        errors.push(createError(path, na, "precision", msg))
                      }
                    }
                  }
                } else {
                  const msg = createMessage(key, "type", "error_type", resource, attr.resource, "number")
                  errors.push(createError(path, na, "type", msg, "number"))
                  return
                }
                handleMinMax(v, attr, path, errors, key, resource)
                if (attr.enum && attr.enum.length > 0) {
                  if (!exist(v, attr.enum as number[])) {
                    errors.push(createError(path, na, "enum", toString(attr.enum)))
                  }
                }
                break
              case "boolean":
                if (at !== "boolean") {
                  const msg = createMessage(key, "boolean", "error_boolean", resource, attr.resource)
                  errors.push(createError(path, na, at, msg))
                  return
                }
                break
              case "object":
                if (Array.isArray(v)) {
                  switch (at) {
                    case "strings": {
                      if (!isStrings(v)) {
                        const msg = createMessage(key, "strings", "error_strings", resource, attr.resource)
                        errors.push(createError(path, na, "strings", msg))
                      }
                      break
                    }
                    case "numbers": {
                      if (!isNumbers(v)) {
                        const msg = createMessage(key, "numbers", "error_numbers", resource, attr.resource)
                        errors.push(createError(path, na, "numbers", msg))
                      }
                      break
                    }
                    case "integers": {
                      if (!isIntegers(v)) {
                        const msg = createMessage(key, "integers", "error_integers", resource, attr.resource)
                        errors.push(createError(path, na, "integers", msg))
                      }
                      break
                    }
                    case "datetimes": {
                      if (!isDates(v)) {
                        const msg = createMessage(key, "datetimes", "error_datetimes", resource, attr.resource)
                        errors.push(createError(path, na, "datetimes", msg))
                      }
                      break
                    }
                    case "dates": {
                      if (resources.ignoreDate) {
                        if (!isDates(v)) {
                          const msg = createMessage(key, "dates", "error_dates", resource, attr.resource)
                          errors.push(createError(path, na, "dates", msg))
                        }
                      }
                      break
                    }
                    case "array": {
                      for (let i = 0; i < v.length; i++) {
                        if (typeof v[i] !== "object") {
                          const y = path != null && path.length > 0 ? path + "." + key + "[" + i + "]" : key + "[" + i + "]"
                          const msg = createMessage(key, "type", "error_type", resource, attr.resource, typeof v[i])
                          errors.push(createError("", y, "type", msg, typeof v[i]))
                        } else if (attr.typeof) {
                          const y = path != null && path.length > 0 ? path + "." + key + "[" + i + "]" : key + "[" + i + "]"
                          validateObject(v[i], attr.typeof, errors, y)
                        }
                      }
                      break
                    }
                    case "primitives": {
                      if (typeof v !== "object") {
                        const msg = createMessage(key, "type", "error_type", resource, attr.resource, typeof v)
                        errors.push(createError(path, na, "type", msg, "array"))
                        return
                      } else {
                        if (!Array.isArray(v)) {
                          const msg = createMessage(key, "type", "error_type", resource, attr.resource, typeof v)
                          errors.push(createError(path, na, "type", msg, "array"))
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
                                      const msg = createMessage(key, "date", "error_date", resource, attr.resource)
                                      const err = createError("", y, "date", msg)
                                      errors.push(err)
                                    }
                                  }
                                }
                              }
                            } else {
                              for (let i = 0; i < v.length; i++) {
                                if (v[i] && typeof v[i] !== attr.code) {
                                  const y = path != null && path.length > 0 ? path + "." + key + "[" + i + "]" : key + "[" + i + "]"
                                  const msg = createMessage(key, "type", "error_type", resource, attr.resource, typeof v[i])
                                  const err = createError("", y, "type", msg, typeof v[i])
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
                      const msg = createMessage(key, "type", "error_type", resource, attr.resource, typeof v)
                      errors.push(createError(path, na, "type", msg, at))
                      return
                  }
                  if (attr.min && typeof attr.min === "number" && attr.min > 0 && v.length < attr.min) {
                    const msg = createMessage(key, "min", "error_min", resource, attr.resource)
                    errors.push(createError(path, na, "min", msg, attr.min))
                  }
                  if (attr.max && typeof attr.max === "number" && attr.max > 0 && v.length > attr.max) {
                    const msg = createMessage(key, "max", "error_max", resource, attr.resource)
                    errors.push(createError(path, na, "max", msg, attr.max))
                  }
                } else if (at === "object") {
                  if (typeof v !== "object") {
                    const msg = createMessage(key, "max", "error_max", resource, attr.resource, typeof v)
                    errors.push(createError(path, na, "type", msg, "object"))
                    return
                  } else {
                    if (Array.isArray(v)) {
                      const msg = createMessage(key, "max", "error_max", resource, attr.resource, typeof v)
                      errors.push(createError(path, na, "type", msg, "object"))
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
  checkUndefined(obj, attributes, errors, resource, aks)
}
export function checkUndefined<T>(obj: T, attrs: Attributes, errors: ErrorMessage[], resource?: StringMap, keys?: string[]): void {
  if (!keys) {
    keys = Object.keys(attrs)
  }
  for (const key of keys) {
    const attr = attrs[key]
    if (attr.required) {
      const v = (obj as any)[key]
      if (v === undefined) {
        const msg = createMessage(key, "required", "error_required", resource, attr.resource)
        const err = createError("", key, "required", msg)
        errors.push(err)
      }
    }
  }
}
export function check<T>(obj: T, attributes: Attributes, resource?: StringMap, patch?: boolean, allowUndefined?: boolean, max?: number): ErrorMessage[] {
  const errors: ErrorMessage[] = []
  const path = ""
  if (max == null) {
    max = undefined
  }
  validateObject(obj, attributes, errors, path, allowUndefined, patch, max, resource)
  return errors
}
export function validate<T>(obj: T, attributes: Attributes, resource?: StringMap, patch?: boolean, allowUndefined?: boolean, max?: number): ErrorMessage[] {
  return check(obj, attributes, resource, patch, allowUndefined, max)
}
// tslint:disable-next-line:max-classes-per-file
export class Validator<T> {
  max: number
  constructor(public attributes: Attributes, public allowUndefined?: boolean, max?: number) {
    this.max = max ? max : 10
    this.validate = this.validate.bind(this)
  }
  validate(obj: T, resource?: StringMap, patch?: boolean): Promise<ErrorMessage[]> {
    const errors = check(obj, this.attributes, resource, patch, this.allowUndefined, this.max)
    return Promise.resolve(errors)
  }
}
export function createValidator<T>(attributes: Attributes, allowUndefined?: boolean, max?: number): Validator<T> {
  return new Validator(attributes, allowUndefined, max)
}
