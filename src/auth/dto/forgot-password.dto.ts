import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    example: 'abc@cde.com',
    description: 'User email',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}
