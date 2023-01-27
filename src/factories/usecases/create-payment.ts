import PaymentRepository from '../../repository/user/payment'
import UserRepository from '../../repository/user/repository'
import { CreatePixUseCase } from '../../usecases/create-payment/use-case'
import { makeCreatePix } from '../services/create-pix'

export const makeCreatePayment = () => {
  const paymentRepository = new PaymentRepository()
  const userRepository = new UserRepository()
  return new CreatePixUseCase(
    makeCreatePix(),
    paymentRepository,
    userRepository
  )
}
