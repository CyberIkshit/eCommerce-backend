import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from './app.guards';
import { AppService } from './app.service';
import { Roles } from './entities/user.entity';

@Controller()
@SetMetadata('role', Roles.ADMIN)
@UseGuards(AuthGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
