import { Prisma, User as PrismaUser } from '.prisma/client';

export type User = PrismaUser;
export type UserCreateInput = Prisma.UserCreateInput;
export type UserUpdateInput = Prisma.UserUpdateInput;
