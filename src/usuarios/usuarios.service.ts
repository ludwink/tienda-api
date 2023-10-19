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
  async create(crearUsuario: CrearUsuarioDto) {
    // Verificar si existe usuario o correo
    const buscarUsuario = await this.usuarioRepository.findOne({
      where: { usuario: crearUsuario.usuario },
    });
    if (buscarUsuario)
      throw new HttpException('Usuario ya existe', HttpStatus.NOT_ACCEPTABLE);

    const buscarCorreo = await this.usuarioRepository.findOne({
      where: { correo: crearUsuario.correo },
    });
    if (buscarCorreo)
      throw new HttpException('Correo ya existe', HttpStatus.NOT_ACCEPTABLE);

    // hash contraseña
    const { contrasenia } = crearUsuario;
    const contraseniaHash = await bcryptjs.hash(contrasenia, 10);
    crearUsuario.contrasenia = contraseniaHash;

    // guardar
    // const nuevoUsuario = this.usuarioRepository.create({}); // create crea una instancia
    const usuarioGuardado = await this.usuarioRepository.save(crearUsuario);
    //delete (await usuarioGuardado).contrasenia;
    return usuarioGuardado;
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

    //delete resultado.contrasenia;
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
}
