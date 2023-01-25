import { OrderPixServiceResponse } from '../../controllers/helpers/order-pix-service-response'
import {
  CreateOrderPix,
  CreateOrderResponse
} from '../../usecases/create-payment/domain/create-payment'
import { AuthenticationPix } from '../authentication-pix'
import { CreatePix } from '../create-pix'
import { HttpService } from '../http-service'
import { ValidationError } from './errors/validation-error'

interface CreatePaymentApiRequest {
  txid?: string
  integration_id?: string
  pix_key: string
  original_value: number
  payer_question?: string
  additional_info?: {
    key?: string
    value: string
  }
  payer?: {
    name: string
    document: string
  }
  reject_unknown_payer?: true
}

interface CreatePaymentApiResponse {
  id: string
  qrcode_type: string
  status: string
  txid: string
  integration_id: number
  pix_key: {
    id: string
    key: string
    key_type: string
  }
  value: number
  withdraw?: any
  additional_info: string
  emv_payload: string // Payload do QR Code, utilizado para a função copia e cola
  image_base64: string // Imagem do QR Code no formato PNG encodado em base64
  created_at: string // Data e hora da criação do QR Code
  updated_at: string // Data e hora da última atualização do QR Code
}

class CreatePixService implements CreatePix<CreateOrderPix> {
  constructor(
    private axiosClient: HttpService,
    private authenticationService: AuthenticationPix
  ) {}

  private requestBody(payload: CreateOrderPix): CreatePaymentApiRequest {
    return {
      pix_key: payload.pixKey,
      original_value: payload.value,
      payer: {
        name: payload.name,
        document: payload.document
      }
    }
  }

  async paymentRequest(
    payload: CreateOrderPix
  ): Promise<OrderPixServiceResponse<CreateOrderResponse>> {
    const response = {
      success: false
    }
    const { token } = await this.authenticationService.authentication()

    const requestOrder = this.requestBody(payload)
    const { statusCode, body } = await this.axiosClient.post<
      CreatePaymentApiRequest,
      CreatePaymentApiResponse
    >({
      url: 'https://api-sandbox.transfeera.com/pix/qrcode/collection/immediate',
      body: requestOrder,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    if (statusCode !== 200 && statusCode !== 201) {
      Object.assign(response, {
        error: new ValidationError(body),
        externalResquest: payload,
        externalResponse: body
      })
    } else {
      Object.assign(response, {
        success: true,
        externalRequest: payload,
        externalResponse: body,
        info: {
          qrCode: body.image_base64,
          qrCodeText: body.emv_payload,
          status: body.status,
          externalId: body.txid,
          totalAmount: payload.value
        }
      })
    }
    return response
  }
}

export { CreatePixService }
