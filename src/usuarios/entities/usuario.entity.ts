import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { unique: true, length: 20 })
  usuario: string;

  @Column()
  contrasenia: string;

  @Column('varchar', { length: 50 })
  nombre: string;

  @Column('varchar', { length: 50, unique: true })
  correo: string;

  @Column('varchar', { length: 15, nullable: true })
  telefono: string;

  @Column({ default: true })
  activo: boolean;

  @Column({ default: true })
  existe: boolean;
}
