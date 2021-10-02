import { Injectable } from '@nestjs/common';
import { FindManyPostArgs } from 'src/@generated/post/find-many-post.args';
import { PostCreateInput } from 'src/@generated/post/post-create.input';
import { PostUpdateInput } from 'src/@generated/post/post-update.input';
import { PostWhereUniqueInput } from 'src/@generated/post/post-where-unique.input';
import { Post } from 'src/@generated/post/post.model';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async get(args: FindManyPostArgs, select: any): Promise<Post[]> {
    return this.prisma.post.findMany({ ...args, ...select });
  }

  async create(data: PostCreateInput): Promise<Post> {
    return this.prisma.post.create({ data });
  }

  async update(data: PostUpdateInput, where: PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.update({ data, where });
  }

  async delete(where: PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.delete({ where });
  }
}
