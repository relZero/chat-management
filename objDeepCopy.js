export default function objectDeepCopy(obj = {}, defaultObj = {}, newObj = {}) {
  for (const key in defaultObj) {
    const isSubObject = objectFor(defaultObj, key)
    if (isSubObject.thisFlag) {
      obj[isSubObject.thisKey] = newObj[isSubObject.thisKey] ? Object.assign({}, defaultObj[isSubObject.thisKey], newObj[isSubObject.thisKey]) : defaultObj[isSubObject.thisKey]
      objectDeepCopy(obj[isSubObject.thisKey], defaultObj[isSubObject.thisKey], newObj[isSubObject.thisKey])
    }
  }
  return obj
}

function objectFor(defaultObj, key) {
  if (Object.prototype.toString.call(defaultObj[key]) === '[object Object]') {
    const subObjectFlag = true
    return { thisFlag: subObjectFlag, thisKey: key }
  } else {
    return { thisFlag: false }
  }
}
