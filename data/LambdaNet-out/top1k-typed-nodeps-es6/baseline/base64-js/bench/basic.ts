import { randomBytes as random } from 'crypto';
import b64 from '../';
let data: String = random(1e6).toString('base64')
const start: Number = Date.now()
const raw: String = b64.toByteArray(data)
const middle1: Number = Date.now()
data = b64.fromByteArray(raw)
const middle2: Number = Date.now()
const len: Number = b64.byteLength(data)
const end: Number = Date.now()

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
