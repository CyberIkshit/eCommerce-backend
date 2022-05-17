import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from './entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.get('role', context.getClass());
    const request = context.switchToHttp().getRequest();
    if (role === Roles.ADMIN) {
      if (request.session.userId && request.session.isAdmin) {
        return true;
      }
      return false;
    } else if (role === Roles.CUSTOMER) {
      if (request.session.userId && !request.session.isAdmin) {
        return true;
      }
      return false;
    }
  }
}
