import OperationRepository from '../../repository/user/operation'
import PaymentRepository from '../../repository/user/payment'
import UserRepository from '../../repository/user/repository'
import { CreateOperationUseCase } from '../../usecases/create-operation/use-case'

export const makeCreateOperation = () => {
  const operationRepository = new OperationRepository()
  const userRepository = new UserRepository()
  const paymentRepository = new PaymentRepository()
  return new CreateOperationUseCase(
    operationRepository,
    userRepository,
    paymentRepository
  )
}
