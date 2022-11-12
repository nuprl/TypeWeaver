#!/usr/bin/env node
'use strict';

import atob from '../node-atob';
var str: String = process.argv[2];
console.log(atob(str));
