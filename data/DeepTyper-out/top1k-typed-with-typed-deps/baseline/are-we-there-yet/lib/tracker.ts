'use strict'
var util: any = require('util')
var TrackerBase: any = require('./tracker-base.js')

var Tracker: any = module.exports = function (name: any, todo: any) {
  TrackerBase.call(this, name)
  this.workDone = 0
  this.workTodo = todo || 0
}
util.inherits(Tracker, TrackerBase)

Tracker.prototype.completed = function () {
  return this.workTodo === 0 ? 0 : this.workDone / this.workTodo
}

Tracker.prototype.addWork = function (work: void) {
  this.workTodo += work
  this.emit('change', this.name, this.completed(), this)
}

Tracker.prototype.completeWork = function (work: void) {
  this.workDone += work
  if (this.workDone > this.workTodo) {
    this.workDone = this.workTodo
  }
  this.emit('change', this.name, this.completed(), this)
}

Tracker.prototype.finish = function () {
  this.workTodo = this.workDone = 1
  this.emit('change', this.name, 1, this)
}
