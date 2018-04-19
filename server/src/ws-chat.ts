import * as http from 'http';
import * as ws from 'ws';
import { addMessage } from './db-chat';

interface ChatMessage {
  msgId: number;
  userId: number;
  msg: string;
}

export function createChatServer(httpServer: http.Server): ChatServer {
  return new ChatServer(httpServer);
}

export class ChatServer {
  //private readonly wsServer: ws.Server;
  public wsServer: ws.Server;

  constructor(server: http.Server) {
    //this.wsServer = new ws.Server({ server });
    this.wsServer = new ws.Server( {server: server, path: "/chat"} );
    //this.wsServer = new ws.Server({ noServer: true });
    this.wsServer.on('connection', (userSocket: ws) => this.onConnection(userSocket));
    
  }

  private onConnection(ws: ws): void {
    // Subscribe to WebSocket events.
    ws.on('message', (message: string) => this.onMessage(message));
    ws.on('error', (error: Error) => this.onError(error));
    ws.on('close', () => this.onClose());

    console.log(`Connections count: ${this.wsServer.clients.size}`);
  }

  private onMessage(message: string): void {
    const chat: ChatMessage = JSON.parse(message);
    addMessage(chat.msgId, chat.userId, chat.msg);

    // Broadcast the new bid amount
    this.wsServer.clients.forEach(ws => ws.send(JSON.stringify(chat)));
    console.log(`chat msg id ${chat.msgId} with user id ${chat.userId} with msg = ${chat.msg}`);
  }

  private onClose(): void {
    console.log(`Connections count: ${this.wsServer.clients.size}`);
  }

  private onError(error: Error): void {
    console.error(`WebSocket error: "${error.message}"`);
  }
}
