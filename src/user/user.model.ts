import { Prisma, Profile as PrismaProfile, Role, Status, User as PrismaUser } from '.prisma/client';
import { Field, HideField, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';

registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
});

registerEnumType(Status, {
  name: 'Status',
  description: 'User status',
});

@ObjectType()
export class User implements PrismaUser {
  id: string;
  @HideField()
  password: string;
  email: string;
  emailConfirmed: boolean;
  twoFactorEnabled: boolean;
  @Field(() => Date)
  createdAt: Date;
  @Field(() => Date)
  updatedAt: Date;
  @Field(() => Status)
  status: Status;
  @Field(() => Role)
  role: Role;
}

@InputType()
export class UserCreateInput implements Prisma.UserCreateInput {
  id?: string;
  password: string;
  email: string;
  emailConfirmed?: boolean;
  twoFactorEnabled?: boolean;
  @Field(() => Date)
  createdAt?: string | Date;
  @Field(() => Date)
  updatedAt?: string | Date;
  @Field(() => Status)
  status?: Status;
  @Field(() => Role)
  role?: Role;
}

// @InputType()
// export class UserUpdateInput implements Prisma.UserUpdateInput {
//   id?: string;
//   password: string;
//   email: string;
//   emailConfirmed?: boolean;
//   twoFactorEnabled?: boolean;
//   createdAt?: string | Date;
//   updatedAt?: string | Date;
//   status?: Status;
//   role?: Role;
//   profile?: Prisma.ProfileCreateNestedOneWithoutUserInput;
// }

@ObjectType()
export class Profile extends BaseModel<number> implements PrismaProfile {
  name: string;
  bio: string;
  avatarUrl: string;
  userId: string;
}

export type ProfileCreateInput = Prisma.ProfileCreateInput;
export type ProfileUpdateInput = Prisma.ProfileUpdateInput;
