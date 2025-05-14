import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RestLoggingInterceptor } from './application/logging';
import { JwtAuthExceptionFilter } from './modules/auth/filters/jwt-auth-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new RestLoggingInterceptor());
  app.useGlobalFilters(new JwtAuthExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Nest Boilerplate')
    .setDescription('API documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
