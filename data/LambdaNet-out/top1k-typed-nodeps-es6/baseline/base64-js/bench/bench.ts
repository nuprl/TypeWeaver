import base64 from '../';
import benchmark from 'benchmark';

const suite: HTMLElement = new benchmark.Suite()
import { randomBytes as random } from 'crypto';
const data: string = random(1e6).toString('base64')
const raw: string = base64.toByteArray(data)

suite
  .add('base64.toByteArray() (decode)', function () {
    const raw2: string = base64.toByteArray(data) // eslint-disable-line no-unused-vars
  })
  .add('base64.fromByteArray() (encode)', function () {
    const data2: object = base64.fromByteArray(raw) // eslint-disable-line no-unused-vars
  })
  .add('base64.byteLength() (encode)', function () {
    const len: string = base64.byteLength(data) // eslint-disable-line no-unused-vars
  })
  .on('error', function (event: TypedPropertyDescriptor) {
    console.error(event.target.error.stack)
  })
  .on('cycle', function (event: object) {
    console.log(String(event.target))
  })
  .run({ async: true })
