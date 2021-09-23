import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { FindManyUserArgs } from 'src/@generated/user/find-many-user.args';
import { UserUpdateInput } from 'src/@generated/user/user-update.input';
import { UserWhereUniqueInput } from 'src/@generated/user/user-where-unique.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserRoleInput } from './dto/update-user-role.input';
import { UpdateUserStatusInput } from './dto/update-user-status.input';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async get({ where, orderBy, distinct, skip, take }: FindManyUserArgs): Promise<User[]> {
    return this.prisma.user.findMany({
      where,
      orderBy,
      skip,
      take,
      distinct,
      include: {
        detail: true,
      },
    });
  }

  async update(input: UserUpdateInput, where: UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.update({
      data: {
        role: input.role,
      },
      where,
    });
  }

  async delete(where: UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where });
  }

  async updateRole(input: UpdateUserRoleInput, where: UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.update({
      data: {
        role: input.role,
      },
      where,
    });
  }

  async updateStatus(input: UpdateUserStatusInput, where: UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.update({
      data: {
        status: input.status,
      },
      where,
    });
  }
}
