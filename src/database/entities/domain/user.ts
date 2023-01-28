import { Operation } from '../operation'
import { Payments } from './payments'

export type User = {
  id?: string

  name: string

  email: string

  cpf: string

  password: string

  balance: number

  createdAt?: Date

  updatedAt?: Date

  payment?: Payments[]

  operation?: Operation[]
}
