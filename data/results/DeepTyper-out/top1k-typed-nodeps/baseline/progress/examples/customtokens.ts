var ProgressBar: any = require('../')

// Demonstrates the use of custom tokens

var list: string[] = [
  'image01.jpg', 'image02.jpg', 'image03.jpg', 'image04.jpg', 'image05.jpg',
  'image06.jpg', 'image07.jpg', 'image08.jpg', 'image09.jpg', 'image10.jpg'
]

var bar: any = new ProgressBar(':percent eta: :eta downloading :current/:total :file', {
  total: list.length
})

var id: number = setInterval(function (){
  bar.tick({
    'file': list[bar.curr]
  })
  if (bar.complete) {
    clearInterval(id)
  }
}, 500)
