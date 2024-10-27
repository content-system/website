import { Request } from "express"

export const defaultLimit = 12
export const pageSizes = [12, 24, 60, 100, 120, 180, 300, 600]
const et = ""

export function getView(req: Request, view: string): string {
  const partial = req.query["partial"]
  return partial == "true" ? "pages/" + view : view
}

export function getDateFormat(profile?: string): string {
  return "M/D/YYYY"
}

export function addDays(d: Date, n: number): Date {
  const newDate = new Date(d)
  newDate.setDate(newDate.getDate() + n)
  return newDate
}
export function formatDate(d: Date | null | undefined, dateFormat?: string, full?: boolean, upper?: boolean): string {
  if (!d) {
    return et
  }
  let format = dateFormat && dateFormat.length > 0 ? dateFormat : "M/D/YYYY"
  if (upper) {
    format = format.toUpperCase()
  }
  let arr = [et, et, et]
  const items = format.split(/\/|\.| |-/)
  let iday = items.indexOf("D")
  let im = items.indexOf("M")
  let iyear = items.indexOf("YYYY")
  let fm = full ? full : false
  let fd = full ? full : false
  let fy = true
  if (iday === -1) {
    iday = items.indexOf("DD")
    fd = true
  }
  if (im === -1) {
    im = items.indexOf("MM")
    fm = true
  }
  if (iyear === -1) {
    iyear = items.indexOf("YY")
    fy = full ? full : false
  }
  arr[iday] = getD(d.getDate(), fd)
  arr[im] = getD(d.getMonth() + 1, fm)
  arr[iyear] = getYear(d.getFullYear(), fy)
  const s = detectSeparator(format)
  const e = detectLastSeparator(format)
  const l = items.length === 4 ? format[format.length - 1] : et
  return arr[0] + s + arr[1] + e + arr[2] + l
}
function detectSeparator(format: string): string {
  const len = format.length
  for (let i = 0; i < len; i++) {
    const c = format[i]
    if (!((c >= "A" && c <= "Z") || (c >= "a" && c <= "z"))) {
      return c
    }
  }
  return "/"
}
function detectLastSeparator(format: string): string {
  const len = format.length - 3
  for (let i = len; i > -0; i--) {
    const c = format[i]
    if (!((c >= "A" && c <= "Z") || (c >= "a" && c <= "z"))) {
      return c
    }
  }
  return "/"
}
export function getYear(y: number, full?: boolean): string {
  if (full || (y <= 99 && y >= -99)) {
    return y.toString()
  }
  const s = y.toString()
  return s.substring(s.length - 2)
}
function getD(n: number, fu: boolean): string {
  return fu ? pad(n) : n.toString()
}
export function datetimeToString(date?: Date | string): any {
  if (!date || date === et) {
    return undefined
  }
  const d2 = typeof date !== "string" ? date : new Date(date)
  const year = d2.getFullYear()
  const month = pad(d2.getMonth() + 1)
  const day = pad(d2.getDate())
  const hours = pad(d2.getHours())
  const minutes = pad(d2.getMinutes())
  const seconds = pad(d2.getSeconds())
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
}
export function formatDateTime(date: Date | null | undefined, dateFormat?: string, full?: boolean, upper?: boolean): any {
  if (!date) {
    return et
  }
  const sd = formatDate(date, dateFormat, full, upper)
  if (sd.length === 0) {
    return sd
  }
  return sd + " " + formatTime(date)
}
export function formatLongDateTime(date: Date | null | undefined, dateFormat?: string, full?: boolean, upper?: boolean): string {
  if (!date) {
    return et
  }
  const sd = formatDate(date, dateFormat, full, upper)
  if (sd.length === 0) {
    return sd
  }
  return sd + " " + formatLongTime(date)
}
export function formatFullDateTime(date: Date | null | undefined, dateFormat?: string, s?: string, full?: boolean, upper?: boolean): string {
  if (!date) {
    return et
  }
  const sd = formatDate(date, dateFormat, full, upper)
  if (sd.length === 0) {
    return sd
  }
  return sd + " " + formatFullTime(date, s)
}
export function formatTime(d: Date): string {
  return pad(d.getHours()) + ":" + pad(d.getMinutes())
}
export function formatLongTime(d: Date): string {
  return pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds())
}
export function formatFullTime(d: Date, s?: string): string {
  const se = s && s.length > 0 ? s : "."
  return formatLongTime(d) + se + pad3(d.getMilliseconds())
}
export function dateToString(d: Date, milli?: boolean): string {
  const s = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`
  if (milli) {
    return s + pad3(d.getMilliseconds())
  }
  return s
}
function pad(n: number): string {
  return n < 10 ? "0" + n : n.toString()
}
function pad3(n: number): string {
  if (n >= 100) {
    return n.toString()
  }
  return n < 10 ? "00" + n : "0" + n.toString()
}

export interface Filter {
  page?: number
  limit?: number
  fields?: string[]
  sort?: string
  q?: string
}
export function cloneFilter<F extends Filter>(obj: F, page: number, limit: number): F {
  const f = clone(obj)
  if (!obj.hasOwnProperty("page")) {
    obj.page = page
  }
  if (!obj.hasOwnProperty("limit")) {
    obj.limit = limit
  }
  return f
}
export function clone(obj: any): any {
  if (!obj) {
    return obj
  }
  if (obj instanceof Date) {
    return new Date(obj.getTime())
  }
  if (typeof obj !== "object") {
    return obj
  }
  if (Array.isArray(obj)) {
    const arr = []
    for (const sub of obj) {
      const c = clone(sub)
      arr.push(c)
    }
    return arr
  }
  const x: any = {}
  const keys = Object.keys(obj)
  for (const k of keys) {
    const v = obj[k]
    if (v instanceof Date) {
      x[k] = new Date(v.getTime())
    } else {
      switch (typeof v) {
        case "object":
          x[k] = clone(v)
          break
        default:
          x[k] = v
          break
      }
    }
  }
  return x
}

export function queryString(req: Request, name: string, d?: string): string | undefined {
  const p = req.query[name]
  if (!p || p.toString().length == 0) {
    return d
  }
  return p.toString()
}
export function hasSearch(req: Request): boolean {
  return req.url.indexOf("?") >= 0
}
export function getSearch(url: string): string {
  const i = url.indexOf("?")
  return i < 0 ? et : url.substring(i + 1)
}
export function getField(search: string, fieldName: string): string {
  let i = search.indexOf(fieldName + "=")
  if (i < 0) {
    return ""
  }
  if (i > 0) {
    if (search.substring(i - 1, 1) != "&") {
      i = search.indexOf("&" + fieldName + "=")
      if (i < 0) {
        return search
      }
      i = i + 1
    }
  }
  const j = search.indexOf("&", i + fieldName.length)
  return j >= 0 ? search.substring(i, j) : search.substring(i)
}
export function removeField(search: string, fieldName: string): string {
  let i = search.indexOf(fieldName + "=")
  if (i < 0) {
    return search
  }
  if (i > 0) {
    if (search.substring(i - 1, 1) != "&") {
      i = search.indexOf("&" + fieldName + "=")
      if (i < 0) {
        return search
      }
      i = i + 1
    }
  }
  const j = search.indexOf("&", i + fieldName.length)
  return j >= 0 ? search.substring(0, i) + search.substring(j + 1) : search.substring(0, i - 1)
}
export function removePage(search: string): string {
  search = removeField(search, "page")
  search = removeField(search, "partial")
  return search
}
export function buildPageSearch(search: string): string {
  const sr = removePage(search)
  return sr.length == 0 ? sr : "&" + sr
}
export function removeSort(query: string): string {
  query = removeField(query, "sort")
  query = removeField(query, "partial")
  return query
}
export interface Sort {
  field?: string
  type?: string
}
export interface SortType {
  url: string
  tag: string
}
export interface SortMap {
  [key: string]: SortType
}
export function getSortString(field: string, sort: Sort): string {
  if (field === sort.field) {
    return sort.type === "-" ? field : "-" + field
  }
  return field
}
export function buildSort(s?: string): Sort {
  if (!s || s.indexOf(",") >= 0) {
    return {} as Sort
  }
  if (s.startsWith("-")) {
    return { field: s.substring(1), type: "-" }
  } else {
    return { field: s.startsWith("+") ? s.substring(1) : s, type: "+" }
  }
}
export function buildSortFromRequest(req: Request): Sort {
  const s = queryString(req, "sort")
  return buildSort(s)
}
export function renderSort(field: string, sort: Sort): string {
  if (field === sort.field) {
    return sort.type === "-" ? "<i class='sort-down'></i>" : "<i class='sort-up'></i>"
  }
  return et
}
export function buildSortSearch(query: string, fields: string[], sort: Sort): SortMap {
  query = removeSort(query)
  let sorts: SortMap = {}
  const prefix = query.length > 0 ? "?" + query + "&" : "?"
  for (let i = 0; i < fields.length; i++) {
    sorts[fields[i]] = {
      url: prefix + "sort=" + getSortString(fields[i], sort),
      tag: renderSort(fields[i], sort),
    }
  }
  return sorts
}
