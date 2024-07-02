import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Journal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column()
  category: string;

  @Column({ type: 'date' })
  date: Date;
}
