import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
  MinLength,
} from 'class-validator';

export class CrearUsuarioDto {
  @IsNotEmpty()
  @IsString()
  //@Transform(({value}) => value.trim()) // quitar caracteres en blanco
  @MinLength(8)
  usuario: string;

  //@Matches(/^[a-zA-Z]{8,}(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])$/)
  @Matches(/^[a-zA-Z]/)
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  })
  contrasenia: string;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsEmail()
  correo: string;

  @IsOptional()
  @IsString()
  telefono?: string;
}
