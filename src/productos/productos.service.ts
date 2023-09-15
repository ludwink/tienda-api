import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActualizarProductoDto, CrearProductoDto } from './dto/producto.dto';
import { Producto } from './producto.entity';

@Injectable()
export class ProductosService {
  constructor(@InjectRepository(Producto) private productoRepository: Repository<Producto>){}

  async crearProducto(producto: CrearProductoDto) {
    const nuevoProducto = this.productoRepository.create(producto);
    return this.productoRepository.save(nuevoProducto);
  }

  obtenerProductos() {
    return this.productoRepository.find();
  }

  async obtenerProductoPorId(id: number) {
    const productoExiste = await this.productoRepository.findOne({ where: { id } });

    if (!productoExiste) {
      return new HttpException('Producto no existe', HttpStatus.NOT_FOUND);
    }

    return productoExiste;
  }

  async borrarProducto(id: number) {
    const resultado = await this.productoRepository.delete(id);

    if (resultado.affected === 0) {
      return new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
    }

    return resultado;
  }

  async actualizarProducto(id: number, producto: ActualizarProductoDto) {
    const productoExiste = await this.productoRepository.findOne({ where: { id } });

    if (!productoExiste) {
      return new HttpException('Producto no existe', HttpStatus.NOT_FOUND);
    }

    const actualizarProducto = Object.assign(productoExiste, producto);
    return this.productoRepository.save(actualizarProducto);
  }
}
