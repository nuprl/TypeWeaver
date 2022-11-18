var INTERPOLATE: RegExp = /{([^{]+?)}/g

module.exports = function(str: string, data: object) {
  var tmpl: string = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' +
    'with(obj||{}){__p.push(\'' +
    str.replace(/\\/g, '\\\\')
       .replace(/'/g, "\\'")
       .replace(INTERPOLATE, function(match: Function, code: string) {
         return "'," + code.replace(/\\'/g, "'") + ",'"
       })
       .replace(/\r/g, '\\r')
       .replace(/\n/g, '\\n')
       .replace(/\t/g, '\\t')
       + "');}return __p.join('');"
  var func: Function = new Function('obj', tmpl)
  return data ? func(data) : func
}
