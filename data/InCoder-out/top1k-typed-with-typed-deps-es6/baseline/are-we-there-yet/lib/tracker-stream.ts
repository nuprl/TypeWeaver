'use strict'
import util from 'util';
import stream from 'readable-stream';
import delegate from 'delegates';
import Tracker from './tracker.js';

var TrackerStream = function (name: String,  size: Number,  options: Object) {
  stream.Transform.call(this, options)
  this.tracker = new Tracker(name, size)
  this.name = name
  this.id = this.tracker.id
  this.tracker.on('change', delegateChange(this))
}
export default TrackerStream;
util.inherits(TrackerStream, stream.Transform)

function delegateChange (trackerStream: Stream) {
  return function (name: String,  completion: Function,  tracker: Tracker) {
    trackerStream.emit('change', name, completion, trackerStream)
  }
}

TrackerStream.prototype._transform = function (data: any,  encoding: any,  cb: Function) {
  this.tracker.completeWork(data.length ? data.length : 1)
  this.push(data)
  cb()
}

TrackerStream.prototype._flush = function (cb: Function) {
  this.tracker.finish()
  cb()
}

delegate(TrackerStream.prototype, 'tracker')
  .method('completed')
  .method('addWork')
  .method('finish')