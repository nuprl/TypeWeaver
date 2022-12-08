import base64 from '../';
import benchmark from 'benchmark';

const suite: any = new benchmark.Suite()
import { randomBytes as random } from 'crypto';
const data: any = random(1e6).toString('base64')
const raw: string = base64.toByteArray(data)

suite
  .add('base64.toByteArray() (decode)', function () {
    const raw2: any = base64.toByteArray(data) // eslint-disable-line no-unused-vars
  })
  .add('base64.fromByteArray() (encode)', function () {
    const data2: any = base64.fromByteArray(raw) // eslint-disable-line no-unused-vars
  })
  .add('base64.byteLength() (encode)', function () {
    const len: number = base64.byteLength(data) // eslint-disable-line no-unused-vars
  })
  .on('error', function (event: any) {
    console.error(event.target.error.stack)
  })
  .on('cycle', function (event: any) {
    console.log(String(event.target))
  })
  .run({ async: true })
