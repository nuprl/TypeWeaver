"use strict";

function atob(str: String): String {
  return Buffer.from(str, 'base64').toString('binary');
}

export default atob.atob = atob;
