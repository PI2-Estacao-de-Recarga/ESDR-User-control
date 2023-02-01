import { SetPlugController } from '../../controllers/set-plug'
import { makeSetPlug } from '../usecases/set-plug'

export const makeSetPlugController = () => {
  return new SetPlugController(makeSetPlug())
}