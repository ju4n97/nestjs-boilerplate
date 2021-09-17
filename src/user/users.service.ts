import { User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { FindManyUserArgs } from 'src/@generated/models/user/find-many-user.args';
import { UserCreateInput } from 'src/@generated/models/user/user-create.input';
import { UserUpdateInput } from 'src/@generated/models/user/user-update.input';
import { UserWhereUniqueInput } from 'src/@generated/models/user/user-where-unique.input';
import { PrismaService } from 'src/common/services/prisma.service';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers({ where, orderBy, distinct, skip, take }: FindManyUserArgs): Promise<User[]> {
    return this.prisma.user.findMany({
      where,
      orderBy,
      skip,
      take,
      distinct,
      include: { profile: true },
    });
  }

  async createUser(input: UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data: input,
    });
  }

  async updateUser(input: UserUpdateInput, where: UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.update({
      data: input,
      where,
    });
  }

  async deleteUser(where: UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where });
  }
}
