import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User, UserCreateInput } from './user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  async users() {
    return this.usersService.getUsers();
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: UserCreateInput) {
    this.usersService.createUser(input);
  }
}
