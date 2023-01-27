import OperationRepository from '../../repository/operation'
import UserRepository from '../../repository/user/repository'
import { CreateOperationUseCase } from '../../usecases/create-operation/use-case'

export const makeCreateOperation = () => {
  const operationRepository = new OperationRepository()
  const userRepository = new UserRepository()
  return new CreateOperationUseCase(
    operationRepository,
    userRepository
  )
}
