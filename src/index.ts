/*
 * @Author: shimingxia
 * @Date: 2022-06-30 09:36:49
 * @LastEditors: shimingxia
 * @LastEditTime: 2022-06-30 09:57:22
 * @Description: 
 */
console.log('hello stoney')

function decorate(target, property, descriptor) {
  const oldValue = descriptor.value
  descriptor.value = msg => {
    msg = `[${msg}]`
    return oldValue.apply(null, [msg])
  }
  return descriptor
}

class Log {
  // @decorate // anotation
  print(msg) {
    console.log(msg)
  }
}

const anotation = (target, property, decorate) => {
  const descriptor = decorate(
    target.prototype,
    property,
    Object.getOwnPropertyDescriptor(target.prototype, property)
  )
  Object.defineProperty(target.prototype, property, descriptor)
}
anotation(Log, 'print', decorate)

// const createDec = sender => (target, property) => {
//   const old = target.prototype[property]
//   target.prototype[property] = msg => {
//     msg = `${sender}: {${msg}}`
//     old(msg)
//   }
// }

// const dec = createDec('Stoney')

// dec(Log, 'print')

const log = new Log()
log.print('hello')