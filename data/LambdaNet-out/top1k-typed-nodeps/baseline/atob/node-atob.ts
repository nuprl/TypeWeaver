"use strict";

function atob(str: string): string {
  return Buffer.from(str, 'base64').toString('binary');
}

module.exports = atob.atob = atob;
