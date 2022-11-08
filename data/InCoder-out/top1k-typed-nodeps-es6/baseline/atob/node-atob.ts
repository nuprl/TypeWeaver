"use strict";

function atob(str: string | ArrayBuffer) {
  return Buffer.from(str, 'base64').toString('binary');
}

export default atob.atob = atob;