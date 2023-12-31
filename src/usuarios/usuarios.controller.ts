import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { ModificarUsuarioDto } from './dto/modificar-usuario.dto';
import { UsuariosService } from './usuarios.service';

// Guard global, protege todas las rutas
//@UseGuards(AuthGuard)
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() createUsuarioDto: CrearUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get('/id/:id')
  findOne(@Param('id', ParseIntPipe) id) {
    return this.usuariosService.findOne(+id);
  }

  @Get(':usuario')
  findByUsernameOrEmail(@Param('usuario') usuario: string) {
    return this.usuariosService.findByUsernameOrEmail(usuario);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id,
    @Body() actualizarUsuarioDto: ActualizarUsuarioDto,
  ) {
    return this.usuariosService.update(+id, actualizarUsuarioDto);
  }

  @Patch('/modificar/:id')
  modifyActiveOrExists(
    @Param('id', ParseIntPipe) id,
    @Body() modificarUsuario: ModificarUsuarioDto,
  ) {
    return this.usuariosService.modifyActiveOrExists(id, modificarUsuario);
  }
}
