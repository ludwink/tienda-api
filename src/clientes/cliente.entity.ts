import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nombres: string

  @Column()
  apellidos: string

  @Column()
  direccion: string

  @Column()
  telefono: string
}
