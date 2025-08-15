import { User } from '../users/user.entity';
import 'express';
declare module 'express' {
  export interface Request {
    user?: User;
  }
}
