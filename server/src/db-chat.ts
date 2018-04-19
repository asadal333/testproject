import * as fs from 'fs';
import * as util from 'util';

type DB = Message[];

export interface Message {
  id: number;
  userId: number;
  msg: string;
}

const readFile = util.promisify(fs.readFile);
const db$: Promise<DB> = readFile('./data/chat.json', 'utf8')
  .then(JSON.parse, console.error);

export async function getMsgs(): Promise<Message[]> {
  const msgs = await db$;
  return msgs;
}

export async function addMessage(msgId: number, userId: number, msg: string): Promise<any> {
  const msgs = await db$;
  msgs.push({id: msgId, userId: userId, msg: msg});
}
