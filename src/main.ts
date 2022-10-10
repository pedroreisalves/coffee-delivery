import { DatabaseInterceptor } from './common/errors/interceptors/database.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestInterceptor } from './common/errors/interceptors/bad-request.interceptor';
import { ConflictInterceptor } from './common/errors/interceptors/conflict.interceptor';
import { NotFoundInterceptor } from './common/errors/interceptors/not-found.interceptor';
import { UnauthorizedInterceptor } from './common/errors/interceptors/unathorized.interceptor';

async function bootstrap() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ConflictInterceptor());
  app.useGlobalInterceptors(new UnauthorizedInterceptor());
  app.useGlobalInterceptors(new BadRequestInterceptor());
  app.useGlobalInterceptors(new NotFoundInterceptor());
  app.useGlobalInterceptors(new DatabaseInterceptor());
  await app.listen(PORT);
}
bootstrap();
