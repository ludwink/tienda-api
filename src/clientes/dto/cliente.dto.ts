export class CrearClienteDto{
  nombres: string;
  apellidos: string;
  direccion: string;
  telefono: string;
}

export class ActualizarClienteDto{
  nombres?: string;
  apellidos?: string;
  direccion?: string;
  telefono?: string;
}
