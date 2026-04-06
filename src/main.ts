import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
  app.enableCors();

  // Morgan logging
  app.use(
    morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev')
  );

  // Global prefix
  app.setGlobalPrefix('api');

  // Global filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global interceptor
  app.useGlobalInterceptors(new ResponseInterceptor());

  const port = process.env['PORT'] || 3000;
  await app.listen(port);

  console.log(`Server is running on port ${port}`);
}

bootstrap();