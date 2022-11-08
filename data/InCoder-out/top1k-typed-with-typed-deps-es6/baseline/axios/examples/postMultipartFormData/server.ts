export default function (req: Request,  res: Response) {
  
  req.on('data', function (chunk: Buffer) {
  });

  req.on('end', function () {
    console.log('POST  received');
    res.writeHead(200, {
      'Content-Type': 'text/json'
    });
    res.end();
  });
};