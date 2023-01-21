export interface CreateOrderPix {
  pixKey: string
  value: number
  name: string
  document: string
}

export interface CreateOrderResponse {
  qrCode: string
  qrCodeText: string
  status: string
  externalId?: string
  totalAmount: number
}
