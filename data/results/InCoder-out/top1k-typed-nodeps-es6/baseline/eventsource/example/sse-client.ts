import EventSource from '..';
var es = new EventSource('http://localhost:8080/sse')
es.addEventListener('server-time', function (e: any) {
  console.log(e.data)
})