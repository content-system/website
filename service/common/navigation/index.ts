import { DB } from "onecore"

export interface MenuItem {
  id?: string
  name: string
  path?: string
  resource?: string
  icon?: string
  sequence?: number
  children?: MenuItem[]
}
export interface Category {
  id: string
  name: string
  path?: string
  resource?: string
  icon?: string
  sequence?: number
  type?: string
  parent?: string
  children?: MenuItem[]
}
export class MenuItemLoader {
  constructor(private db: DB) {
    this.load = this.load.bind(this)
  }
  load(): Promise<MenuItem[]> {
    const sql = "select id, name, path, resource_key as resource, icon, sequence, type, parent from categories where status = 'A'"
    return this.db.query<Category>(sql).then((categories) => {
      return toMenuItems(categories)
    })
  }
}

export function sub(n1?: number, n2?: number): number {
  if (!n1 && !n2) {
    return 0
  } else if (n1 && n2) {
    return n1 - n2
  } else if (n1) {
    return n1
  } else if (n2) {
    return -n2
  }
  return 0
}
function subMenuItem(p1: MenuItem, p2: MenuItem): number {
  return sub(p1.sequence, p2.sequence)
}
export function toMenuItems(m: Category[]): MenuItem[] {
  const ps: Category[] = getRoot(m)
  for (const p of ps) {
    getChildren(p, m)
  }
  return ps.sort(subMenuItem)
}
function getRoot(ms: Category[]): Category[] {
  const ps: Category[] = []
  for (const m of ms) {
    if (!m.parent || m.parent.length === 0) {
      delete m.parent
      ps.push(m)
    }
  }
  return ps.sort(subMenuItem)
}
function getChildren(m: Category, all: Category[]) {
  const children: MenuItem[] = []
  for (const s of all) {
    if (s.parent === m.id) {
      delete s.parent
      children.push(s)
      getChildren(s, all)
    }
  }
  if (children.length > 0) {
    children.sort(subMenuItem)
    m.children = children
  }
}

function renderSingleItem(item: MenuItem): string {
  return `<li><a class="menu-item" href="${item.path}" onclick="navigate(event)"><i class="material-icons">${item.icon}</i><span>${item.name}</span></a></li>`
}
function renderArray(item: MenuItem[]): string {
  return item.map((i) => renderSingleItem(i)).join("")
}
function renderItem(item: MenuItem): string {
  if (item.children && item.children.length > 0) {
    return `<li class="open">
  <div class="menu-item" onclick="toggleMenuItem(event)">
    <i class="material-icons">${item.icon}</i><span>${item.name}</span><i class="entity-icon down"></i>
  </div>
  <ul class="sub-list expanded">${renderArray(item.children)}</ul>
</li>`
  } else {
    return renderSingleItem(item)
  }
}
export function renderItems(items: MenuItem[]): string {
  return items.map((i) => renderItem(i)).join("")
}
