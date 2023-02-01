import { UpdateResult } from 'typeorm'
import { User } from '../../../database/entities/domain/user'

export interface SetPlugResponse {
    name: string
    dateTimeActivated: Date
    dateTimeToDeActivate: Date
    inUse: boolean
    user?: User
}

// export interface SetPlugResponse {
//         updateResult: UpdateResult
//     }