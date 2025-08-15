import { Module } from '@nestjs/common';
import { MatchmakingGateway } from './matchmaking.gateway';
import { MatchStateGateway } from './match-state.gateway';

@Module({
  providers: [MatchmakingGateway, MatchStateGateway],
})
export class GatewayModule {}
