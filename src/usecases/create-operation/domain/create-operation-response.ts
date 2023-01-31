import { User } from '../../../database/entities/domain/user'

export interface CreateOperationResponse {
    operationType: string
    creditAmount: number
    currentBalance: number
    user?: User
}