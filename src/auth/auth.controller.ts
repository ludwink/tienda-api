import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
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

  @UseGuards(AuthGuard)
  @Get('usuarios')
  usuarios() {
    return 'Aqui muestra todos los usuarios';
  }
}
