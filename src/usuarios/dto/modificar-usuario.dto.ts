import { IsBoolean, IsOptional } from 'class-validator';

export class ModificarUsuarioDto {
  @IsOptional()
  @IsBoolean()
  existe?: boolean;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
