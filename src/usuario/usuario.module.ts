import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioRepository } from './usuario.repository';

/* Estamos adicionando o "UsuarioController" nesse módulo. */

/* No NestJS, um módulo é, basicamente, um agrupamento. Os módulos criam uma árvore, pensando na arquitetura do projeto. */

/* Cada módulo deve ser pensado de forma isolada, com poucas dependências, a fim de que, se um dia, precisarmos separar módulos dessa aplicação em aplicações diferentes, seguindo o caminho dos microserviços, possamos ter a facildiade de fazer isso com pouco esforço. */

/* Com base nisso, temos a ideia de monolitos modulares, em que temos uma aplicação monolítica, mas estruturada em partes com um bom encapsulamento e um baixo acoplamento. */

/* Tudo relativo ao usuário ficará dentro desse módulo. */

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioRepository],
})
export class UsuarioModule {}
