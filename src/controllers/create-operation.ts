import { GetUserError } from '../usecases/get-user/errors/get-user-error'
import { CreateOperationUseCase } from '../usecases/create-operation/use-case'
import { Controller } from './domain/controller'
import { badRequest, HttpResponse, serverError, success } from './helpers/http'
import { OperationTypeError } from '../usecases/create-operation/errors/operation-type-error'
import { BalanceError, UpdateBalanceError } from '../usecases/create-operation/errors/balance-error'
import { CreateOperationError, MissingPayIdError } from '../usecases/create-operation/errors/create-operation-error'
import { GetPaymentError } from '../usecases/create-operation/errors/payment-error'

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
      response.error instanceof GetUserError
    ) {
      return badRequest(response.error)
    } else if (
      !response.isSuccess &&
      response.error instanceof OperationTypeError
    ) {
      return badRequest(response.error)
    } else if (
      !response.isSuccess &&
      response.error instanceof MissingPayIdError
    ) {
      return badRequest(response.error)
    } else if (
      !response.isSuccess &&
      response.error instanceof GetPaymentError
    ) {
      return badRequest(response.error)
    } else if (
      !response.isSuccess &&
      response.error instanceof CreateOperationError
    ) {
      return badRequest(response.error)
    } else if (
      !response.isSuccess &&
      response.error instanceof BalanceError
    ) {
      return badRequest(response.error)
    } else if (
      !response.isSuccess &&
      response.error instanceof UpdateBalanceError
    ) {
      return badRequest(response.error)
    } else {
      return serverError(response.error)
    }
  }
}
