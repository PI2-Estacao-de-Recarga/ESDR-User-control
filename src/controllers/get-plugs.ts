import { GetPlugsUseCase } from '../usecases/get-plugs/use-case'
import { Controller } from './domain/controller'
import { badRequest, HttpResponse, serverError, success } from './helpers/http'
import { Plug } from '../database/entities/plug'
import { GetPlugError } from '../usecases/set-plug/errors/get-plug-error'

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
    } else if (!response.isSuccess && response.error instanceof GetPlugError) {
      return badRequest(response.error)
    } else {
      return serverError(response.error)
    }
  }
}
