import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsDate } from 'class-validator';

export class UpdateJournalEntryDto {
  @ApiPropertyOptional({ example: 'Updated Entry Title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'Updated content...' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({ example: 'Work' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: '2024-07-03' })
  @IsOptional()
  @IsDate()
  date?: Date;
}
