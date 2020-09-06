import { OmitType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
import { UserDetailDto } from './user-detail.dto';

@Exclude()
export class GetUserDetailDto extends OmitType(UserDetailDto, [] as const) {}
