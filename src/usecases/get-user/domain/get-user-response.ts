import { Payments } from "../../../database/entities/domain/payments"
import { Operation } from "../../../database/entities/domain/operation"
import { Plug } from "../../../database/entities/domain/plug"

export interface GetUserResponse {
    id?: string
    name: string
    email: string
    cpf: string
    password: string
    balance: number
    createdAt?: Date
    updatedAt?: Date
    operation?: Operation[]
}
