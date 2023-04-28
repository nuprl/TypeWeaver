export default function (req: IncomingMessage, res: ServerResponse) {
  
  req.on('data', function (chunk: any) {
  });

  req.on('end', function () {
    console.log('POST  received');
    res.writeHead(200, {
      'Content-Type': 'text/json'
    });
    res.end();
  });
};