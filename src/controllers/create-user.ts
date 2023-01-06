import { CreateUserUseCase } from '../usecases/create-user/use-case'
import { Controller } from './domain/controller'
import { HttpResponse, serverError, success } from './helpers/http'

type HttpRequest = {
  name: string
  email: string
  cpf: string
  password: string
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
    } else {
      return serverError(response.error)
    }
  }
}
