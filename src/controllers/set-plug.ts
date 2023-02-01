import { GetUserError } from '../usecases/get-user/errors/get-user-error'
import { SetPlugUseCase } from '../usecases/set-plug/use-case'
import { Controller } from './domain/controller'
import { badRequest, HttpResponse, serverError, success } from './helpers/http'
import { PlugNameError } from '../usecases/set-plug/errors/plug-name-error'
import { SetPlugError } from '../usecases/set-plug/errors/set-plug-error'
import { SetPlugResponse } from '../usecases/set-plug/domain/set-plug-response'
import { GetPlugError } from '../usecases/set-plug/errors/get-plug-error'

type HttpRequest = {
  name: string
  timeAmount: number
  userId: string
}
type Model = Error | SetPlugResponse

export class SetPlugController extends Controller {
  constructor(private readonly setPlug: SetPlugUseCase) {
    super()
  }

  async perform(params: HttpRequest): Promise<HttpResponse<Model>> {
    const response = await this.setPlug.execute(params)
    if (response.isSuccess && response.body) {
      return success(response.body)
    } else if (
      !response.isSuccess &&
      response.error instanceof GetUserError
    ) {
      return badRequest(response.error)
    } else if (
      !response.isSuccess &&
      response.error instanceof SetPlugError
    ) {
      return badRequest(response.error)
    } else if (
      !response.isSuccess &&
      response.error instanceof PlugNameError
    ) {
      return badRequest(response.error)
    } else if (
      !response.isSuccess &&
      response.error instanceof GetPlugError
    ) {
      return badRequest(response.error)
    } else {
      return serverError(response.error)
    }
  }
}