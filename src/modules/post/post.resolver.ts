import { Inject } from '@nestjs/common';
import { Args, Info, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PrismaSelect } from '@paljs/plugins';
import { GraphQLResolveInfo } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
import { FindManyPostArgs } from 'src/@generated/post/find-many-post.args';
import { PostCreateInput } from 'src/@generated/post/post-create.input';
import { PostUpdateInput } from 'src/@generated/post/post-update.input';
import { PostWhereUniqueInput } from 'src/@generated/post/post-where-unique.input';
import { Post } from 'src/@generated/post/post.model';
import { Authorize } from '../auth/guards/authorize.guard';
import { PostService } from './post.service';

@Resolver(() => Post)
export class PostResolver {
  private readonly POST_CREATED = 'post_created';
  private readonly POST_UPDATED = 'post_updated';
  private readonly POST_REMOVED = 'post_removed';

  constructor(private postService: PostService, @Inject('PUB_SUB') private pubSub: PubSub) {}

  @Subscription(() => Post)
  postChanged() {
    return this.pubSub.asyncIterator([this.POST_CREATED, this.POST_UPDATED, this.POST_REMOVED]);
  }

  @Query(() => [Post])
  async posts(@Args() args: FindManyPostArgs, @Info() info: GraphQLResolveInfo): Promise<Post[]> {
    const select = new PrismaSelect(info).value;
    return this.postService.get(args, select);
  }

  @Authorize()
  @Mutation(() => Post)
  async postCreate(@Args('data') data: PostCreateInput): Promise<Post> {
    const createdPost = this.postService.create(data);
    this.pubSub.publish(this.POST_CREATED, { postChanged: createdPost });
    return createdPost;
  }

  @Authorize()
  @Mutation(() => Post)
  async postUpdate(
    @Args('data') data: PostUpdateInput,
    @Args('where') where: PostWhereUniqueInput,
  ): Promise<Post> {
    const updatedPost = this.postService.update(data, where);
    this.pubSub.publish(this.POST_UPDATED, { postChanged: updatedPost });
    return updatedPost;
  }

  @Authorize()
  @Mutation(() => Post)
  async postDelete(@Args('where') where: PostWhereUniqueInput): Promise<Post> {
    const deletedPost = this.postService.delete(where);
    this.pubSub.publish(this.POST_REMOVED, { postChanged: deletedPost });
    return deletedPost;
  }
}
