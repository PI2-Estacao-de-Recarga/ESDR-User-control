import { LoginEmailError } from '../usecases/login/errors/login-email-error'
import { LoginPasswordError } from '../usecases/login/errors/login-password-error'
import { LoginUseCase } from '../usecases/login/use-case'
import { Controller } from './domain/controller'
import { badRequest, HttpResponse, serverError, success } from './helpers/http'

type HttpRequest = {
  email: string
  password: string
}
type Model =
  | Error
  | {
      token: string
      name: string
      email: string
      cpf: string
      expireIn: string
    }

export class LoginController extends Controller {
  constructor(private readonly login: LoginUseCase) {
    super()
  }

  async perform(params: HttpRequest): Promise<HttpResponse<Model>> {
    const response = await this.login.execute(params)
    if (response.isSuccess && response.body) {
      return success(response.body)
    } else if (
      !response.isSuccess &&
      response.error instanceof LoginPasswordError
    ) {
      return badRequest(response.error)
    } else if (
      !response.isSuccess &&
      response.error instanceof LoginEmailError
    ) {
      return badRequest(response.error)
    } else {
      return serverError(response.error)
    }
  }
}
