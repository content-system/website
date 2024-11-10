"use strict"
const r1 = / |,|\$|€|£|¥|'|٬|،| /g
const r2 = / |\.|\$|€|£|¥|'|٬|،| /g
class resources {}
resources.defaultLimit = 12
resources.confirmHeader = "Confirm"
resources.errorHeader = "Error"
resources.warningHeader = "Warning"
resources.infoHeader = "Info"
resources.successHeader = "Success"
resources.containerClass = "form-input"
function parseDate(v, format) {
  if (!format || format.length === 0) {
    format = "MM/DD/YYYY"
  } else {
    format = format.toUpperCase()
  }
  const dateItems = format.split(/\/|\.| |-/)
  const valueItems = v.split(/\/|\.| |-/)
  let imonth = dateItems.indexOf("M")
  let iday = dateItems.indexOf("D")
  let iyear = dateItems.indexOf("YYYY")
  if (imonth === -1) {
    imonth = dateItems.indexOf("MM")
  }
  if (iday === -1) {
    iday = dateItems.indexOf("DD")
  }
  if (iyear === -1) {
    iyear = dateItems.indexOf("YY")
  }
  const month = parseInt(valueItems[imonth], 10) - 1
  let year = parseInt(valueItems[iyear], 10)
  if (year < 100) {
    year += 2000
  }
  const day = parseInt(valueItems[iday], 10)
  return new Date(year, month, day)
}
const o = "object"
function trimNull(obj) {
  if (!obj || typeof obj !== o) {
    return obj
  }
  const keys = Object.keys(obj)
  for (const key of keys) {
    const v = obj[key]
    if (v == null) {
      delete obj[key]
    } else if (Array.isArray(v) && v.length > 0) {
      const v1 = v[0]
      if (typeof v1 === o && !(v1 instanceof Date)) {
        for (const item of v) {
          trimNull(item)
        }
      }
    } else if (typeof v === o && !(v instanceof Date)) {
      trimNull(obj[key])
    }
  }
  return obj
}
function getCurrentURL() {
  return window.location.origin + window.location.pathname
}
function getElement(form, name) {
  if (form) {
    const l = form.length
    for (let i = 0; i < l; i++) {
      const e = form[i]
      if (e.getAttribute("name") === name) {
        return e
      }
    }
  }
  return null
}
function findParent(e, className, nodeName) {
  if (!e) {
    return null
  }
  if (nodeName && e.nodeName === nodeName) {
    return e
  }
  let p = e
  while (true) {
    p = p.parentElement
    if (!p) {
      return null
    }
    if (p.classList.contains(className)) {
      return p
    }
    if (nodeName && p.nodeName === nodeName) {
      return p
    }
  }
}
function materialOnFocus(event) {
  const ctrl = event.currentTarget
  if (ctrl.disabled || ctrl.readOnly) {
    return
  }
  setTimeout(() => {
    if (ctrl.nodeName === "INPUT" || ctrl.nodeName === "SELECT" || ctrl.nodeName === "TEXTAREA") {
      const c = findParent(ctrl, resources.containerClass, "LABEL")
      if (c && !c.classList.contains("focused")) {
        c.classList.add("focused")
      }
    }
  }, 0)
}
function materialOnBlur(event) {
  const ctrl = event.currentTarget
  setTimeout(() => {
    if (ctrl.nodeName === "INPUT" || ctrl.nodeName === "SELECT" || ctrl.nodeName === "TEXTAREA") {
      const c = findParent(ctrl, resources.containerClass, "LABEL")
      if (c) {
        c.classList.remove("focused")
        c.classList.remove("focus")
      }
    }
  }, 0)
}
function registerEvents(form) {
  const len = form.length
  for (let i = 0; i < len; i++) {
    const ctrl = form[i]
    if (ctrl.nodeName === "INPUT" || ctrl.nodeName === "SELECT") {
      let type = ctrl.getAttribute("type")
      if (type != null) {
        type = type.toLowerCase()
      }
      if (ctrl.nodeName === "INPUT" && (type === "checkbox" || type === "radio" || type === "submit" || type === "button" || type === "reset")) {
        continue
      } else {
        const parent = ctrl.parentElement
        const required = ctrl.getAttribute("required")
        if (parent) {
          if (parent.nodeName === "LABEL" && required != null && required !== undefined && required != "false" && !parent.classList.contains("required")) {
            parent.classList.add("required")
          } else if (parent.classList.contains("form-group") || parent.classList.contains("field")) {
            const firstChild = parent.firstChild
            if (firstChild && firstChild.nodeName === "LABEL") {
              if (!firstChild.classList.contains("required")) {
                firstChild.classList.add("required")
              }
            }
          }
        }
        if (ctrl.getAttribute("onblur") === null && ctrl.getAttribute("(blur)") === null) {
          ctrl.onblur = materialOnBlur
        } else {
          console.log("name:" + ctrl.getAttribute("name"))
        }
        if (ctrl.getAttribute("onfocus") === null && ctrl.getAttribute("(focus)") === null) {
          ctrl.onfocus = materialOnFocus
        } else {
          console.log("name:" + ctrl.getAttribute("name"))
        }
      }
    } else if (ctrl.nodeName === "TEXTAREA") {
      if (ctrl.getAttribute("blur") === null) {
        ctrl.blur = materialOnBlur
      }
      if (ctrl.getAttribute("focus") === null) {
        ctrl.focus = materialOnFocus
      }
    }
  }
}
function valueOf(obj, key) {
  const mapper = key.split(".").map((item) => {
    return item.replace(/\[/g, ".[").replace(/\[|\]/g, "")
  })
  const reSplit = mapper.join(".").split(".")
  return reSplit.reduce((acc, current, index, source) => {
    const value = getDirectValue(acc, current)
    if (!value) {
      source.splice(1)
    }
    return value
  }, obj)
}
function getDirectValue(obj, key) {
  if (obj && obj.hasOwnProperty(key)) {
    return obj[key]
  }
  return null
}
function setValue(obj, key, value) {
  let replaceKey = key.replace(/\[/g, ".[").replace(/\.\./g, ".")
  if (replaceKey.indexOf(".") === 0) {
    replaceKey = replaceKey.slice(1, replaceKey.length)
  }
  const keys = replaceKey.split(".")
  let firstKey = keys.shift()
  if (!firstKey) {
    return
  }
  const isArrayKey = /\[([0-9]+)\]/.test(firstKey)
  if (keys.length > 0) {
    const firstKeyValue = obj[firstKey] || {}
    const returnValue = setValue(firstKeyValue, keys.join("."), value)
    return setKey(obj, isArrayKey, firstKey, returnValue)
  }
  return setKey(obj, isArrayKey, firstKey, value)
}
function setKey(_object, _isArrayKey, _key, _nextValue) {
  if (_isArrayKey) {
    if (_object.length > _key) {
      _object[_key] = _nextValue
    } else {
      _object.push(_nextValue)
    }
  } else {
    _object[_key] = _nextValue
  }
  return _object
}
function decodeFromForm(form, locale, currencySymbol) {
  const dateFormat = form.getAttribute("date-format")
  const obj = {}
  const len = form.length
  for (let i = 0; i < len; i++) {
    const ctrl = form[i]
    let name = ctrl.getAttribute("name")
    const id = ctrl.getAttribute("id")
    let val
    let isDate = false
    let dataField = ctrl.getAttribute("data-field")
    if (dataField && dataField.length > 0) {
      name = dataField
    } else if ((!name || name === "") && ctrl.parentElement && ctrl.parentElement.classList.contains("DayPickerInput")) {
      if (ctrl.parentElement.parentElement) {
        dataField = ctrl.parentElement.parentElement.getAttribute("data-field")
        isDate = true
        name = dataField
      }
    }
    if (name != null && name !== "") {
      let nodeName = ctrl.nodeName
      const type = ctrl.getAttribute("type")
      if (nodeName === "INPUT" && type !== null) {
        nodeName = type.toUpperCase()
      }
      if (nodeName !== "BUTTON" && nodeName !== "RESET" && nodeName !== "SUBMIT") {
        switch (type) {
          case "checkbox":
            if (id && name !== id) {
              val = valueOf(obj, name)
              if (!val) {
                val = []
              }
              if (ctrl.checked) {
                val.push(ctrl.value)
              } else {
                val = val.filter((item) => item != ctrl.value)
              }
            } else {
              const c0 = ctrl.checked
              if (c0 || c0 === "checked") {
                val = true
              }
            }
            break
          case "radio":
            const cv = ctrl.checked
            if (cv || cv === "checked") {
              val = ctrl.value
            }
            break
          case "date":
            if (ctrl.value.length === 10) {
              try {
                val = new Date(ctrl.value)
              } catch (err) {
                val = null
              }
            } else {
              val = null
            }
            break
          case "datetime-local":
            if (ctrl.value.length > 0) {
              try {
                val = new Date(ctrl.value)
              } catch (err) {
                val = null
              }
            } else {
              val = null
            }
            break
          default:
            val = ctrl.value
        }
        if (isDate && dateFormat && dateFormat.length > 0) {
          try {
            val = parseDate(val, dateFormat)
          } catch (err) {
            val = null
          }
        }
        const ctype = ctrl.getAttribute("data-type")
        let v = ctrl.value
        let symbol
        if (ctype === "currency") {
          symbol = ctrl.getAttribute("currency-symbol")
          if (!symbol) {
            symbol = currencySymbol
          }
          if (symbol && symbol.length > 0 && v.indexOf(symbol) >= 0) {
            v = v.replace(symbol, "")
          }
        }
        if (type === "number" || ctype === "currency" || ctype === "int" || ctype === "number") {
          if (locale && locale.decimalSeparator !== ".") {
            v = v.replace(r2, "")
          } else {
            v = v.replace(r1, "")
          }
          val = isNaN(v) ? null : parseFloat(v)
        }
        setValue(obj, name, val)
      }
    }
  }
  return obj
}
function removeFormatUrl(url) {
  const startParams = url.indexOf("?")
  return startParams !== -1 ? url.substring(0, startParams) : url
}
function getPrefix(url) {
  return url.indexOf("?") >= 0 ? "&" : "?"
}
function buildSearchUrl(ft, page, limit, fields) {
  if (!page || page.length === 0) {
    page = "page"
  }
  if (!limit || limit.length === 0) {
    limit = "limit"
  }
  if (!fields || fields.length === 0) {
    fields = "fields"
  }
  const pageIndex = ft.page
  if (pageIndex && !isNaN(pageIndex) && pageIndex <= 1) {
    delete ft.page
  }
  const keys = Object.keys(ft)
  let url = "?partial=true"
  for (const key of keys) {
    const objValue = ft[key]
    if (objValue) {
      if (key !== fields) {
        if (typeof objValue === "string" || typeof objValue === "number") {
          if (key === page) {
            if (objValue != 1) {
              url += getPrefix(url) + `${key}=${objValue}`
            }
          } else if (key === limit) {
            if (objValue != resources.defaultLimit) {
              url += getPrefix(url) + `${key}=${objValue}`
            }
          } else {
            url += getPrefix(url) + `${key}=${objValue}`
          }
        } else if (typeof objValue === "object") {
          if (objValue instanceof Date) {
            url += getPrefix(url) + `${key}=${objValue.toISOString()}`
          } else {
            if (Array.isArray(objValue)) {
              if (objValue.length > 0) {
                const strs = []
                for (const subValue of objValue) {
                  if (typeof subValue === "string") {
                    strs.push(subValue)
                  } else if (typeof subValue === "number") {
                    strs.push(subValue.toString())
                  }
                }
                url += getPrefix(url) + `${key}=${strs.join(",")}`
              }
            } else {
              const keysLvl2 = Object.keys(objValue)
              for (const key2 of keysLvl2) {
                const objValueLvl2 = objValue[key2]
                if (objValueLvl2 instanceof Date) {
                  url += getPrefix(url) + `${key}.${key2}=${objValueLvl2.toISOString()}`
                } else {
                  url += getPrefix(url) + `${key}.${key2}=${objValueLvl2}`
                }
              }
            }
          }
        }
      }
    }
  }
  return url
}
function removeField(search, fieldName) {
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
function getField(search, fieldName) {
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
function changePage(e) {
  e.preventDefault()
  const target = e.target
  let search = target.search
  if (search.length > 0) {
    search = search.substring(1)
  }
  search = removeField(search, "partial")
  const p = getField(search, "page")
  if (p === "page=1") {
    search = removeField(search, "page")
  }
  let url = window.location.origin + window.location.pathname
  url = url + (search.length === 0 ? "?partial=true" : "?" + search + "&partial=true")
  let newUrl = window.location.origin + window.location.pathname
  if (search.length > 0) {
    newUrl = newUrl + "?" + search
  }
  fetch(url, { method: "GET" })
    .then((response) => {
      if (response.ok) {
        response.text().then((data) => {
          const pageBody = document.getElementById("pageBody")
          if (pageBody) {
            pageBody.innerHTML = data
            const forms = pageBody.querySelectorAll("form")
            for (let i = 0; i < forms.length; i++) {
              registerEvents(forms[i])
            }
          }
          window.history.pushState(undefined, "Title", newUrl)
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
function search(e) {
  e.preventDefault()
  const target = e.target
  const form = target.form
  const initFilter = decodeFromForm(form)
  const filter = trimNull(initFilter)
  filter.page = 1
  const search = buildSearchUrl(filter)
  const url = getCurrentURL() + search
  let newUrl = getCurrentURL()
  if (search.length > 0) {
    const s = removeField(search.substring(1), "partial")
    if (s.length > 0) {
      newUrl = newUrl + "?" + s
    }
  }
  fetch(url, {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        response.text().then((data) => {
          const pageBody = document.getElementById("pageBody")
          if (pageBody) {
            pageBody.innerHTML = data
            const forms = pageBody.querySelectorAll("form")
            for (let i = 0; i < forms.length; i++) {
              registerEvents(forms[i])
            }
          }
          window.history.pushState(undefined, "Title", newUrl)
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
function saveFormData(e) {
  e.preventDefault()
  const target = e.target
  const form = target.form
  const formData = new FormData(form)
  let confirmText = target.getAttribute("data-message")
  if (!confirmText) {
    confirmText = "Are you sure you want to save?"
  }
  showConfirm(confirmText, () => {
    const url = getCurrentURL()
    showLoading()
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          response.text().then((data) => {
            const pageBody = document.getElementById("pageBody")
            if (pageBody) {
              pageBody.innerHTML = data
              const forms = pageBody.querySelectorAll("form")
              for (let i = 0; i < forms.length; i++) {
                registerEvents(forms[i])
              }
            }
            hideLoading()
          })
        } else {
          console.error("Error:", response.statusText)
          hideLoading()
          alert("Failed to submit data.")
        }
      })
      .catch((err) => {
        console.log("Error: " + err)
        hideLoading()
        alert("An error occurred while submitting the form")
      })
  })
}
function save(e) {
  e.preventDefault()
  const target = e.target
  const form = target.form
  const contact = decodeFromForm(form)
  const url = getCurrentURL()
  showLoading()
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  })
    .then((response) => {
      if (response.ok) {
        response.text().then((data) => {
          console.log("Success:", data)
          hideLoading()
          alert("Data submitted successfully!")
        })
      } else {
        console.error("Error:", response.statusText)
        hideLoading()
        alert("Failed to submit data.")
      }
    })
    .catch((err) => {
      console.log("Error: " + err)
      hideLoading()
      alert("An error occurred while submitting the form")
    })
}
