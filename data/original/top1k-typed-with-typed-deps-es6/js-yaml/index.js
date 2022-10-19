'use strict';


import loader from './lib/loader';
import dumper from './lib/dumper';


function renamed(from, to) {
  return function () {
    throw new Error('Function yaml.' + from + ' is removed in js-yaml 4. ' +
      'Use yaml.' + to + ' instead, which is now safe by default.');
  };
}


export const Type = require('./lib/type');
export const Schema = require('./lib/schema');
export const FAILSAFE_SCHEMA = require('./lib/schema/failsafe');
export const JSON_SCHEMA = require('./lib/schema/json');
export const CORE_SCHEMA = require('./lib/schema/core');
export const DEFAULT_SCHEMA = require('./lib/schema/default');
export const load = loader.load;
export const loadAll = loader.loadAll;
export const dump = dumper.dump;
export const YAMLException = require('./lib/exception');

// Re-export all types in case user wants to create custom schema
export const types = {
  binary:    require('./lib/type/binary'),
  float:     require('./lib/type/float'),
  map:       require('./lib/type/map'),
  null:      require('./lib/type/null'),
  pairs:     require('./lib/type/pairs'),
  set:       require('./lib/type/set'),
  timestamp: require('./lib/type/timestamp'),
  bool:      require('./lib/type/bool'),
  int:       require('./lib/type/int'),
  merge:     require('./lib/type/merge'),
  omap:      require('./lib/type/omap'),
  seq:       require('./lib/type/seq'),
  str:       require('./lib/type/str')
};

// Removed functions from JS-YAML 3.0.x
export const safeLoad = renamed('safeLoad', 'load');

export const safeLoadAll = renamed('safeLoadAll', 'loadAll');
export const safeDump = renamed('safeDump', 'dump');
