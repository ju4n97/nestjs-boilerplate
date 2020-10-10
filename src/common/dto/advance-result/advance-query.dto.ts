import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class AdvanceQuery {
  @IsOptional()
  @IsString()
  select: string;

  @IsOptional()
  @IsString()
  relations: string;

  @IsOptional()
  @IsString()
  filter: string;

  @IsOptional()
  @IsString()
  sort: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isLoadingAll: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  take = 10;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  skip = 0;
}
