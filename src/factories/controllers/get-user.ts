import { GetUserController } from '../../controllers/get-user'
import { makeGetUser } from '../usecases/get-user'

export const makeGetUserController = () => {
  return new GetUserController(makeGetUser())
}
