import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaSelect } from '@paljs/plugins';
import { GraphQLResolveInfo } from 'graphql';
import { Role } from 'src/@generated/prisma/role.enum';
import { FindManyUserArgs } from 'src/@generated/user/find-many-user.args';
import { UserUpdateInput } from 'src/@generated/user/user-update.input';
import { UserWhereUniqueInput } from 'src/@generated/user/user-where-unique.input';
import { User } from 'src/@generated/user/user.model';
import { Authorize } from '../auth/guards/authorize.guard';
import { UpdateUserRoleInput } from './dto/update-user-role.input';
import { UpdateUserStatusInput } from './dto/update-user-status.input';
import { UsersService } from './users.service';

// @Authorize()
@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  async users(@Args() args: FindManyUserArgs, @Info() info: GraphQLResolveInfo): Promise<User[]> {
    const select = new PrismaSelect(info).value;
    return this.usersService.get(args, select);
  }

  @Mutation(() => User)
  async userUpdate(
    @Args('input') input: UserUpdateInput,
    @Args('where') where: UserWhereUniqueInput,
  ): Promise<User> {
    return this.usersService.update(input, where);
  }

  @Authorize(Role.ADMIN)
  @Mutation(() => User)
  async userDelete(@Args('where') where: UserWhereUniqueInput): Promise<User> {
    return this.usersService.delete(where);
  }

  @Authorize(Role.ADMIN)
  @Mutation(() => User)
  async userUpdateRole(
    @Args('input') input: UpdateUserRoleInput,
    @Args('where') where: UserWhereUniqueInput,
  ): Promise<User> {
    return this.usersService.updateRole(input, where);
  }

  @Authorize(Role.ADMIN)
  @Mutation(() => User)
  async userUpdateStatus(
    @Args('input') input: UpdateUserStatusInput,
    @Args('where') where: UserWhereUniqueInput,
  ): Promise<User> {
    return this.usersService.updateStatus(input, where);
  }
}
