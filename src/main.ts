import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { ProductoModule } from './modules/producto/producto.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('s3xapi');

  const firstOption = new DocumentBuilder()
    .setTitle('ProyectoNAGR')
    .setDescription('API para futuro proyecto')
    .setVersion('1.0')
    .addTag('user')
    .addTag('auth')
    .addTag('role')
    .addTag('product')
    .build();
  const userDocument = SwaggerModule.createDocument(app, firstOption);
  SwaggerModule.setup('s3xapi', app, userDocument);

  await app.listen(AppModule.port);
}
bootstrap();
