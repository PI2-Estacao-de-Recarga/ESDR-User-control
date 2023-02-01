import PlugRepository from '../../repository/user/plug'
import { GetPlugsUseCase } from '../../usecases/get-plugs/use-case'

export const makeGetPlugs = () => {
  const plugRepository = new PlugRepository()
  return new GetPlugsUseCase(plugRepository)
}
