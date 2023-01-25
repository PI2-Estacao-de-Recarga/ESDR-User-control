import { CreatePixUseCase } from '../usecases/create-payment/use-case'
import { GetUserError } from '../usecases/get-user/errors/get-user-error'
import { Controller } from './domain/controller'
import { badRequest, HttpResponse, serverError, success } from './helpers/http'

type HttpRequest = {
  pixKey: string
  value: number
  name: string
  document: string
  userId: string
}
type Model =
  | Error
  | {
      qrCode: string
      qrCodeText: string
      status: string
      totalAmount: number
      documentNumber: string
    }

export class CreatePaymentController extends Controller {
  constructor(private readonly createPayment: CreatePixUseCase) {
    super()
  }

  async perform(params: HttpRequest): Promise<HttpResponse<Model>> {
    const response = await this.createPayment.execute(params)
    if (response.isSuccess && response.body) {
      return success(response.body)
    } else if (!response.isSuccess && response.error instanceof GetUserError) {
      return badRequest(response.error)
    } else {
      return serverError(response.error)
    }
  }
}
