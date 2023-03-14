//import { cors } from 'cors';
// import cors from 'cors';
// import hpp from 'hpp';
//import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { HttpExceptionFilter } from './common/filter/http.exection.filter';

const Cliente = 'localhost:3000';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(hpp());
  app.enableCors({
    origin: [
      'http://localhost:3000',
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  });
  // app.use(helmet());

  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  //   res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  //   next();
  // });

  // app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
