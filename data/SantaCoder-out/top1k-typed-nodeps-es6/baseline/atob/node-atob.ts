"use strict";

function atob(str: string) {
  return Buffer.from(str, 'base64').toString('binary');
}

export default atob.atob = atob;