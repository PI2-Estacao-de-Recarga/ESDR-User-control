import { Payments } from "./payments"

export type User = {
  id?: string

  name: string

  email: string

  cpf: string

  password: string

  createdAt?: Date

  updatedAt?: Date

  payment?: Payments[]
}
