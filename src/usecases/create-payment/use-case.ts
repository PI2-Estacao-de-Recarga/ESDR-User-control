import { PayRepository } from '../../repository/port/payment-repository'
import { Repository } from '../../repository/port/user-repository'
import { CreatePix } from '../../services/create-pix'
import { UseCase, UseCaseReponse } from '../domain/use-case'
import { GetUserError } from '../get-user/errors/get-user-error'
import { CreateOrderPix, CreateOrderResponse } from './domain/create-payment'
import { PaymentError } from './errors/payment-error'

export class CreatePixUseCase implements UseCase<CreateOrderResponse> {
  constructor(
    private createPix: CreatePix<CreateOrderPix>,
    private paymentRepository: PayRepository,
    private userRepository: Repository
  ) {}

  async execute(
    payload: CreateOrderPix
  ): Promise<UseCaseReponse<CreateOrderResponse>> {
    try {
      const user = await this.userRepository.findOneById(payload.userId)
      if (!user) {
        return {
          isSuccess: false,
          error: new GetUserError()
        }
      }
      const responsePix = await this.createPix.paymentRequest(payload)

      if (!responsePix.success) {
        return {
          isSuccess: false,
          error: responsePix.error
        }
      }
      responsePix.info.status = 'PENDING'
      const userPayment = {
        qrCode: responsePix.externalResponse.image_base64,
        externalId: responsePix.externalResponse.txid,
        qrCodeText: responsePix.externalResponse.emv_payload,
        status: responsePix.info.status,
        totalAmount: responsePix.externalResponse.original_value,
        documentNumber: payload.document,
        user
      }
      const payment = await this.paymentRepository.createPayment(userPayment)
      if (payment) {
        return {
          isSuccess: true,
          body: {
            qrCode: responsePix.externalResponse.image_base64,
            qrCodeText: responsePix.externalResponse.emv_payload,
            status: payment.status,
            totalAmount: payment.totalAmount,
            documentNumber: payment.documentNumber
          }
        }
      } else {
        return { isSuccess: false, error: new PaymentError() }
      }
    } catch (error) {
      console.log(error)
      return { isSuccess: false, error: new PaymentError() }
    }
  }
}
