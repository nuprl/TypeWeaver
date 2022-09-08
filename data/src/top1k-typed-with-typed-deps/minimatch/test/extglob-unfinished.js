var t = require('tap')
var mm = require('../')

var types = '!?+*@'.split('')

t.plan(types.length)
types.forEach(function (type) {
  t.test(type, function (t) {
    t.plan(2)
    t.ok(mm(type + '(a|B', type + '(a|B', { nonegate: true }))
    t.notOk(mm(type + '(a|B', 'B', { nonegate: true }))
  })
})
