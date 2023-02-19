export default function (req: any,  res: any) {
  let data = '';
  
  req.on('data', function (chunk: Buffer) {
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