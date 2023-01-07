import { CreateUserError } from '../usecases/create-user/errors/create-user-error'
import { DifferentPasswords } from '../usecases/create-user/errors/different-passwords-error'
import { UserAlreadyExistsError } from '../usecases/create-user/errors/user-already-exists-error'
import { CreateUserUseCase } from '../usecases/create-user/use-case'
import { Controller } from './domain/controller'
import { badRequest, HttpResponse, serverError, success } from './helpers/http'

type HttpRequest = {
  name: string
  email: string
  cpf: string
  password: string
  confirmPassword: string
}
type Model =
  | Error
  | {
      email: string
      cpf: string
    }

export class CreateUserController extends Controller {
  constructor(private readonly createUser: CreateUserUseCase) {
    super()
  }

  async perform(params: HttpRequest): Promise<HttpResponse<Model>> {
    const response = await this.createUser.execute(params)
    if (response.isSuccess && response.data) {
      return success(response.data)
    } else if (
      !response.isSuccess &&
      response.error instanceof DifferentPasswords
    ) {
      return badRequest(response.error)
    } else if (
      !response.isSuccess &&
      response.error instanceof UserAlreadyExistsError
    ) {
      return badRequest(response.error)
    } else if (
      !response.isSuccess &&
      response.error instanceof CreateUserError
    ) {
      return badRequest(response.error)
    } else {
      return serverError(response.error)
    }
  }
}
