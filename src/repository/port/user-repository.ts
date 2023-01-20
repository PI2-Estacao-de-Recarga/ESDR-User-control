import { User } from '../../database/entities/domain/user'

export interface Repository {
  createUser(params: {
    name: string
    email: string
    cpf: string
    password: string
  }): Promise<User | undefined>
  findOneByCpf(cpf: string): Promise<User | undefined>
  findOneByEmail(email: string): Promise<User | undefined>
  findToLogin(email: string): Promise<User | undefined>
}