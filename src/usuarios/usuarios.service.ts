import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcryptjs from 'bcryptjs';
import { Repository } from 'typeorm';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { ModificarUsuarioDto } from './dto/modificar-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
  ) {}

  // CREAR ----------------------------------------------------------------------------
  async create({
    usuario,
    correo,
    contrasenia,
    nombre,
    telefono,
  }: CrearUsuarioDto) {
    const buscarUsuario = await this.usuarioRepository.findOne({
      where: { usuario },
    });

    if (buscarUsuario)
      throw new HttpException(
        'El usuario ya existe',
        HttpStatus.NOT_ACCEPTABLE,
      );

    const buscarCorreo = await this.usuarioRepository.findOne({
      where: { correo },
    });
    if (buscarCorreo)
      throw new HttpException('El correo ya existe', HttpStatus.NOT_ACCEPTABLE);

    const nuevoUsuario = this.usuarioRepository.create({
      usuario,
      correo,
      nombre,
      telefono,
      contrasenia: await bcryptjs.hash(contrasenia, 10),
    });

    const guardar = this.usuarioRepository.save(nuevoUsuario);
    delete (await guardar).contrasenia;

    return guardar;
  }

  // OBTENER TODOS -----------------------------------------------------------------------
  findAll() {
    return this.usuarioRepository.find({
      where: { existe: true, activo: true },
      select: ['usuario', 'correo', 'nombre', 'telefono'],
    });
  }

  // BUSCAR POR ID -------------------------------------------------------------------------
  async findOne(id: number) {
    const resultado = await this.usuarioRepository.findOne({ where: { id } });
    if (!resultado)
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);

    delete resultado.contrasenia;
    return resultado;
  }

  // BUSCAR POR USUARIO O CORREO ------------------------------------------------------------------
  async findByUsernameOrEmail(query: string) {
    const resultado = await this.usuarioRepository.findOne({
      where: [{ usuario: query }, { correo: query }],
    });

    if (!resultado)
      throw new HttpException(
        'Usuario o correo no encontrado',
        HttpStatus.NOT_FOUND,
      );

    delete resultado.contrasenia;
    return resultado;
  }

  // ACTUALIZAR USUARIO --------------------------------------------------------------------
  async update(id: number, actualizarUsuario: ActualizarUsuarioDto) {
    const usuarioExiste = await this.usuarioRepository.findOne({
      where: { id },
    });
    if (!usuarioExiste)
      throw new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);

    const actualizado = Object.assign(usuarioExiste, actualizarUsuario);
    const response = this.usuarioRepository.save(actualizado);
    delete (await response).contrasenia;
    return response;
  }

  async modifyActiveOrExists(id: number, data: ModificarUsuarioDto) {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
    });

    if (!usuario) throw new HttpException('ID no existe', HttpStatus.NOT_FOUND);

    if (data.existe !== undefined) {
      usuario.existe = data.existe;
    }

    if (data.activo !== undefined) {
      usuario.activo = data.activo;
    }

    await this.usuarioRepository.save(usuario);
    return HttpStatus.OK;
  }

  // // BUSCAR POR USUARIO --------------------------------------------------------------------
  // async findByUsername(usuario: string) {
  //   const resultado = await this.usuarioRepository.findOne({
  //     where: { usuario },
  //   });
  //   if (!resultado)
  //     return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
  //   delete resultado.contrasenia;
  //   return resultado;
  // }

  // // BUSCAR POR CORREO ---------------------------------------------------------------------
  // async findByEmail(correo: string) {
  //   const resultado = await this.usuarioRepository.findOne({
  //     where: { correo },
  //   });
  //   if (!resultado)
  //     return new HttpException('Correo no existe', HttpStatus.NOT_FOUND);

  //   delete resultado.contrasenia;
  //   return resultado;
  // }

  // // BORRADO LOGICO -------------------------------------------------------------------------
  // async remove(id: number, existe: boolean) {
  //   const usuarioExiste = await this.usuarioRepository.findOne({
  //     where: { id },
  //   });
  //   if (!usuarioExiste)
  //     return new HttpException('ID no existe', HttpStatus.NOT_FOUND);

  //   usuarioExiste.existe = !existe;
  //   await this.usuarioRepository.save(usuarioExiste);
  //   return HttpStatus.OK;
  // }

  // // BLOQUEAR USUARIO -----------------------------------------------------------------------
  // // activo/noactivo
  // async bloquearUsuario(id: number, activo: boolean) {
  //   const buscarUsuario = await this.usuarioRepository.findOne({
  //     where: { id },
  //   });
  //   if (!buscarUsuario)
  //     return new HttpException('ID no existe', HttpStatus.BAD_REQUEST);

  //   buscarUsuario.activo = !activo;
  //   await this.usuarioRepository.save(buscarUsuario);
  //   return HttpStatus.OK;
  // }
}
