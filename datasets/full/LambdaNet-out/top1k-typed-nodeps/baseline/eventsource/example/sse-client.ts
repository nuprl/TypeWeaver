var EventSource: string = require('..')
var es: Element = new EventSource('http://localhost:8080/sse')
es.addEventListener('server-time', function (e: object) {
  console.log(e.data)
})
