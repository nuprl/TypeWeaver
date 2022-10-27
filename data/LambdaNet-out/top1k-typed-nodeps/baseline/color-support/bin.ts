#!/usr/bin/env node
var colorSupport: Array = require('./')({alwaysReturn: true })
console.log(JSON.stringify(colorSupport, null, 2))
