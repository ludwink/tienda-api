import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  // IMPORTAR SERVICE DE usuarios y JWT ---------------------------------------------
  // Usar UsuariosService que tiene los metodos para crear y buscar usuarios
  // Tambien se puede inyectar el Repository de Usuarios
  // El repository interactua directamente con la BD
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}
  // -------------------------------------------------------------------------------

  // REGISTER ----------------------------------------------------------------------
  register(nuevoUsuario: RegisterDto) {
    // (el modulo de Usuarios tiene las validaciones y excepciones)
    return this.usuariosService.create(nuevoUsuario);
  }

  // LOGIN -------------------------------------------------------------------------
  async login(usuario: string, contrasenia: string) {
    // Validar usuario (el modulo de Usuarios tiene las validaciones y excepciones)
    const buscarUsuario =
      await this.usuariosService.findByUsernameOrEmail(usuario);

    // Validar contraseña
    const validarContrasenia = await bcryptjs.compare(
      contrasenia,
      buscarUsuario.contrasenia,
    );
    if (!validarContrasenia)
      throw new UnauthorizedException('Contraseña incorrecta');

    // Payload (incluir solo informacio publica) y token
    const payload = { usuario: usuario };
    const token = await this.jwtService.signAsync(payload);

    // Devolver la informacion del usuario y el token
    return { token, usuario };
    //return { usuario: buscarUsuario, token: token };
  }
}
