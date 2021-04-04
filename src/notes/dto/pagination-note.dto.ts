import { IsInt, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationNotesDTO {
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsInt()
  @IsOptional()
  page: number;

  @Transform(({ value }) => {
    return Number(value);
  })
  @IsInt()
  @IsOptional()
  limit?: number;
}
