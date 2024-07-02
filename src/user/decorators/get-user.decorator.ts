import { createParamDecorator } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

export const GetUser = createParamDecorator((data, req): User => {
  console.log('user', req.args);

  const user = req.args[0].user;
  return user;
});
