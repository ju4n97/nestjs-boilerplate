import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

export class UserRepository extends Repository<UserEntity> {}
