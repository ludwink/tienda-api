import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ClientesModule } from './clientes/clientes.module';
import { ProductosModule } from './productos/productos.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    // .ENV -------------------------------------------------------------
    ConfigModule.forRoot({ isGlobal: true }),
    // DB --------------------------------------------------------------
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    // Generados automaticamente ----------------------------------------
    ClientesModule,
    ProductosModule,
    UsuariosModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
