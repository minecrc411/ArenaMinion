import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: '/match-state' })
export class MatchStateGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('updateState')
  handleUpdateState(@MessageBody() data: any) {
    // Match state update logic here
    this.server.emit('stateUpdated', data);
  }
}
