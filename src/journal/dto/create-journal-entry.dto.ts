import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreateJournalEntryDto {
  @ApiProperty({ example: 'My First Entry' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Today I started using NestJS...' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ example: 'Personal' })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({ example: '2024-07-02' })
  @IsNotEmpty()
  @IsDate()
  date: Date;
}
