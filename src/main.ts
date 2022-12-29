import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      // O "transform" consiste em, ao executarmos esse pipe, o JSON enviado no endpoint seja convertido em um DTO.
      transform: true,

      /* O "whitelist" diz que quando o Nest for realizar a validação desse pipe, ele ignorará todas as propriedades do JSON que não estiverem no DTO, dessa forma, ele ignorará de forma silenciosa, não dando nenhum alerta de erro. */
      whitelist: true,

      /* Se alguém enviar um dado do JSON que não estiver em nosso DTO, um erro será lançado. */
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
