import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsuarioRepository } from '../usuario.repository';

/* Essa classe terá a regra de negócios da validação personalizada. */
@Injectable() //Estamos declarando que essa classe é um provider, para que, dessa forma, o Nest consiga injetar essa dependência.
@ValidatorConstraint({ async: true }) //Estamos informando que essa validação será assíncrona.
export class EmailEhUnicoValidator implements ValidatorConstraintInterface {
  constructor(private usuarioRepository: UsuarioRepository) {}

  /* Se esse método retornar "true", significa que a validação passou. Se retornar "false", significa que a validação não passou. */
  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const usuarioComEmailExiste = await this.usuarioRepository.existeComEmail(
      value,
    );

    return !usuarioComEmailExiste;
  }
}

/* No TypeScript, um decorator é, basicamente, uma função que devolve outra função, e que executa alguma ação em um objeto, no construtor ou em alguma propriedade dele. */

export const EmailEhUnico = (opcoesDeValidacao: ValidationOptions) => {
  /* O primeiro parâmetro é o objeto em que o decorator está sendo executado, e o segundo parâmetro é a propriedade em que o validator será executado, que é uma string. */
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (objeto: Object, propriedade: string) => {
    registerDecorator({
      /* O "target" é o construtor do objeto. */
      target: objeto.constructor,
      /* O "propertyName" é a propriedade em que o validator será aplicado. */
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      /* Esse decorator utilizará o validador "EmailEhUnicoValidator". */
      validator: EmailEhUnicoValidator,
    });
  };
};
