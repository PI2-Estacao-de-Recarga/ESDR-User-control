import { BcryptAdapter } from '../../adapters/bcrypt-adapter'
import UserRepository from '../../repository/user/repository'
import { LoginUseCase } from '../../usecases/login/use-case'

export const makeLogin = () => {
  const encryptor = new BcryptAdapter()
  const userRepository = new UserRepository()
  return new LoginUseCase(userRepository, encryptor)
}
