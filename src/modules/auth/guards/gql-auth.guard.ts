import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(ctx: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(ctx);
    return gqlCtx.getContext().req;
  }
}
