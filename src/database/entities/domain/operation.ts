  import { OperationTypeEnum } from '../enums/operationType'
import { User } from './user'

export type Operation = {

  operationType: OperationTypeEnum

  creditAmount: number

  user: User
}
