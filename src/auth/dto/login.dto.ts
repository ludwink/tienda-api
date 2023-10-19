import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  //@Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  usuarioOcorreo: string;

  @IsNotEmpty()
  @IsString()
  contrasenia: string;
}
