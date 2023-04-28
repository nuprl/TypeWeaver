export default function (req: IncomingMessage, res: ServerResponse) {
  let data = '';
  
  req.on('data', function (chunk: any) {
    data += chunk;
  });

  req.on('end', function () {
    console.log('POST data received');
    res.writeHead(200, {
      'Content-Type': 'text/json'
    });
    res.write(JSON.stringify(data));
    res.end();
  });
};