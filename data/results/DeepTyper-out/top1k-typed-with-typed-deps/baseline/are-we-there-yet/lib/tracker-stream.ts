'use strict'
var util: any = require('util')
var stream: any = require('readable-stream')
var delegate: any = require('delegates')
var Tracker: any = require('./tracker.js')

var TrackerStream: any = module.exports = function (name: any, size: number, options: any) {
  stream.Transform.call(this, options)
  this.tracker = new Tracker(name, size)
  this.name = name
  this.id = this.tracker.id
  this.tracker.on('change', delegateChange(this))
}
util.inherits(TrackerStream, stream.Transform)

function delegateChange (trackerStream: any): void {
  return function (name: any, completion: any, tracker: any) {
    trackerStream.emit('change', name, completion, trackerStream)
  }
}

TrackerStream.prototype._transform = function (data: any, encoding: string, cb: any) {
  this.tracker.completeWork(data.length ? data.length : 1)
  this.push(data)
  cb()
}

TrackerStream.prototype._flush = function (cb: any) {
  this.tracker.finish()
  cb()
}

delegate(TrackerStream.prototype, 'tracker')
  .method('completed')
  .method('addWork')
  .method('finish')
