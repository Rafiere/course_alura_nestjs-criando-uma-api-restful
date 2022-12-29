/* Dentro dessa classe, isolaremos a lógica para salvar os dados do usuário. */

import { Injectable } from '@nestjs/common';

/* Um "provider", no Nest, é qualquer classe que esteja anotada com o decorator "@Injectable". */

@Injectable()
export class UsuarioRepository {
  private usuarios = [];

  async salvar(usuario) {
    this.usuarios.push(usuario);
  }

  async listarUsuarios() {
    return this.usuarios;
  }
}
