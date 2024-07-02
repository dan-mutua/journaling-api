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

export class CreateUserDto {
  @ApiProperty({
    example: 'johndoe@gmail.com',
    description: 'User email field',
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'Superpass123@',
    description:
      'User password field (have to contain letters and numbers, special characters and 8 to 64 symbols)',
  })
  @IsNotEmpty()
  @Matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])(?=.*[a-zA-Z]).{8,64}$/,
    {
      message:
        'Password is too weak, it have to be 8 to 64 symbols, contain an uppercase letter, ' +
        'a lowercase letter, a number and a special character',
    },
  )
  readonly password: string;

  @ApiProperty({ example: 'scout', description: 'User role field' })
  @IsOptional()
  @IsEnum(Role)
  readonly role: Role;

  @ApiProperty({ example: true, description: 'User activation status field' })
  readonly isActivated: boolean;

  @ApiProperty({ example: 'doe' })
  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @ApiProperty({ example: 'jane' })
  firstName: string;
}
