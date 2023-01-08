import { CreateUserController } from '../../controllers/create-user'
import { makeCreateUser } from '../usecases/create-user'

export const makeCreateUserController = () => {
  return new CreateUserController(makeCreateUser())
}
