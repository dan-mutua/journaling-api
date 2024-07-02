import { ICurrentUser } from '../current-user.interface';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUserProvider: () => ParameterDecorator =
  createParamDecorator((data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user as ICurrentUser;
  });
