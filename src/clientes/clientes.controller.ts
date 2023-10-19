import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ClientesService } from './clientes.service';
import { ActualizarClienteDto, CrearClienteDto } from './dto/cliente.dto';

@UseGuards(AuthGuard)
@Controller('clientes')
export class ClientesController {
  constructor(private clientesService: ClientesService) {}

  @Get()
  obtenerClientes() {
    return this.clientesService.obtenerClientes();
  }

  @Get(':id')
  obtenerClientePorId(@Param('id', ParseIntPipe) id: number) {
    return this.clientesService.obtenerClientePorId(id);
  }

  @Post()
  crearCliente(@Body() nuevoCliente: CrearClienteDto) {
    return this.clientesService.crearCliente(nuevoCliente);
  }

  @Delete(':id')
  borrarCliente(@Param('id', ParseIntPipe) id: number) {
    return this.clientesService.borrarCliente(id);
  }

  @Patch(':id')
  actualizarCliente(
    @Param('id', ParseIntPipe) id: number,
    @Body() cliente: ActualizarClienteDto,
  ) {
    return this.clientesService.actualizarCliente(id, cliente);
  }
}
