var createECDH: Function = require('crypto').createECDH

module.exports = createECDH || require('./browser')
