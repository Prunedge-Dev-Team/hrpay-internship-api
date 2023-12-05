import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix('api/v1/');

  const logger = new Logger('API');
  const config = new DocumentBuilder()
    .setTitle('HR Pay Doc')
    .setDescription('The HR Pay API description')
    .setVersion('1.0')
    .addTag('hrpay')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(19000);
  logger.log('API running, visit doc on http://localhost:19000/docs');
}
bootstrap();
