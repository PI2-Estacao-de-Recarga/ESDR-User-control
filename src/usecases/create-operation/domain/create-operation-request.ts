export interface CreateOperationRequest {
    operationType: string
    creditAmount: number
    userId: string
    paymentId?: string
  }