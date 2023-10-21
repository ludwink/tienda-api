import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() login: LoginDto) {
    return this.authService.login(login.usuarioOcorreo, login.contrasenia);
  }

  @Post('register')
  register(@Body() nuevoUsuario: RegisterDto) {
    return this.authService.register(nuevoUsuario);
  }

  // RUTA PROTEGIRA CON GUARD -------------------------------------------------
  @UseGuards(AuthGuard)
  @Get('usuarios')
  usuarios(@Request() request) {
    return request.usuario;
    //return `Aqui muestra todos los usuarios`;
  }
}
