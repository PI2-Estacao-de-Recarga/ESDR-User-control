import { CreatePaymentController } from '../../controllers/create-payment'
import { makeCreatePayment } from '../usecases/create-payment'

export const makeCreatePaymentController = () => {
  return new CreatePaymentController(makeCreatePayment())
}
