import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { User, UserCreateInput } from './user.types';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async createUser(input: UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data: input,
    });
  }
}
