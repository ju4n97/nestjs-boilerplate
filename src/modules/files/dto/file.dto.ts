import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsString, MaxLength } from 'class-validator';
import { FileGroup } from '../enums';

@Exclude()
export class FileDto {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  originalName: string;

  @Expose()
  @IsString()
  mimeType: string;

  @Expose()
  @IsString()
  @MaxLength(50)
  destination: string;

  @Expose()
  @IsString()
  fileName: string;

  @Expose()
  @IsString()
  path: string;

  @Expose()
  @IsNumber()
  size: number;

  @Expose()
  @IsEnum(FileGroup)
  @MaxLength(50)
  group: FileGroup;

  @Expose()
  @IsDate()
  createdAt: Date;

  @Expose()
  @IsDate()
  updatedAt: Date;
}
