import * as path from 'path';
import * as express from 'express';
import { createServer } from 'http';
import * as url from 'url';
import { createBidServer } from './ws-auction';
import { createChatServer } from './ws-chat';
import { router } from './rest-api';

const app = express();
app.use('/api', router);
app.use('/data', express.static(path.join(__dirname, '..', 'data')));

const server = createServer(app);
let wss1 = createBidServer(server);
//console.log(wss1.wsServer);
//let wss2 = createChatServer(server);



server.listen(9090, "localhost", () => {
  const {address, port} = server.address();
  console.log('Listening on %s %s', address, port);
});
