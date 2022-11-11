"use strict";

function atob(str: any) {
  return Buffer.from(str, 'base64').toString('binary');
}

export default atob.atob = atob;