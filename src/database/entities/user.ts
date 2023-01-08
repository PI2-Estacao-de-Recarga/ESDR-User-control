import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

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
}
