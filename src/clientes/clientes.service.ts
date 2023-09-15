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
    const clienteExiste = await this.clienteRepository.findOne({ where: { id } });

    if (!clienteExiste) {
      return new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND);
    }

    return clienteExiste;
  }

  async borrarCliente(id: number) {
    const resultado = await this.clienteRepository.delete(id);

    if (resultado.affected === 0) {
      return new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND);
    }

    return resultado;
  }

  async actualizarCliente(id: number, cliente: ActualizarClienteDto) {
    const clienteExiste = await this.clienteRepository.findOne({ where: { id } });

    if (!clienteExiste) {
      return new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND);
    }

    const actualizarCliente = Object.assign(clienteExiste, cliente);
    return this.clienteRepository.save(actualizarCliente);
  }
}
