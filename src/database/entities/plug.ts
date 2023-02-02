import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from './user'

@Entity()
export class Plug {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column({ type: 'timestamptz' })
  @CreateDateColumn()
  createdAt?: Date

  @Column({ type: 'timestamptz' })
  @UpdateDateColumn()
  updatedAt?: Date

  @Column({ unique: true })
  name: string

  @Column({ nullable: true, type: 'timestamptz' })
  dateTimeActivated: Date

  @Column({ nullable: true, type: 'timestamptz' })
  dateTimeToDeactivate: Date

  @Column()
  inUse: boolean

  @ManyToOne(() => User, (user) => user.plugs)
  user?: User
}
