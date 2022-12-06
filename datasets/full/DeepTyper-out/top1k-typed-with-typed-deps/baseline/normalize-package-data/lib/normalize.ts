module.exports = normalize

var fixer: any = require('./fixer')
normalize.fixer = fixer

var makeWarning: any = require('./make_warning')

var fieldsToFix: string[] = ['name', 'version', 'description', 'repository', 'modules', 'scripts',
  'files', 'bin', 'man', 'bugs', 'keywords', 'readme', 'homepage', 'license']
var otherThingsToFix: string[] = ['dependencies', 'people', 'typos']

var thingsToFix: string[] = fieldsToFix.map(function (fieldName: string) {
  return ucFirst(fieldName) + 'Field'
})
// two ways to do this in CoffeeScript on only one line, sub-70 chars:
// thingsToFix = fieldsToFix.map (name) -> ucFirst(name) + "Field"
// thingsToFix = (ucFirst(name) + "Field" for name in fieldsToFix)
thingsToFix = thingsToFix.concat(otherThingsToFix)

function normalize (data: any, warn: any, strict: boolean): void {
  if (warn === true) {
    warn = null
    strict = true
  }
  if (!strict) {
    strict = false
  }
  if (!warn || data.private) {
    warn = function (msg: any) { /* noop */ }
  }

  if (data.scripts &&
      data.scripts.install === 'node-gyp rebuild' &&
      !data.scripts.preinstall) {
    data.gypfile = true
  }
  fixer.warn = function () {
    warn(makeWarning.apply(null, arguments))
  }
  thingsToFix.forEach(function (thingName: any) {
    fixer['fix' + ucFirst(thingName)](data, strict)
  })
  data._id = data.name + '@' + data.version
}

function ucFirst (string): string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
