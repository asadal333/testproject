import * as http from 'http';
import * as ws from 'ws';
import { updateProductBidAmount} from './db-auction';

interface BidMessage {
  productId: number;
  price: number;
  msg: string;
}

export function createBidServer(httpServer: http.Server): BidServer {
  return new BidServer(httpServer);
}

export class BidServer {
  //private readonly wsServer: ws.Server;
  public webSockets = {};
  public wsServer: ws.Server;
  private userID=1;
  // webSocketServer.on('connection', function (webSocket) {
  //   var userID = parseInt(webSocket.upgradeReq.url.substr(1), 10)
  //   webSockets[userID] = webSocket
  //   console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(webSockets))
  // });

  constructor(server: http.Server) {
    //this.wsServer = new ws.Server({ server });
    this.wsServer = new ws.Server( {server: server, path: "/ws1"} );
    //this.wsServer = new ws.Server({ noServer: true });
    this.wsServer.on('connection', (userSocket: ws) => this.onConnection(userSocket));
    
  }
//https://stackoverflow.com/questions/16280747/sending-message-to-a-specific-connected-users-using-websocket
  private onConnection2(ws: ws): void {
    let userID2=parseInt(ws.url.substr(1), 10);
    
    this.webSockets[this.userID] = ws;
    // Subscribe to WebSocket events.
    // Forward Message
    //
    // Receive               Example
    // [toUserID, text]      [2, "Hello, World!"]
    //
    // Send                  Example
    // [fromUserID, text]    [1, "Hello, World!"]
    ws.on('message', (message: string) => {
      console.log('received from ' + this.userID + ': ' + message)
      let messageArray = JSON.parse(message)
      let toUserWebSocket = this.webSockets[this.userID];//messageArray[0]]
      if (toUserWebSocket) {
        // console.log('sent to ' + messageArray[0] + ': ' + JSON.stringify(messageArray))
        // messageArray[0] = userID
        // toUserWebSocket.send(JSON.stringify(messageArray))
        this.onMessage(message);
      }
    });
    ws.on('error', (error: Error) => this.onError(error));
    ws.on('close', () => {
      delete this.webSockets[this.userID];
      console.log('deleted: ' + this.userID);
    });

    console.log(`Connections count: ${this.wsServer.clients.size}`);
  }

  private onConnection(ws: ws): void {
    // Subscribe to WebSocket events.
    ws.on('message', (message: string) => this.onMessage(message));
    ws.on('error', (error: Error) => this.onError(error));
    ws.on('close', () => this.onClose());

    console.log(`Connections count: ${this.wsServer.clients.size}`);
  }

  private onMessage(message: string): void {
    const bid: BidMessage = JSON.parse(message);
    updateProductBidAmount(bid.productId, bid.price, bid.msg);

    // Broadcast the new bid amount
    this.wsServer.clients.forEach(ws => ws.send(JSON.stringify(bid)));
    // this.wsServer.clients.forEach(
    //   function each(client) {
    //     if (client.readyState === ws.OPEN) {
    //       ws => ws.send(JSON.stringify(bid))
    //     }
    //   }
    // );
    console.log(`Bid ${bid.price} is placed on product ${bid.productId}`);
  }

  private onClose(): void {
    console.log(`Connections count: ${this.wsServer.clients.size}`);
  }

  private onError(error: Error): void {
    console.error(`WebSocket error: "${error.message}"`);
  }
}
