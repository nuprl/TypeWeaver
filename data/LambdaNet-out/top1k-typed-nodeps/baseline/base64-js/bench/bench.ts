const base64: String = require('../')
const benchmark: Array = require('benchmark')

const suite: HTMLElement = new benchmark.Suite()
const random: Function = require('crypto').randomBytes
const data: String = random(1e6).toString('base64')
const raw: String = base64.toByteArray(data)

suite
  .add('base64.toByteArray() (decode)', function () {
    const raw2: String = base64.toByteArray(data) // eslint-disable-line no-unused-vars
  })
  .add('base64.fromByteArray() (encode)', function () {
    const data2: Object = base64.fromByteArray(raw) // eslint-disable-line no-unused-vars
  })
  .add('base64.byteLength() (encode)', function () {
    const len: Number = base64.byteLength(data) // eslint-disable-line no-unused-vars
  })
  .on('error', function (event: TypedPropertyDescriptor) {
    console.error(event.target.error.stack)
  })
  .on('cycle', function (event: Object) {
    console.log(String(event.target))
  })
  .run({ async: true })
