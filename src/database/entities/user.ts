import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Payment } from './payments'
import { Operation } from './operation'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column({ type: 'timestamptz' })
  @CreateDateColumn()
  createdAt?: Date

  @Column({ type: 'timestamptz' })
  @UpdateDateColumn()
  updatedAt?: Date

  @Column({ nullable: true, unique: true })
  email: string

  @Column()
  name: string

  @Column({ nullable: true, unique: true })
  cpf: string

  @Column({ select: false })
  password: string

  @OneToMany(() => Payment, (payment) => payment.user)
  payments?: Payment[]

  @OneToMany(() => Operation, (operation) => operation.user)
  operations?: Operation[]
}
