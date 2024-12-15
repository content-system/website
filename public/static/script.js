"use strict"
var r1 = / |,|\$|€|£|¥|'|٬|،| /g
var r2 = / |\.|\$|€|£|¥|'|٬|،| /g
var resources = (function () {
  function resources() {}
  resources.defaultLimit = 12
  resources.containerClass = "form-input"
  resources.hiddenMessage = "hidden-message"
  resources.token = "token"
  resources.num1 = / |,|\$|€|£|¥|'|٬|،| /g
  resources.num2 = / |\.|\$|€|£|¥|'|٬|،| /g
  resources.email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/i
  resources.phone = /^\d{5,14}$/
  resources.password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  resources.url = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
  resources.digit = /^\d+$/
  resources.amount = /^[0-9]{0,15}(?:\.[0-9]{1,3})?$/
  resources.digitAndDash = /^[0-9-]*$/
  resources.digitAndChar = /^\w*\d*$/
  resources.checkNumber = /^\d{0,8}$/
  resources.percentage = /^[1-9][0-9]?$|^100$/
  resources.ipv4 = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/
  resources.usPostcode = /(^\d{5}$)|(^\d{5}-\d{4}$)/
  resources.caPostcode =
    /^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy][0-9][ABCEGHJKLMNPRSTVWXYZabceghjklmnprstvwxyz][ -]?[0-9][ABCEGHJKLMNPRSTVWXYZabceghjklmnprstvwxyz][0-9]$/
  resources.ipv6 =
    /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/
  return resources
})()
function parseDate(v, format) {
  if (!format || format.length === 0) {
    format = "MM/DD/YYYY"
  } else {
    format = format.toUpperCase()
  }
  var dateItems = format.split(/\/|\.| |-/)
  var valueItems = v.split(/\/|\.| |-/)
  var imonth = dateItems.indexOf("M")
  var iday = dateItems.indexOf("D")
  var iyear = dateItems.indexOf("YYYY")
  if (imonth === -1) {
    imonth = dateItems.indexOf("MM")
  }
  if (iday === -1) {
    iday = dateItems.indexOf("DD")
  }
  if (iyear === -1) {
    iyear = dateItems.indexOf("YY")
  }
  var month = parseInt(valueItems[imonth], 10) - 1
  var year = parseInt(valueItems[iyear], 10)
  if (year < 100) {
    year += 2000
  }
  var day = parseInt(valueItems[iday], 10)
  return new Date(year, month, day)
}
var o = "object"
function trimNull(obj) {
  if (!obj || typeof obj !== o) {
    return obj
  }
  var keys = Object.keys(obj)
  for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
    var key = keys_1[_i]
    var v = obj[key]
    if (v === null) {
      delete obj[key]
    } else if (Array.isArray(v) && v.length > 0) {
      var v1 = v[0]
      if (typeof v1 === o && !(v1 instanceof Date)) {
        for (var _a = 0, v_1 = v; _a < v_1.length; _a++) {
          var item = v_1[_a]
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
function getDecimalSeparator(ele) {
  var separator = ele.getAttribute("data-decimal-separator")
  if (!separator) {
    var form = ele.form
    if (form) {
      separator = form.getAttribute("data-decimal-separator")
    }
  }
  return separator === "," ? "," : "."
}
function detectCtrlKeyCombination(e) {
  var forbiddenKeys = new Array("v", "a", "x", "c")
  var key
  var isCtrl
  var browser = navigator.appName
  if (browser == "Microsoft Internet Explorer") {
    key = e.keyCode
    if (e.ctrlKey) {
      isCtrl = true
    } else {
      isCtrl = false
    }
  } else {
    if (browser == "Netscape") {
      key = e.which
      if (e.ctrlKey) isCtrl = true
      else isCtrl = false
    } else return true
  }
  if (isCtrl) {
    var chr = String.fromCharCode(key).toLowerCase()
    for (var i = 0; i < forbiddenKeys.length; i++) {
      if (forbiddenKeys[i] == chr) {
        return true
      }
    }
  }
  return false
}
function digitOnKeyPress(e) {
  if (detectCtrlKeyCombination(e)) {
    return true
  }
  var key = window.event ? e.keyCode : e.which
  if (key == 13 || key == 8 || key == 9 || key == 11 || key == 127 || key == "\t") {
    return key
  }
  var keychar = String.fromCharCode(key)
  var reg = /\d/
  return reg.test(keychar)
}
function integerOnKeyPress(e) {
  if (detectCtrlKeyCombination(e)) {
    return true
  }
  var key = window.event ? e.keyCode : e.which
  if (key == 13 || key == 8 || key == 9 || key == 11 || key == 127 || key == "\t") {
    return key
  }
  var ele = e.target
  var keychar = String.fromCharCode(key)
  if (keychar == "-") {
    if (ele.value.indexOf("-") >= 0 || isNaN(ele.min) || parseInt(ele.min) >= 0) {
      return false
    }
    return key
  }
  var reg = /\d/
  return reg.test(keychar)
}
function numberOnKeyPress(e) {
  if (detectCtrlKeyCombination(e)) {
    return true
  }
  var key = window.event ? e.keyCode : e.which
  if (key == 13 || key == 8 || key == 9 || key == 11 || key == 127 || key == "\t") {
    return key
  }
  var ele = e.target
  var keychar = String.fromCharCode(key)
  if (keychar == "-") {
    if (ele.value.indexOf("-") >= 0 || isNaN(ele.min) || parseInt(ele.min) >= 0) {
      return false
    }
    return key
  }
  if (keychar == "." || keychar == ",") {
    if (ele.value.indexOf(keychar) >= 0 || keychar !== getDecimalSeparator(ele)) {
      return false
    }
    return key
  }
  var reg = /\d/
  return reg.test(keychar)
}
function trimTime(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}
function addDays(d, n) {
  var newDate = new Date(d)
  newDate.setDate(newDate.getDate() + n)
  return newDate
}
function formatDate(d, dateFormat, full, upper) {
  if (!d) {
    return ""
  }
  var format = dateFormat && dateFormat.length > 0 ? dateFormat : "M/D/YYYY"
  if (upper) {
    format = format.toUpperCase()
  }
  var arr = ["", "", ""]
  var items = format.split(/\/|\.| |-/)
  var iday = items.indexOf("D")
  var im = items.indexOf("M")
  var iyear = items.indexOf("YYYY")
  var fm = full ? full : false
  var fd = full ? full : false
  var fy = true
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
  var s = detectSeparator(format)
  var e = detectLastSeparator(format)
  var l = items.length === 4 ? format[format.length - 1] : ""
  return arr[0] + s + arr[1] + e + arr[2] + l
}
function detectSeparator(format) {
  var len = format.length
  for (var i = 0; i < len; i++) {
    var c = format[i]
    if (!((c >= "A" && c <= "Z") || (c >= "a" && c <= "z"))) {
      return c
    }
  }
  return "/"
}
function detectLastSeparator(format) {
  var len = format.length - 3
  for (var i = len; i > -0; i--) {
    var c = format[i]
    if (!((c >= "A" && c <= "Z") || (c >= "a" && c <= "z"))) {
      return c
    }
  }
  return "/"
}
function getYear(y, full) {
  if (full || (y <= 99 && y >= -99)) {
    return y.toString()
  }
  var s = y.toString()
  return s.substring(s.length - 2)
}
function getD(n, fu) {
  return fu ? pad(n) : n.toString()
}
function formatLongTime(d) {
  return pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds())
}
function pad(n) {
  return n < 10 ? "0" + n : n.toString()
}
function pad3(n) {
  if (n >= 100) {
    return n.toString()
  }
  return n < 10 ? "00" + n : "0" + n.toString()
}
function formatLongDateTime(date, dateFormat, full, upper) {
  if (!date) {
    return ""
  }
  var sd = formatDate(date, dateFormat, full, upper)
  if (sd.length === 0) {
    return sd
  }
  return sd + " " + formatLongTime(date)
}
function getValue(form, name) {
  if (form) {
    for (var i = 0; i < form.length; i++) {
      var ele = form[i]
      if (ele.name === name) {
        return ele.value
      }
    }
  }
  return null
}
function getElement(form, name) {
  if (form) {
    var l = form.length
    for (var i = 0; i < l; i++) {
      var e = form[i]
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
  var p = e
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
function addClass(ele, className) {
  if (ele) {
    if (!ele.classList.contains(className)) {
      ele.classList.add(className)
      return true
    }
  }
  return false
}
function addClasses(ele, classes) {
  var count = 0
  if (ele) {
    for (var i = 0; i < classes.length; i++) {
      if (addClass(ele, classes[i])) {
        count++
      }
    }
  }
  return count
}
function removeClass(ele, className) {
  if (ele) {
    if (ele && ele.classList.contains(className)) {
      ele.classList.remove(className)
      return true
    }
  }
  return false
}
function removeClasses(ele, classes) {
  var count = 0
  if (ele) {
    for (var i = 0; i < classes.length; i++) {
      if (removeClass(ele, classes[i])) {
        count++
      }
    }
  }
  return count
}
function getContainer(ele) {
  return findParent(ele, resources.containerClass, "LABEL")
}
function handleMaterialFocus(ele) {
  if (ele.disabled || ele.readOnly) {
    return
  }
  if (ele.nodeName === "INPUT" || ele.nodeName === "SELECT" || ele.nodeName === "TEXTAREA") {
    addClass(getContainer(ele), "focused")
  }
}
function materialOnFocus(event) {
  var ele = event.currentTarget
  if (ele.disabled || ele.readOnly) {
    return
  }
  setTimeout(function () {
    if (ele.nodeName === "INPUT" || ele.nodeName === "SELECT" || ele.nodeName === "TEXTAREA") {
      addClass(getContainer(ele), "focused")
    }
  }, 0)
}
function materialOnBlur(event) {
  var ele = event.currentTarget
  setTimeout(function () {
    if (ele.nodeName === "INPUT" || ele.nodeName === "SELECT" || ele.nodeName === "TEXTAREA") {
      removeClasses(getContainer(ele), ["focused", "focus"])
    }
  }, 0)
}
function registerEvents(form) {
  var len = form.length
  for (var i = 0; i < len; i++) {
    var ele = form[i]
    if (ele.nodeName === "INPUT" || ele.nodeName === "SELECT" || ele.nodeName === "TEXTAREA") {
      var type = ele.getAttribute("type")
      if (type != null) {
        type = type.toLowerCase()
      }
      if (ele.nodeName === "INPUT" && (type === "checkbox" || type === "radio" || type === "submit" || type === "button" || type === "reset")) {
        continue
      } else {
        var parent_1 = ele.parentElement
        var required = ele.getAttribute("required")
        if (parent_1) {
          if (parent_1.nodeName === "LABEL" && required != null && required !== undefined && required != "false" && !parent_1.classList.contains("required")) {
            parent_1.classList.add("required")
          } else if (parent_1.classList.contains("form-group") || parent_1.classList.contains("field")) {
            var firstChild = parent_1.firstChild
            if (firstChild && firstChild.nodeName === "LABEL") {
              if (!firstChild.classList.contains("required")) {
                firstChild.classList.add("required")
              }
            }
          }
        }
        if (ele.getAttribute("onblur") === null && ele.getAttribute("(blur)") === null) {
          ele.onblur = materialOnBlur
        }
        if (ele.getAttribute("onfocus") === null && ele.getAttribute("(focus)") === null) {
          ele.onfocus = materialOnFocus
        }
      }
    }
  }
}
function valueOf(obj, key) {
  var mapper = key.split(".").map(function (item) {
    return item.replace(/\[/g, ".[").replace(/\[|\]/g, "")
  })
  var reSplit = mapper.join(".").split(".")
  return reSplit.reduce(function (acc, current, index, source) {
    var value = getDirectValue(acc, current)
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
  var replaceKey = key.replace(/\[/g, ".[").replace(/\.\./g, ".")
  if (replaceKey.indexOf(".") === 0) {
    replaceKey = replaceKey.slice(1, replaceKey.length)
  }
  var keys = replaceKey.split(".")
  var firstKey = keys.shift()
  if (!firstKey) {
    return
  }
  var isArrayKey = /\[([0-9]+)\]/.test(firstKey)
  if (keys.length > 0) {
    var firstKeyValue = obj[firstKey] || {}
    var returnValue = setValue(firstKeyValue, keys.join("."), value)
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
function decodeFromForm(form, currencySymbol) {
  var dateFormat = form.getAttribute("data-date-format")
  var obj = {}
  var len = form.length
  var _loop_1 = function (i) {
    var ele = form[i]
    var name_1 = ele.getAttribute("name")
    var id = ele.getAttribute("id")
    var val = void 0
    var isDate = false
    var dataField = ele.getAttribute("data-field")
    if (dataField && dataField.length > 0) {
      name_1 = dataField
    } else if ((!name_1 || name_1 === "") && ele.parentElement && ele.parentElement.classList.contains("DayPickerInput")) {
      if (ele.parentElement.parentElement) {
        dataField = ele.parentElement.parentElement.getAttribute("data-field")
        isDate = true
        name_1 = dataField
      }
    }
    if (isDate === false && ele.getAttribute("data-type") === "date") {
      isDate = true
    }
    if (name_1 != null && name_1 !== "") {
      var nodeName = ele.nodeName
      var type = ele.getAttribute("type")
      if (nodeName === "INPUT" && type !== null) {
        nodeName = type.toUpperCase()
      }
      if (nodeName !== "BUTTON" && nodeName !== "RESET" && nodeName !== "SUBMIT") {
        switch (type) {
          case "checkbox":
            if (id && name_1 !== id) {
              val = valueOf(obj, name_1)
              if (!val) {
                val = []
              }
              if (ele.checked) {
                val.push(ele.value)
              } else {
                val = val.filter(function (item) {
                  return item != ele.value
                })
              }
            } else {
              val = ele.value.length > 0 ? ele.value : ele.checked
            }
            setValue(obj, name_1, val)
            return "continue"
          case "radio":
            if (ele.checked) {
              val = ele.value.length > 0 ? ele.value : ele.checked
              setValue(obj, name_1, val)
            }
            return "continue"
          case "date":
            val = ele.value.length === 10 ? ele.value : null
            break
          case "datetime-local":
            if (ele.value.length > 0) {
              try {
                val = new Date(ele.value)
              } catch (err) {
                val = null
              }
            } else {
              val = null
            }
            break
          default:
            val = ele.value
        }
        if (isDate && dateFormat && dateFormat.length > 0) {
          var d = parseDate(val, dateFormat)
          val = d.toString() === "Invalid Date" ? null : d
        }
        var datatype = ele.getAttribute("data-type")
        var v = ele.value
        var symbol = void 0
        if (datatype === "currency" || datatype === "string-currency") {
          symbol = ele.getAttribute("data-currency-symbol")
          if (!symbol) {
            symbol = currencySymbol
          }
          if (symbol && symbol.length > 0 && v.indexOf(symbol) >= 0) {
            v = v.replace(symbol, "")
          }
        }
        if (type === "number" || datatype === "currency" || datatype === "integer" || datatype === "number") {
          var decimalSeparator = getDecimalSeparator(ele)
          v = decimalSeparator === "," ? v.replace(r2, "") : (v = v.replace(r1, ""))
          val = isNaN(v) ? null : parseFloat(v)
        }
        setValue(obj, name_1, val)
      }
    }
  }
  for (var i = 0; i < len; i++) {
    _loop_1(i)
  }
  return obj
}
function removeFormatUrl(url) {
  var startParams = url.indexOf("?")
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
  var pageIndex = ft.page
  if (pageIndex && !isNaN(pageIndex) && pageIndex <= 1) {
    delete ft.page
  }
  var keys = Object.keys(ft)
  var url = "?partial=true"
  for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
    var key = keys_2[_i]
    var objValue = ft[key]
    if (objValue) {
      if (key !== fields) {
        if (typeof objValue === "string" || typeof objValue === "number") {
          if (key === page) {
            if (objValue != 1) {
              url += getPrefix(url) + (key + "=" + objValue)
            }
          } else if (key === limit) {
            if (objValue != resources.defaultLimit) {
              url += getPrefix(url) + (key + "=" + objValue)
            }
          } else {
            url += getPrefix(url) + (key + "=" + objValue)
          }
        } else if (typeof objValue === "object") {
          if (objValue instanceof Date) {
            url += getPrefix(url) + (key + "=" + objValue.toISOString())
          } else {
            if (Array.isArray(objValue)) {
              if (objValue.length > 0) {
                var strs = []
                for (var _a = 0, objValue_1 = objValue; _a < objValue_1.length; _a++) {
                  var subValue = objValue_1[_a]
                  if (typeof subValue === "string") {
                    strs.push(subValue)
                  } else if (typeof subValue === "number") {
                    strs.push(subValue.toString())
                  }
                }
                url += getPrefix(url) + (key + "=" + strs.join(","))
              }
            } else {
              var keysLvl2 = Object.keys(objValue)
              for (var _b = 0, keysLvl2_1 = keysLvl2; _b < keysLvl2_1.length; _b++) {
                var key2 = keysLvl2_1[_b]
                var objValueLvl2 = objValue[key2]
                if (objValueLvl2 instanceof Date) {
                  url += getPrefix(url) + (key + "." + key2 + "=" + objValueLvl2.toISOString())
                } else {
                  url += getPrefix(url) + (key + "." + key2 + "=" + objValueLvl2)
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
  var i = search.indexOf(fieldName + "=")
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
  var j = search.indexOf("&", i + fieldName.length)
  return j >= 0 ? search.substring(0, i) + search.substring(j + 1) : search.substring(0, i - 1)
}
function getField(search, fieldName) {
  var i = search.indexOf(fieldName + "=")
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
  var j = search.indexOf("&", i + fieldName.length)
  return j >= 0 ? search.substring(i, j) : search.substring(i)
}
function changePage(e) {
  e.preventDefault()
  var target = e.target
  var search = target.search
  if (search.length > 0) {
    search = search.substring(1)
  }
  search = removeField(search, "partial")
  var p = getField(search, "page")
  if (p === "page=1") {
    search = removeField(search, "page")
  }
  var url = window.location.origin + window.location.pathname
  url = url + (search.length === 0 ? "?partial=true" : "?" + search + "&partial=true")
  var newUrl = window.location.origin + window.location.pathname
  if (search.length > 0) {
    newUrl = newUrl + "?" + search
  }
  var resource = getResource()
  fetch(url, {
    method: "GET",
    headers: getHeaders(),
  })
    .then(function (response) {
      if (response.ok) {
        response.text().then(function (data) {
          var pageBody = document.getElementById("pageBody")
          if (pageBody) {
            pageBody.innerHTML = data
            var forms_1 = pageBody.querySelectorAll("form")
            for (var i = 0; i < forms_1.length; i++) {
              registerEvents(forms_1[i])
            }
            setTimeout(function () {
              var msg = getHiddenMessage(forms_1, resources.hiddenMessage)
              if (msg && msg.length > 0) {
                toast(msg)
              }
            }, 0)
          }
          window.history.pushState(undefined, "Title", newUrl)
        })
      } else {
        console.error("Error: ", response.statusText)
        alertError(resource.error_submit_failed, undefined, undefined, response.statusText)
      }
    })
    .catch(function (err) {
      console.log("Error: " + err)
      alertError(resource.error_submitting_form, undefined, undefined, err)
    })
}
function search(e) {
  e.preventDefault()
  var target = e.target
  var form = target.form
  var initFilter = decodeFromForm(form)
  var filter = trimNull(initFilter)
  filter.page = 1
  var search = buildSearchUrl(filter)
  var url = getCurrentURL() + search
  var newUrl = getCurrentURL()
  if (search.length > 0) {
    var s = removeField(search.substring(1), "partial")
    if (s.length > 0) {
      newUrl = newUrl + "?" + s
    }
  }
  var resource = getResource()
  fetch(url, {
    method: "GET",
    headers: getHeaders(),
  })
    .then(function (response) {
      if (response.ok) {
        response.text().then(function (data) {
          var pageBody = document.getElementById("pageBody")
          if (pageBody) {
            pageBody.innerHTML = data
            var forms_2 = pageBody.querySelectorAll("form")
            for (var i = 0; i < forms_2.length; i++) {
              registerEvents(forms_2[i])
            }
            setTimeout(function () {
              var msg = getHiddenMessage(forms_2, resources.hiddenMessage)
              if (msg && msg.length > 0) {
                toast(msg)
              }
            }, 0)
          }
          window.history.pushState(undefined, "Title", newUrl)
        })
      } else {
        console.error("Error: ", response.statusText)
        alertError(resource.error_submit_failed, undefined, undefined, response.statusText)
      }
    })
    .catch(function (err) {
      console.log("Error: " + err)
      alertError(resource.error_submitting_form, undefined, undefined, err)
    })
}
function getHiddenMessage(nodes, name, i) {
  var index = i !== undefined && i >= 0 ? i : 0
  if (nodes.length > index) {
    var form = nodes[index]
    var n = name && name.length > 0 ? name : "hidden-message"
    var ele = form.querySelector("." + n)
    if (ele) {
      return ele.innerHTML
    }
  }
  return null
}
function showErrorMessage(form, msg) {
  var ele = form.querySelector(".message")
  if (ele) {
    if (!ele.classList.contains("alert-error")) {
      ele.classList.add("alert-error")
    }
    ele.innerHTML = msg + '<span onclick="clearMessage(event)"></span>'
  }
  return false
}
function setInputValue(form, name, value) {
  if (form) {
    for (var i = 0; i < form.length; i++) {
      var ele = form[i]
      if (ele.name === name) {
        ele.value = value
        return true
      }
    }
  }
  return false
}
function getToken() {
  var token = localStorage.getItem(resources.token)
  return token
}
function submitFormData(e) {
  e.preventDefault()
  var target = e.target
  var form = target.form
  var valid = validateForm(form)
  if (!valid) {
    return
  }
  var resource = getResource()
  var successText = target.getAttribute("data-success")
  var confirmText = target.getAttribute("data-message")
  if (!confirmText) {
    confirmText = resource.msg_confirm_save
  }
  showConfirm(confirmText, function () {
    showLoading()
    var url = getCurrentURL()
    var formData = new FormData(form)
    fetch(url, {
      method: "POST",
      headers: getHttpHeaders(),
      body: formData,
    })
      .then(function (response) {
        if (response.ok) {
          response.text().then(function (data) {
            var pageBody = document.getElementById("pageBody")
            if (pageBody) {
              pageBody.innerHTML = data
              var forms = pageBody.querySelectorAll("form")
              for (var i = 0; i < forms.length; i++) {
                registerEvents(forms[i])
              }
            }
            hideLoading()
            if (successText) {
              alertSuccess(successText)
            }
          })
        } else {
          hideLoading()
          console.error("Error: ", response.statusText)
          alertError(resource.error_submit_failed, undefined, undefined, response.statusText)
        }
      })
      .catch(function (err) {
        hideLoading()
        console.log("Error: " + err)
        alertError(resource.error_submitting_form, undefined, undefined, err)
      })
  })
}
function getHeaders() {
  var token = getToken()
  if (token && token.length > 0) {
    return { Authorization: "Bearer " + token }
  } else {
    return {}
  }
}
function getHttpHeaders() {
  var token = getToken()
  if (token && token.length > 0) {
    return {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + token,
    }
  } else {
    return {
      "Content-Type": "application/json;charset=utf-8",
    }
  }
}
function submitForm(e) {
  e.preventDefault()
  var target = e.target
  var form = target.form
  var valid = validateForm(form)
  if (!valid) {
    return
  }
  var resource = getResource()
  var confirmText = target.getAttribute("data-message")
  if (!confirmText) {
    confirmText = resource.msg_confirm_save
  }
  showConfirm(confirmText, function () {
    showLoading()
    var data = decodeFromForm(form)
    var url = getCurrentURL()
    fetch(url, {
      method: "POST",
      headers: getHttpHeaders(),
      body: JSON.stringify(data),
    })
      .then(function (response) {
        if (response.ok) {
          var successText = target.getAttribute("data-success")
          if (!successText) {
            successText = resource.msg_save_success
          }
          alertSuccess(successText)
        } else {
          if (response.status === 422) {
            response.json().then(function (errors) {
              showFormError(form, errors)
            })
          } else if (response.status === 409) {
            alertError(resource.error_409)
          } else if (response.status === 400) {
            alertError(resource.error_400, undefined, undefined, response.statusText)
          } else {
            alertError(resource.error_submit_failed, undefined, undefined, response.statusText)
          }
        }
        hideLoading()
      })
      .catch(function (err) {
        hideLoading()
        console.log("Error: " + err)
        alertError(resource.error_submitting_form, undefined, undefined, err)
      })
  })
}
