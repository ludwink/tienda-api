import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsuariosModule,
    // -----------------------------------------------------------
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        global: true,
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
    // ----------------------------------------------------------
    // JwtModule.register({
    //   global: true,
    //   secret: jwtConstants.secret,
    //   //secret: process.env.JWT_SECRET,
    //   signOptions: { expiresIn: '1d' },
    // }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  // -----------------------------------------------------------
  exports: [JwtModule],
  // -----------------------------------------------------------
})
export class AuthModule {}
