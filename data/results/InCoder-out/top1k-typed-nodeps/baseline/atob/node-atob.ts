"use strict";

function atob(str: any) {
  return Buffer.from(str, 'base64').toString('binary');
}

module.exports = atob.atob = atob;