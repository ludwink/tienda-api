import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from './clientes/clientes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      password: '',
      host: 'localhost',
      port: 3306,
      database: 'tiendaNest',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      //synchronize: true,
    }),
    ClientesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
