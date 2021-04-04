import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateNotesDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'Note name', required: false })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'Note title', required: false })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'Note detail', required: false })
  detail: string;

  @IsString({ each: true })
  @IsOptional()
  @ApiProperty({ type: Array, description: 'Note tags', required: false })
  tags: string[];
}
