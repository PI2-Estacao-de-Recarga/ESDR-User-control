import { GetPlugsController } from '../../controllers/get-plugs'
import { makeGetPlugs } from '../usecases/get-plugs'

export const makeGetPlugsController = () => {
  return new GetPlugsController(makeGetPlugs())
}
