import { User } from '../../database/entities/user'
import { UpdateResult } from 'typeorm'


export interface Repository {
  createUser(params: {
    name: string
    email: string
    cpf: string
    password: string
  }): Promise<User | undefined>
  updateBalance(newBalance: number, userId: string): Promise<UpdateResult | undefined>
  findOneByCpf(cpf: string): Promise<User | undefined>
  findOneByEmail(email: string): Promise<User | undefined>
  findToLogin(email: string): Promise<User | undefined>
  findOneById(userId: string): Promise<User | undefined>
}
