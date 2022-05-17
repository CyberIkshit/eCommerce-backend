import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(session({
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    secret: 'sshSecretToken...',
    cookie: {
      sameSite: true,
      secure: false,
    }
  }));
  await app.listen(3000);
}
bootstrap();
