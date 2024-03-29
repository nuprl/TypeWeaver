'use strict';

// Helper
function reverse(map: any): any[] {
  const res: {} = {};

  Object.keys(map).forEach(function(key: string) {
    // Convert key to integer if it is stringified
    if ((key | 0) == key)
      key = key | 0;

    const value: any = map[key];
    res[value] = key;
  });

  return res;
}

export const tagClass: any = {
  0: 'universal',
  1: 'application',
  2: 'context',
  3: 'private'
};

export const tagClassByName: any[] = reverse(exports.tagClass);

export const tag: any = {
  0x00: 'end',
  0x01: 'bool',
  0x02: 'int',
  0x03: 'bitstr',
  0x04: 'octstr',
  0x05: 'null_',
  0x06: 'objid',
  0x07: 'objDesc',
  0x08: 'external',
  0x09: 'real',
  0x0a: 'enum',
  0x0b: 'embed',
  0x0c: 'utf8str',
  0x0d: 'relativeOid',
  0x10: 'seq',
  0x11: 'set',
  0x12: 'numstr',
  0x13: 'printstr',
  0x14: 't61str',
  0x15: 'videostr',
  0x16: 'ia5str',
  0x17: 'utctime',
  0x18: 'gentime',
  0x19: 'graphstr',
  0x1a: 'iso646str',
  0x1b: 'genstr',
  0x1c: 'unistr',
  0x1d: 'charstr',
  0x1e: 'bmpstr'
};

export const tagByName: any[] = reverse(exports.tag);
