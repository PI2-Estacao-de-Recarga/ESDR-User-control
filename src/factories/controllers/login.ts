import { LoginController } from '../../controllers/login'
import { makeLogin } from '../usecases/login'

export const makeLoginController = () => {
  return new LoginController(makeLogin())
}
