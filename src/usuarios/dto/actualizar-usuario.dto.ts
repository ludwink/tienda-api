import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class ActualizarUsuarioDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsEmail()
  correo?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsString()
  //@Transform(({ value }) => value.trim()) // quitar caracteres en blanco
  @MinLength(8)
  @IsOptional()
  usuario?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;

  // @IsOptional()
  // @IsString()
  // @MinLength(8)
  // contrasenia?: string;
}
