#!/usr/bin/env node
'use strict';

import atob from '../node-atob';
var str: any = process.argv[2];
console.log(atob(str));
