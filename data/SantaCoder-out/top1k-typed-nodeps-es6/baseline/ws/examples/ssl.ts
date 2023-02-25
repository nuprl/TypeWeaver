'use strict';

import https from 'https';
import fs from 'fs';
import { WebSocket, WebSocketServer } from '..';

const server = https.createServer({
  cert: fs.readFileSync('../test/fixtures/certificate.pem'),
  key: fs.readFileSync('../test/fixtures/key.pem')
});

const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws: WebSocket) {
  ws.on('message', function message(msg: string) {
    console.log(msg.toString());
  });
});

server.listen(function listening() {
  //
  // If the `rejectUnauthorized` option is not `false`, the server certificate
  // is verified against a list of well-known CAs. An 'error' event is emitted
  // if verification fails.
  //
  // The certificate used in this example is self-signed so `rejectUnauthorized`
  // is set to `false`.
  //
  const ws = new WebSocket(`wss://localhost:${server.address().port}`, {
    rejectUnauthorized: false
  });

  ws.on('open', function open() {
    ws.send('All glory to WebSockets!');
  });
});