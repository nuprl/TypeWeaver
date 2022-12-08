#!/usr/bin/env node
'use strict';

var atob: string = require('../node-atob');
var str: any = process.argv[2];
console.log(atob(str));
