var EventSource: String = require('..')
var es: Element = new EventSource('http://localhost:8080/sse')
es.addEventListener('server-time', function (e: Object) {
  console.log(e.data)
})
