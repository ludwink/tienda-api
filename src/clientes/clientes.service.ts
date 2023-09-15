import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';
import { ActualizarClienteDto, CrearClienteDto } from './dto/cliente.dto';

@Injectable()
export class ClientesService {
  constructor(@InjectRepository(Cliente) private clienteRepository: Repository<Cliente>){ }

  crearCliente(cliente: CrearClienteDto) {
    const nuevoCliente = this.clienteRepository.create(cliente);
    return this.clienteRepository.save(nuevoCliente);
  }

  obtenerClientes() {
    return this.clienteRepository.find();
  }

  async obtenerClientePorId(id: number) {
    const usuarioExiste = await this.clienteRepository.findOne({ where: { id } });

    if (!usuarioExiste) {
      return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    return usuarioExiste;
  }

  async borrarCliente(id: number) {
    const resultado = await this.clienteRepository.delete(id);

    if (resultado.affected === 0) {
      return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    return resultado;
  }

  async actualizarCliente(id: number, cliente: ActualizarClienteDto) {
    const usuarioExiste = await this.clienteRepository.findOne({ where: { id } });

    if (!usuarioExiste) {
      return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    const actualizarCliente = Object.assign(usuarioExiste, cliente);
    return this.clienteRepository.save(actualizarCliente);
  }
}
