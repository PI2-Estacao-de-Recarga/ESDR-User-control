import PlugRepository from '../../repository/user/plug'
import UserRepository from '../../repository/user/repository'
import { SetPlugUseCase } from '../../usecases/set-plug/use-case'

export const makeSetPlug = () => {
  const plugRepository = new PlugRepository()
  const userRepository = new UserRepository()
  return new SetPlugUseCase(
    plugRepository,
    userRepository,
  )
}