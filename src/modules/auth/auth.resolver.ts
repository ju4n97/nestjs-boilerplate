import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AccessToken } from './dto/access-token.dto';
import { RefreshTokenInput } from './dto/refresh-token.args';
import { SignInInput } from './dto/sign-in.input';
import { SignUpInput } from './dto/sign-up.input';

@Resolver(() => AccessToken)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AccessToken)
  async signUp(@Args('data') data: SignUpInput) {
    return this.authService.signUp(data);
  }

  @Mutation(() => AccessToken)
  async signIn(@Args('data') data: SignInInput) {
    return this.authService.signIn(data);
  }

  @Mutation(() => AccessToken)
  async refreshToken(@Args() { token }: RefreshTokenInput) {
    return this.authService.refreshToken(token);
  }
}
