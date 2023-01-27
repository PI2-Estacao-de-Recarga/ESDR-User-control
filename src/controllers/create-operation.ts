import { CreateOperationError } from '../usecases/create-operation/errors/create-operation-error'
import { CreateOperationUseCase } from '../usecases/create-operation/use-case'
import { Controller } from './domain/controller'
import { badRequest, HttpResponse, serverError, success } from './helpers/http'

type HttpRequest = {
  operationType: string
  creditAmount: number
  userId: string
}
type Model =
  | Error
  | {
        operationType: string
        creditAmount: number
    }

export class CreateOperationController extends Controller {
  constructor(private readonly createOperation: CreateOperationUseCase) {
    super()
  }

  async perform(params: HttpRequest): Promise<HttpResponse<Model>> {
    const response = await this.createOperation.execute(params)
    if (response.isSuccess && response.body) {
      return success(response.body)
    } else if (
      !response.isSuccess &&
      response.error instanceof CreateOperationError
    ) {
      return badRequest(response.error)
    } else {
      return serverError(response.error)
    }
  }
}
