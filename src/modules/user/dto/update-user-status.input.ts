import { Field, InputType } from '@nestjs/graphql';
import { EnumUserStatusFieldUpdateOperationsInput } from 'src/@generated/prisma/enum-user-status-field-update-operations.input';

@InputType()
export class UpdateUserStatusInput {
  @Field(() => EnumUserStatusFieldUpdateOperationsInput, { nullable: true })
  status?: EnumUserStatusFieldUpdateOperationsInput;
}
