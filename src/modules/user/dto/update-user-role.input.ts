import { Field, InputType } from '@nestjs/graphql';
import { EnumRoleFieldUpdateOperationsInput } from 'src/@generated/prisma/enum-role-field-update-operations.input';

@InputType()
export class UpdateUserRoleInput {
  @Field(() => EnumRoleFieldUpdateOperationsInput, { nullable: true })
  role?: EnumRoleFieldUpdateOperationsInput;
}
