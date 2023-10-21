import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Cliente } from './cliente.entity';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente]), AuthModule],
  controllers: [ClientesController],
  providers: [ClientesService],
})
export class ClientesModule {}
