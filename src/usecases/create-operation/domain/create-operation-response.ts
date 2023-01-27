import { User } from '../../../database/entities/domain/user'

export interface CreateOperationResponse {
    operationType: string
    creditAmount: number
    user?: User
}