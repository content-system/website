function findParentNode(e: HTMLElement | null | undefined, nodeName: string): HTMLElement | null {
  if (!e) {
    return null
  }
  if (e.nodeName == nodeName) {
    return e
  }
  let p: HTMLElement | null = e
  while (true) {
    p = p.parentElement
    if (!p) {
      return null
    }
    if (p.nodeName == nodeName) {
      return p
    }
  }
}
function findParent(e: HTMLElement | null | undefined, className: string): HTMLElement | null {
  if (!e) {
    return null
  }
  let p: HTMLElement | null = e
  while (true) {
    p = p.parentElement
    if (!p) {
      return null
    }
    if (p.classList.contains(className)) {
      return p
    }
  }
}
function changeMenu() {
  const body = document.getElementById("sysBody")
  if (body) {
    body.classList.toggle("top-menu")
  }
}
function changeMode() {
  const body = document.getElementById("sysBody")
  if (body) {
    body.classList.toggle("dark")
  }
}
function toggleMenu(e: Event) {
  const p = findParent(e.target as HTMLElement, "sidebar-parent")
  if (p) {
    p.classList.toggle("menu-on")
  }
}
function toggleUniversalSearch(e: Event) {
  const p = findParent(e.target as HTMLElement, "sidebar-parent")
  if (p) {
    p.classList.toggle("search")
  }
}

function navigate(e: Event) {
  e.preventDefault()
  const target = e.target as HTMLElement
  const link = findParentNode(target, "A") as HTMLLinkElement
  if (link) {
    const url = link.href
    fetch(url + "?partial=true", { method: "GET" })
      .then((response) => {
        if (response.ok) {
          response.text().then((data) => {
            const pageBody = document.getElementById("pageBody")
            if (pageBody) {
              pageBody.innerHTML = data
              const span = link.querySelector("span")
              const title = span ? span.innerText : link.innerText
              window.history.pushState({ pageTitle: title }, "", url)
              const parent = findParentNode(target, "LI")
              if (parent) {
                const nav = findParentNode(parent, "NAV")
                if (nav) {
                  const elI = nav.querySelector(".active")
                  if (elI) {
                    elI.classList.remove("active")
                  }
                }
                parent.classList.add("active")
              }
            }
          })
        } else {
          console.error("Error:", response.statusText)
          alert("Failed to submit data.")
        }
      })
      .catch((err) => {
        console.log("Error: " + err)
        alert("An error occurred while submitting the form")
      })
  }
}
function toggleMenuItem(e: Event) {
  e.preventDefault()
  let target = e.target as HTMLElement
  const nul = target.nextElementSibling
  if (nul) {
    const elI = target.querySelector(".menu-item > i.entity-icon")
    if (elI) {
      if (nul.classList.contains("expanded")) {
        nul.classList.remove("expanded")
        elI.classList.add("up")
        elI.classList.remove("down")
      } else {
        nul.classList.add("expanded")
        elI.classList.remove("up")
        elI.classList.add("down")
      }
    }
  }
  const parent = findParentNode(target, "LI")
  if (parent) {
    parent.classList.toggle("open")
  }
}

function getFirstPath(url: string): string {
  const s = url.substring(8)
  const i = s.indexOf("/")
  if (i < 0 || s.length - i <= 1) {
    return "/"
  }
  const j = s.indexOf("/", i + 1)
  if (j > 0) {
    return s.substring(i, j)
  } else {
    return s.substring(i)
  }
}
window.onload = function () {
  setTimeout(function () {
    const target = document.getElementById("sysNav") as HTMLElement
    const firstPath = getFirstPath(window.location.origin + window.location.pathname)
    const activePath = window.location.origin + firstPath
    const elA = target.querySelectorAll("a")
    const l = elA.length
    for (let i = 0; i < l; i++) {
      if (elA[i].href === activePath) {
        elA[i].parentElement?.classList.add("active")
        return
      }
    }
  }, 50)
}
