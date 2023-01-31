import { User } from '../../../database/entities/domain/user'

export interface CreateOrderPix {
  pixKey: string
  value: number
  name?: string
  document?: string
  userId: string
}

export interface CreateOrderResponse {
  qrCode: string
  externalId?: string
  qrCodeText: string
  status: string
  totalAmount: number
  documentNumber: string
  user?: User
  id?: string
}
