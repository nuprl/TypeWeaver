'use strict'
var util = require('util')
var stream = require('readable-stream')
var delegate = require('delegates')
var Tracker = require('./tracker.js')

var TrackerStream = module.exports = function (name: string, size: number, options: stream.TransformOptions) {
  stream.Transform.call(this, options)
  this.tracker = new Tracker(name, size)
  this.name = name
  this.id = this.tracker.id
  this.tracker.on('change', delegateChange(this))
}
util.inherits(TrackerStream, stream.Transform)

function delegateChange (trackerStream: TrackerStream) {
  return function (name: string, completion: number, tracker: Tracker) {
    trackerStream.emit('change', name, completion, trackerStream)
  }
}

TrackerStream.prototype._transform = function (data: Buffer, encoding: string, cb: Function) {
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