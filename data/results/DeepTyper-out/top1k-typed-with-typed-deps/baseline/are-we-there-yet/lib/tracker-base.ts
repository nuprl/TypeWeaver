'use strict'
var EventEmitter: any = require('events').EventEmitter
var util: any = require('util')

var trackerId: number = 0
var TrackerBase: any = module.exports = function (name: any) {
  EventEmitter.call(this)
  this.id = ++trackerId
  this.name = name
}
util.inherits(TrackerBase, EventEmitter)
