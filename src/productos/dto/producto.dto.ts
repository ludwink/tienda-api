export class CrearProductoDto{
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
}

export class ActualizarProductoDto{
  nombre?: string;
  descripcion?: string;
  precio?: number;
  stock?: number;
}
