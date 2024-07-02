import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { Role } from '../enums/roles.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    example: 'johndoe@gmail.com',
    description: 'User email field',
  })
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: 'SuperPassword123@',
    description:
      'User password field (have to contain letters and numbers, special characters and 8 to 64 symbols)',
  })
  @Matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])(?=.*[a-zA-Z]).{8,64}$/,
    {
      message:
        'Password is too weak, it have to be 8 to 64 symbols, contain an uppercase letter, ' +
        'a lowercase letter, a number and a special character',
    },
  )
  password?: string;

  // user cannot update their role. only IT
  // @ApiProperty({ example: 'PATIENT', description: 'User role field' })
  // @IsNotEmpty()
  // @IsEnum([
  //   'applicant',
  //   'officer',
  //   'supervisor',
  //   'secretary',
  //   'it',
  //   'trialinstitution',
  //   'compliance',
  // ])
  // role?: Role;

  @ApiProperty({ example: true, description: 'User activation status field' })
  isActivated?: boolean;

  @ApiProperty({
    example: '803d3b31-9d52-4d18-aa60-886295164f85',
    description: 'User activation link field',
  })
  activationLink?: string;

  @IsString()
  @IsNotEmpty()
  idNumber: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;
}
