'use strict'
import { EventEmitter } from 'events';
import util from 'util';

var trackerId = 0
var TrackerBase = function (name: any) {
  EventEmitter.call(this)
  this.id = ++trackerId
  this.name = name
}
export default TrackerBase;
util.inherits(TrackerBase, EventEmitter)