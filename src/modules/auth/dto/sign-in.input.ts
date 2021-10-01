import { InputType, PickType } from '@nestjs/graphql';
import { UserCreateInput } from 'src/@generated/user/user-create.input';

@InputType()
export class SignInInput extends PickType(UserCreateInput, ['email', 'password']) {}
