import { OmitType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
import { FileDto } from './file.dto';

@Exclude()
export class GetFileDto extends OmitType(FileDto, [] as const) {}
