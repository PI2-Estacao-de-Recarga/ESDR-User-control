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
  export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id?: string
  
    @Column({ type: 'timestamptz' })
    @CreateDateColumn()
    createdAt?: Date
  
    @Column({ type: 'timestamptz' })
    @UpdateDateColumn()
    updatedAt?: Date
  
    @Column({ nullable: true })
    qrCode: string
  
    @Column({ nullable: true })
    qrCodeText: string
  
    @Column({ nullable: true })
    status: string
  
    @Column({ nullable: true })
    totalAmount: string

    @Column({ nullable: true })
    externalId: string

    @Column({ nullable: true })
    end2endId: string

    @Column({ nullable: true })
    searchId: string

    @Column({ nullable: true })
    documentNumber: string

    @Column({ nullable: true })
    pixKeyBody: string

    @ManyToOne(()=>User,(user)=>user.payments)
    user: User
  }
  