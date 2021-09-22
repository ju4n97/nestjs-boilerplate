import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AccessToken } from './dto/access-token.dto';
import { RefreshTokenInput } from './dto/refresh-token.input';
import { SignInInput } from './dto/sign-in.input';
import { SignUpInput } from './dto/sign-up.input';

@Resolver(() => AccessToken)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AccessToken)
  async signUp(@Args('input') input: SignUpInput) {
    return this.authService.signUp(input);
  }

  @Mutation(() => AccessToken)
  async signIn(@Args('input') input: SignInInput) {
    return this.authService.signIn(input);
  }

  @Mutation(() => AccessToken)
  async refreshToken(@Args() { token }: RefreshTokenInput) {
    return this.authService.refreshToken(token);
  }
}
