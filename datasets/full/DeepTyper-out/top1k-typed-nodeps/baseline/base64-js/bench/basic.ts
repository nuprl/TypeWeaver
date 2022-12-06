const random: any = require('crypto').randomBytes

const b64: any = require('../')
let data: string = random(1e6).toString('base64')
const start: number = Date.now()
const raw: string = b64.toByteArray(data)
const middle1: number = Date.now()
data = b64.fromByteArray(raw)
const middle2: number = Date.now()
const len: number = b64.byteLength(data)
const end: number = Date.now()

console.log(
  'decode ms, decode ops/ms, encode ms, encode ops/ms, length ms, length ops/ms'
)
console.log(
  middle1 - start,
  data.length / (middle1 - start),
  middle2 - middle1,
  data.length / (middle2 - middle1),
  end - middle2,
  len / (end - middle2)
)
