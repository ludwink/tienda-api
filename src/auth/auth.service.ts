import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtAuthService: JwtService,
  ) {}

  register(nuevoUsuario: RegisterDto) {
    return this.usuariosService.create(nuevoUsuario);
  }

  async login({ contrasenia, usuarioOcorreo }: LoginDto) {
    // Validar usuario
    const buscarUsuario =
      await this.usuariosService.findByUsernameOrEmail(usuarioOcorreo);

    // Validar contraseña
    const validarContrasenia = await bcryptjs.compare(
      contrasenia,
      buscarUsuario.contrasenia,
    );
    if (!validarContrasenia)
      throw new UnauthorizedException('Contraseña incorrecta');

    // Payload y token
    const payload = {
      usuario: buscarUsuario.usuario,
      correo: buscarUsuario.correo,
    };
    const token = this.jwtAuthService.sign(payload);

    //  Devolver la informacion del usuario y el token
    const response = {
      usuario: buscarUsuario,
      token: token,
    };
    return response;
  }
}
