import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() nuevoUsuario: RegisterDto) {
    return this.authService.register(nuevoUsuario);
  }

  @Post('login')
  login(@Body() login: LoginDto) {
    return this.authService.login(login);
  }
}
