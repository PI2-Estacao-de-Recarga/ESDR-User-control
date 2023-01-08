import { BcryptAdapter } from '../../adapters/bcrypt-adapter'
import UserRepository from '../../repository/user/repository'
import { CreateUserUseCase } from '../../usecases/create-user/use-case'

export const makeCreateUser = () => {
  const encryptor = new BcryptAdapter()
  const userRepository = new UserRepository()
  return new CreateUserUseCase(encryptor, userRepository)
}
