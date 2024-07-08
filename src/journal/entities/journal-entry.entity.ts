import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Journal {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The title',
  })
  @Column()
  title: string;

  @ApiProperty({
    description: 'The content',
  })
  @Column('text')
  content: string;

  @Column()
  @ApiProperty({
    description: 'Description of the journal',
  })
  category: string;

  @CreateDateColumn()
  date: Date;
}
