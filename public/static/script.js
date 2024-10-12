var sysTitle, sysBody, sysLoading, sysToast, sysAlert, sysMessageHeader, sysMessage, sysErrorDetail, sysErrorDetailText, sysYes, sysNo, sysErrorDetailCaret

sysTitle = document.getElementById("sysTitle")
sysBody = document.getElementById("sysBody")
sysLoading = document.getElementById("sysLoading")
sysToast = document.getElementById("sysToast")
sysAlert = document.getElementById("sysAlert")
sysMessageHeader = document.getElementById("sysMessageHeader")
sysMessage = document.getElementById("sysMessage")
sysErrorDetail = document.getElementById("sysErrorDetail")
sysErrorDetailText = document.getElementById("sysErrorDetailText")

sysErrorDetailCaret = document.getElementById("sysErrorDetailCaret")

sysYes = document.getElementById("sysYes")
sysNo = document.getElementById("sysNo")
document.getElementById("sysNo").addEventListener("click", function () {
  sysAlert.style.display = "none"
  if (window.fnoOnClick) {
    window.fnoOnClick()
  }
  const input = sysYes["activeElement"]
  if (input) {
    try {
      input.focus()
    } catch (err) {}
  }
  sysYes["activeElement"] = null
})
document.getElementById("sysYes").addEventListener("click", function () {
  sysAlert.style.display = "none"
  if (window.fyesOnClick) {
    window.fyesOnClick()
  }
  const input = sysYes["activeElement"]
  if (input) {
    try {
      input.focus()
    } catch (err) {}
  }
  sysYes["activeElement"] = null
})
var yesOnClick = function () {
  console.log("yesss")

  sysAlert.style.display = "none"
  if (window.fyesOnClick) {
    window.fyesOnClick()
  }
  const input = sysYes["activeElement"]
  if (input) {
    try {
      input.focus()
    } catch (err) {}
  }
  sysYes["activeElement"] = null
}
var noOnClick = function () {
  sysAlert.style.display = "none"
  if (window.fnoOnClick) {
    window.fnoOnClick()
  }
  const input = sysYes["activeElement"]
  if (input) {
    try {
      input.focus()
    } catch (err) {}
  }
  sysYes["activeElement"] = null
}
var callCount = 0

function findParent(ele, className) {
  var p = ele
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
function toggleClass(ele, className) {
  if (ele.classList.contains(className)) {
    ele.classList.remove(className)
    return false
  } else {
    ele.classList.add(className)
    return true
  }
}

function changeMenu() {
  var body = document.getElementById("sysBody")
  toggleClass(body, "top-menu")
}
function changeMode() {
  var body = document.getElementById("sysBody")
  toggleClass(body.parentElement, "dark")
}
function toggleMenu(event) {
  var p = findParent(event.target, "sidebar-parent")
  if (p) {
    toggleClass(p, "menu-on")
  }
}
function toggleSearch(event) {
  var p = findParent(event.target, "sidebar-parent")
  if (p) {
    toggleClass(p, "search")
  }
}
function toggleMenuItem(event) {
  event.preventDefault()
  var target = event.currentTarget
  var currentTarget = event.currentTarget
  var nul = currentTarget.nextElementSibling
  if (nul) {
    var elI = currentTarget.querySelectorAll(".menu-item > i.entity-icon")
    if (nul.classList.contains("expanded")) {
      nul.classList.remove("expanded")
      if (elI && elI.length > 0) {
        elI[0].classList.add("up")
        elI[0].classList.remove("down")
      }
    } else {
      nul.classList.add("expanded")
      if (elI && elI.length > 0) {
        elI[0].classList.remove("up")
        elI[0].classList.add("down")
      }
    }
  }
  if (target.nodeName === "A") {
    target = target.parentElement
  }
  if (target && target.nodeName === "LI") {
    target.classList.toggle("open")
  }
}
