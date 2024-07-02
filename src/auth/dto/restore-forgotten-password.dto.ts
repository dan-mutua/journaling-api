import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';

export class RestoreForgottenPasswordDto {
  @ApiProperty({
    example: 'Asdfgh@67890',
    description: 'New user password.',
  })
  @Matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])(?=.*[a-zA-Z]).{8,64}$/,
    {
      message:
        'Password is too weak, it have to be 8 to 64 symbols, contain an uppercase letter, ' +
        'a lowercase letter, a number and a special character',
    },
  )
  readonly password: string;
}
