import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaSelect } from '@paljs/plugins';
import { GraphQLResolveInfo } from 'graphql';
import { FindManyPostArgs } from 'src/@generated/post/find-many-post.args';
import { PostCreateInput } from 'src/@generated/post/post-create.input';
import { PostUpdateInput } from 'src/@generated/post/post-update.input';
import { PostWhereUniqueInput } from 'src/@generated/post/post-where-unique.input';
import { Post } from 'src/@generated/post/post.model';
import { Authorize } from '../auth/guards/authorize.guard';
import { PostService } from './post.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query(() => [Post])
  async posts(@Args() args: FindManyPostArgs, @Info() info: GraphQLResolveInfo): Promise<Post[]> {
    const select = new PrismaSelect(info).value;
    return this.postService.get(args, select);
  }

  @Authorize()
  @Mutation(() => Post)
  async postCreate(@Args('data') data: PostCreateInput): Promise<Post> {
    return this.postService.create(data);
  }

  @Authorize()
  @Mutation(() => Post)
  async postUpdate(
    @Args('data') data: PostUpdateInput,
    @Args('where') where: PostWhereUniqueInput,
  ): Promise<Post> {
    return this.postService.update(data, where);
  }

  @Authorize()
  @Mutation(() => Post)
  async postDelete(@Args('where') where: PostWhereUniqueInput): Promise<Post> {
    return this.postService.delete(where);
  }
}
