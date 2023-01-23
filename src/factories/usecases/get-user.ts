import UserRepository from '../../repository/user/repository'
import { GetUserUseCase } from '../../usecases/get-user/use-case'

export const makeGetUser = () => {
  const userRepository = new UserRepository()
  return new GetUserUseCase(userRepository)
}
