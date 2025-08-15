import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];
    if (!authHeader) return false;
    const token = authHeader.replace('Bearer ', '');
    try {
      // For demo: decode base64 token
      const payload = JSON.parse(Buffer.from(token, 'base64').toString());
      const user = await this.userRepository.findOne({ where: { id: payload.userId } });
      if (!user) return false;
      req.user = user;
      return true;
    } catch {
      return false;
    }
  }
}
