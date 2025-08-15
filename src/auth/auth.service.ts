import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import * as crypto from 'crypto';

interface RegisterDto {
  email: string;
  password: string;
  display_name: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(dto: RegisterDto): Promise<User> {
    const password_hash = crypto.createHash('sha256').update(dto.password).digest('hex');
    const user: User = this.userRepository.create({
      id: crypto.randomUUID(),
      email: dto.email,
      password_hash,
      display_name: dto.display_name,
      gold: 0,
      created_at: new Date(),
    });
    await this.userRepository.save(user);
    return user;
  }

  async login(dto: { email: string; password: string }): Promise<{ accessToken: string; user: User } | { error: string }> {
    const user = await this.userRepository.findOne({ where: { email: dto.email } });
    if (!user) return { error: 'Invalid credentials' };
    const password_hash = crypto.createHash('sha256').update(dto.password).digest('hex');
    if (user.password_hash !== password_hash) return { error: 'Invalid credentials' };
    // Generate a simple JWT (for demo purposes)
    const payload = { userId: user.id, email: user.email, display_name: user.display_name };
    const accessToken = Buffer.from(JSON.stringify(payload)).toString('base64');
    return { accessToken, user };
  }
}
