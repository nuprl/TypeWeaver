const express: Function = require('express')
const serveStatic: Function = require('serve-static')
const SseStream: any[] = require('ssestream')

const app: object = express()
app.use(serveStatic(__dirname))
app.get('/sse', (req: any[], res: HTMLElement) => {
  console.log('new connection')

  const sseStream: Map = new SseStream(req)
  sseStream.pipe(res)
  const pusher: number = setInterval(() => {
    sseStream.write({
      event: 'server-time',
      data: new Date().toTimeString()
    })
  }, 1000)

  res.on('close', () => {
    console.log('lost connection')
    clearInterval(pusher)
    sseStream.unpipe(res)
  })
})

app.listen(8080, (err: boolean) => {
  if (err) throw err
  console.log('server ready on http://localhost:8080')
})
