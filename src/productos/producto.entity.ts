import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nombre: string

  @Column()
  descripcion: string

  @Column("decimal", { precision: 5, scale: 2 })
  precio: number

  @Column()
  stock: number
}
