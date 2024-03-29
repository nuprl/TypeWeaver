var util: any = require('util')
var messages: any = require('./warning_messages.json')

module.exports = function () {
  var args: any = Array.prototype.slice.call(arguments, 0)
  var warningName: string = args.shift()
  if (warningName === 'typo') {
    return makeTypoWarning.apply(null, args)
  } else {
    var msgTemplate: string = messages[warningName] ? messages[warningName] : warningName + ": '%s'"
    args.unshift(msgTemplate)
    return util.format.apply(null, args)
  }
}

function makeTypoWarning (providedName: string, probableName: string, field: string): string {
  if (field) {
    providedName = field + "['" + providedName + "']"
    probableName = field + "['" + probableName + "']"
  }
  return util.format(messages.typo, providedName, probableName)
}
