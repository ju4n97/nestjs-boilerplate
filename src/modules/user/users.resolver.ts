import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FindManyUserArgs } from 'src/@generated/user/find-many-user.args';
import { UserCreateInput } from 'src/@generated/user/user-create.input';
import { UserUpdateInput } from 'src/@generated/user/user-update.input';
import { UserWhereUniqueInput } from 'src/@generated/user/user-where-unique.input';
import { User } from 'src/@generated/user/user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  async users(@Args() args: FindManyUserArgs): Promise<User[]> {
    return this.usersService.getUsers(args);
  }

  @Mutation(() => User)
  async userCreate(@Args('input') input: UserCreateInput): Promise<User> {
    return this.usersService.createUser(input);
  }

  @Mutation(() => User)
  async userUpdate(
    @Args('input') input: UserUpdateInput,
    @Args('where') where: UserWhereUniqueInput,
  ): Promise<User> {
    return this.usersService.updateUser(input, where);
  }

  @Mutation(() => User)
  async userDelete(@Args('where') where: UserWhereUniqueInput): Promise<User> {
    return this.usersService.deleteUser(where);
  }
}
