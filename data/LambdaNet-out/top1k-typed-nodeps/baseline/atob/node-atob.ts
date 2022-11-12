"use strict";

function atob(str: String): String {
  return Buffer.from(str, 'base64').toString('binary');
}

module.exports = atob.atob = atob;
