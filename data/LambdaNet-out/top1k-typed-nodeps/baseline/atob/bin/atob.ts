#!/usr/bin/env node
'use strict';

var atob: Function = require('../node-atob');
var str: string = process.argv[2];
console.log(atob(str));
