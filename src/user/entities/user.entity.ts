import {
  BaseEntity,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Role } from '../enums/roles.enum';
import { CountryPest } from 'src/master-pest/entities/country-pest.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number | string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  lastName: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.farmers,
  })
  role: Role;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true, type: 'text' })
  confirmationToken: string;

  @Column({ nullable: true, type: 'text' })
  recoverToken: string;

  @Column({ nullable: true })
  activationLink: string;

  @Column({ type: 'boolean', default: true })
  isActivated: boolean;

  @OneToMany(() => CountryPest, (countryPest) => countryPest.createdBy)
  photos: CountryPest[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
