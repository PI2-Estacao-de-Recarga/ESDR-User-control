import { User } from '../database/entities/domain/user'
import { GetUserError } from '../usecases/get-user/errors/get-user-error'
import { GetUserUseCase } from '../usecases/get-user/use-case'
import { Controller } from './domain/controller'
import { badRequest, HttpResponse, serverError, success } from './helpers/http'

type HttpRequest = {
  userId: string
}
type Model = Error | User

export class GetUserController extends Controller {
  constructor(private readonly getUser: GetUserUseCase) {
    super()
  }

  async perform(params: HttpRequest): Promise<HttpResponse<Model>> {
    const response = await this.getUser.execute(params)
    if (response.isSuccess && response.data) {
      return success(response.data)
    } else if (!response.isSuccess && response.error instanceof GetUserError) {
      return badRequest(response.error)
    } else {
      return serverError(response.error)
    }
  }
}
