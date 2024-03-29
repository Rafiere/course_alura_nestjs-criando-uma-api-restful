import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
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

  /* Estamos permitindo que o class validator resolva as dependências das suas classes da mesma forma que o Class Validator resolve. O segundo parâmetro diz que, se ele não conseguir resolver os erros de dependência pelo container do Nest, ele utilizará o seu próprio container para tentar resolver essas dependências. */
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3000);
}
bootstrap();
