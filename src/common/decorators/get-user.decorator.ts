import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { RequestUser } from 'src/modules/auth/types/request-user.type';

export const User = createParamDecorator(
  (data: unknown, context: ExecutionContext): RequestUser => {
    const req = context.switchToHttp().getRequest<Request>();
    const user = req.user as RequestUser;
    return user;
  },
);
