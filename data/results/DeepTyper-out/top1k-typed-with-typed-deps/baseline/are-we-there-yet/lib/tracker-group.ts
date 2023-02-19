'use strict'
var util: any = require('util')
var TrackerBase: any = require('./tracker-base.js')
var Tracker: any = require('./tracker.js')
var TrackerStream: any = require('./tracker-stream.js')

var TrackerGroup: any = module.exports = function (name: any) {
  TrackerBase.call(this, name)
  this.parentGroup = null
  this.trackers = []
  this.completion = {}
  this.weight = {}
  this.totalWeight = 0
  this.finished = false
  this.bubbleChange = bubbleChange(this)
}
util.inherits(TrackerGroup, TrackerBase)

function bubbleChange (trackerGroup: any): void {
  return function (name: any, completed: any, tracker: any) {
    trackerGroup.completion[tracker.id] = completed
    if (trackerGroup.finished) {
      return
    }
    trackerGroup.emit('change', name || trackerGroup.name, trackerGroup.completed(), trackerGroup)
  }
}

TrackerGroup.prototype.nameInTree = function () {
  var names: any[] = []
  var from = this
  while (from) {
    names.unshift(from.name)
    from = from.parentGroup
  }
  return names.join('/')
}

TrackerGroup.prototype.addUnit = function (unit: any, weight: any) {
  if (unit.addUnit) {
    var toTest: any = this
    while (toTest) {
      if (unit === toTest) {
        throw new Error(
          'Attempted to add tracker group ' +
          unit.name + ' to tree that already includes it ' +
          this.nameInTree(this))
      }
      toTest = toTest.parentGroup
    }
    unit.parentGroup = this
  }
  this.weight[unit.id] = weight || 1
  this.totalWeight += this.weight[unit.id]
  this.trackers.push(unit)
  this.completion[unit.id] = unit.completed()
  unit.on('change', this.bubbleChange)
  if (!this.finished) {
    this.emit('change', unit.name, this.completion[unit.id], unit)
  }
  return unit
}

TrackerGroup.prototype.completed = function () {
  if (this.trackers.length === 0) {
    return 0
  }
  var valPerWeight: number = 1 / this.totalWeight
  var completed: number = 0
  for (var ii = 0; ii < this.trackers.length; ii++) {
    var trackerId: number = this.trackers[ii].id
    completed +=
      valPerWeight * this.weight[trackerId] * this.completion[trackerId]
  }
  return completed
}

TrackerGroup.prototype.newGroup = function (name: any, weight: any) {
  return this.addUnit(new TrackerGroup(name), weight)
}

TrackerGroup.prototype.newItem = function (name: any, todo: Todo, weight: any) {
  return this.addUnit(new Tracker(name, todo), weight)
}

TrackerGroup.prototype.newStream = function (name: any, todo: Todo, weight: any) {
  return this.addUnit(new TrackerStream(name, todo), weight)
}

TrackerGroup.prototype.finish = function () {
  this.finished = true
  if (!this.trackers.length) {
    this.addUnit(new Tracker(), 1, true)
  }
  for (var ii = 0; ii < this.trackers.length; ii++) {
    var tracker: any = this.trackers[ii]
    tracker.finish()
    tracker.removeListener('change', this.bubbleChange)
  }
  this.emit('change', this.name, 1, this)
}

var buffer: string = '                                  '
TrackerGroup.prototype.debug = function (depth: number) {
  depth = depth || 0
  var indent: string = depth ? buffer.slice(0, depth) : ''
  var output: string = indent + (this.name || 'top') + ': ' + this.completed() + '\n'
  this.trackers.forEach(function (tracker: any) {
    if (tracker instanceof TrackerGroup) {
      output += tracker.debug(depth + 1)
    } else {
      output += indent + ' ' + tracker.name + ': ' + tracker.completed() + '\n'
    }
  })
  return output
}
