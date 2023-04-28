export default function (req: IncomingMessage, res: ServerResponse) {
  let data = '';

  req.on('data', function (chunk: Buffer) {
    data += chunk;
  });

  req.on('end', function () {
    console.log('File uploaded');
    res.writeHead(200);
    res.end();
  });
};