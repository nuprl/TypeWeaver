'use strict'
import { EventEmitter } from 'events';
import util from 'util';

var trackerId: number = 0
var TrackerBase: void = function (name: any) {
  EventEmitter.call(this)
  this.id = ++trackerId
  this.name = name
}
export default TrackerBase;
util.inherits(TrackerBase, EventEmitter)
