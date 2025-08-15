import { Controller, Get, Post, Req, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req): Promise<User> {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('rename')
  async rename(@Req() req, @Body('display_name') display_name: string): Promise<User> {
    req.user.display_name = display_name;
    await this.userRepository.save(req.user);
    return req.user;
  }
}
