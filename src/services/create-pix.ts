import { OrderPixServiceResponse } from '../controllers/helpers/order-pix-service-response'

export interface CreatePix<T> {
  paymentRequest(payload: T): Promise<OrderPixServiceResponse<any>>
}
