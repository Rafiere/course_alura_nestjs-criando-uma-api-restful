/* Dentro desse arquivo, criaremos uma classe de "Request", ou seja, que contém os dados e os tipos dos dados que estamos esperando receber no controller da aplicação para o endpoint de criar usuário. */

import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { EmailEhUnico } from '../validacao/email-eh-unico.validator';

export class CriaUsuarioDTO {
  /* Através do pacote "class-validator", estamos passando as validações diretamente para o DTO, assim, ele conseguirá verificar se o campo "nome" é realmente uma string e que ela não está vazia ou é "undefined". */

  /* A mensagem que escrevermos aqui será enviada para a requisição quando um erro ocorrer. */
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  nome: string;

  /* O "undefined" diz que não queremos passar nenhuma customização de validação. */
  @IsEmail(undefined, { message: 'O email informado é inválido.' })
  @EmailEhUnico({ message: 'Já existe um usuário cadastrado com esse email.' })
  email: string;

  /* A senha deve ter, no mínimo, seis caracteres. */
  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres.' })
  senha: string;
}
