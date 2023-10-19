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
import { ActualizarProductoDto, CrearProductoDto } from './dto/producto.dto';
import { ProductosService } from './productos.service';

@UseGuards(AuthGuard)
@Controller('productos')
export class ProductosController {
  constructor(private productosService: ProductosService) {}

  @Get()
  obtenerProductos() {
    return this.productosService.obtenerProductos();
  }

  @Get(':id')
  obtenerProductoPorId(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.obtenerProductoPorId(id);
  }

  @Post()
  crearProducto(@Body() nuevoProducto: CrearProductoDto) {
    return this.productosService.crearProducto(nuevoProducto);
  }

  @Delete(':id')
  borrarProducto(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.borrarProducto(id);
  }

  @Patch(':id')
  actualizarProducto(
    @Param('id', ParseIntPipe) id: number,
    @Body() producto: ActualizarProductoDto,
  ) {
    return this.productosService.actualizarProducto(id, producto);
  }
}
