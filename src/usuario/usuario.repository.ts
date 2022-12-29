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

  async existeComEmail(email: string): Promise<boolean> {
    const possivelUsuario = this.usuarios.find((usuario) => {
      return usuario.email === email;
    });

    return possivelUsuario !== undefined;
  }
}
