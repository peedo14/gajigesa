import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateNotesDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'Note name' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'Note title' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'Note detail' })
  detail: string;

  @IsString({ each: true })
  @IsNotEmpty()
  @ApiProperty({ type: Array, description: 'Note tags' })
  tags: string[];
}
