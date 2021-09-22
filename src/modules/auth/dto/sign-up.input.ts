import { InputType, IntersectionType, PickType } from '@nestjs/graphql';
import { UserDetailCreateInput } from 'src/@generated/user-detail/user-detail-create.input';
import { UserCreateInput } from 'src/@generated/user/user-create.input';

@InputType()
export class SignUpInput extends IntersectionType(
  PickType(UserCreateInput, ['email', 'password']),
  PickType(UserDetailCreateInput, ['firstName', 'lastName']),
) {}
