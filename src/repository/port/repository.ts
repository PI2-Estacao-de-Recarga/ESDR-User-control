import { User } from '../../database/entities/domain/user'

export interface Repository {
  createUser(params: {
    name: string
    email: string
    cpf: string
    password: string
  }): Promise<User | undefined>
}
