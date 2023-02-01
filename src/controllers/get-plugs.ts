import { User } from '../database/entities/domain/user'
import { GetUserResponse } from '../usecases/get-user/domain/get-user-response'
import { GetUserError } from '../usecases/get-user/errors/get-user-error'
import { GetPlugsUseCase } from '../usecases/get-plugs/use-case'
import { Controller } from './domain/controller'
import { badRequest, HttpResponse, serverError, success } from './helpers/http'
import { GetPlugsResponse } from '../usecases/get-plugs/domain/get-plugs-response'
import { Plug } from '../database/entities/plug'

type HttpRequest = {
    inUse?: boolean
    userId?: string
}
type Model = Error | Plug[]

export class GetPlugsController extends Controller {
  constructor(private readonly getPlugs: GetPlugsUseCase) {
    super()
  }

  async perform(params: HttpRequest): Promise<HttpResponse<Model>> {
    const response = await this.getPlugs.execute(params)
    if (response.isSuccess && response.body) {
      return success(response.body)
    } else if (!response.isSuccess && response.error instanceof GetUserError) {
      return badRequest(response.error)
    } else {
      return serverError(response.error)
    }
  }
}
