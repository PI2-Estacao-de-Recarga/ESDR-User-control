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
  export class Operation {
    @PrimaryGeneratedColumn('uuid')
    id?: string
  
    @Column({ type: 'timestamptz' })
    @CreateDateColumn()
    createdAt?: Date
  
    @Column({ type: 'timestamptz' })
    @UpdateDateColumn()
    updatedAt?: Date
  
    @Column()
    operationType: string
  
    @Column()
    creditAmount: number
  
    @ManyToOne(() => User, (user) => user.operations)
    user: User
  }
  