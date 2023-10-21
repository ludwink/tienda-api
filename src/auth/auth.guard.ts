import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  // USAR JWT PARA COMPARAR TOKENS ----------------------------------------------
  constructor(private jwtService: JwtService) {}

  // FUNCION PRINCIPAL ----------------------------------------------------------
  // Devuelve true o false si el token es valido o no
  // Si es true, ejectua la ruta del Controller
  // Si es false, muestra error 401
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Obtener request
    const request = context.switchToHttp().getRequest();
    // Extraer token del request
    const token = this.extractTokenFromHeader(request);
    // Si no trae Token, envia un error
    if (!token) throw new UnauthorizedException();

    // Validar token con jwtService y la palabra secreta
    try {
      const payload = await this.jwtService.verifyAsync(token);
      // al request le podemos agregar informacion, en este caso un usuario
      request.usuario = payload;
    } catch {
      // Si el token no es valido o ya expiro, muestra un error 401
      throw new UnauthorizedException();
    }
    // Si todo es valido, devuelve true, sigue ejecutando el Controller
    return true;
  }

  // EXTRAER SOLO EL TOKEN -------------------------------------------------------
  // Importar Request de Express
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
