import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: '/matchmaking' })
export class MatchmakingGateway {
  @WebSocketServer()
  server: Server;

  private queue: any[] = [];

  @SubscribeMessage('findMatch')
  handleFindMatch(@MessageBody() data: any) {
    this.queue.push(data);

    if (this.queue.length >= 2) { // Example: match 2 players
      const players = this.queue.splice(0, 2);
      const matchId = Date.now().toString();
      players.forEach(player =>
        this.server.emit('matchFound', { matchId, player })
      );
    }
  }
}
