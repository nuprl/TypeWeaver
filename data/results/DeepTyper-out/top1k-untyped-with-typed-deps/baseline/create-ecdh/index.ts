var createECDH: any = require('crypto').createECDH

module.exports = createECDH || require('./browser')
