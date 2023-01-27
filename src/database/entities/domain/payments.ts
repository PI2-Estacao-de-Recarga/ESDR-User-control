import { StatusEnum } from '../enums/status'
import { User } from './user'

export type Payments = {
  qrCode: string

  qrCodeText: string

  status: StatusEnum

  totalAmount: number

  externalId?: string

  documentNumber: number

  user: User
}
