import { GetUserDto } from 'src/modules/users/dto';
import { Token } from './token.interface';

export interface LoginResult {
  user: GetUserDto;
  token: Token;
}
