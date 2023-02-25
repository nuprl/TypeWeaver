export default function (req: Request, res: Response) {
  let data = '';
  
  req.on('data', function (chunk: string) {
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