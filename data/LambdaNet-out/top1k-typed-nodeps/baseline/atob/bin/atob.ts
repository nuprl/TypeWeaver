#!/usr/bin/env node
'use strict';

var atob: Function = require('../node-atob');
var str: String = process.argv[2];
console.log(atob(str));
