import { Provider } from '@angular/core';
import { BidService } from './bid.service';
import { ProductService, HttpProductService } from './product.service';
import { WorldService, HttpWorldService } from './world.service';
import { WebSocketService } from './websocket.service';

export { BidMessage, BidService } from './bid.service';
export { Product, ProductSearchParams, ProductService } from './product.service';
export { World, WorldSearchParams, WorldService } from './world.service';
export { WebSocketService } from './websocket.service';

export const SHARED_SERVICES: Provider[] = [
  { provide: BidService, useClass: BidService },
  { provide: ProductService, useClass: HttpProductService },
  { provide: WorldService, useClass: HttpWorldService },
  { provide: WebSocketService, useClass: WebSocketService }
];
