import { Field, InputType } from '@nestjs/graphql';
import { EnumStatusFieldUpdateOperationsInput } from 'src/@generated/prisma/enum-status-field-update-operations.input';

@InputType()
export class UpdateUserStatusInput {
  @Field(() => EnumStatusFieldUpdateOperationsInput, { nullable: true })
  status?: EnumStatusFieldUpdateOperationsInput;
}
