import { OrderPixServiceResponse } from "../../controllers/helpers/order-pix-service-response";
import { AuthenticationPix } from "../authentication-pix";
import { HttpService } from "../http-service";
import { ValidationError } from "./errors/validation-error";

interface CreateOrderPix {
    pixKey: string;
    value: number;
    name: string;
    document: string;
}

interface CreateOrderPixResponse {
    qrCode: string;
    qrCodeText: string;
    status: string;
    externalId?: string;
    totalAmount: number;
}

interface CreatePaymentApiRequest
    {
        txid?: string;
        integration_id?: string,
        pix_key: string;
        original_value: number,
        payer_question?: string;
        additional_info?: 
          {
            key?: string;
            value: string;
          }
        payer?: {
          name: string;
          document: string;
        },
        reject_unknown_payer?: true
}


interface CreatePaymentApiResponse{
        id: string;
        qrcode_type: string;
        status: string;
        txid: string;
        integration_id: number,
        pix_key: {
          id: string;
          key: string;
          key_type: string;
        },
        value: number,
        withdraw?: any,
        additional_info: string;
        emv_payload: string; // Payload do QR Code, utilizado para a função copia e cola
        image_base64: string; // Imagem do QR Code no formato PNG encodado em base64
        created_at: string; // Data e hora da criação do QR Code
        updated_at: string;  // Data e hora da última atualização do QR Code
}


class CreatePixService {
    constructor(
        private axiosClient: HttpService,
        private authenticationService: AuthenticationPix
    ){}
    
    private requestBody(payload: CreateOrderPix): CreatePaymentApiRequest{
        return {
            pix_key: payload.pixKey,
            original_value: payload.value,
            payer: {
                name: payload.name,
                document: payload.document,
            }
        }
    }
    async paymentRequest(payload: CreateOrderPix): Promise<CreatePaymentApiResponse>{

        const { token } = await this.authenticationService.authentication();

        const requestOrder = this.requestBody(payload)

        const response = await this.axiosClient.post<CreatePaymentApiRequest, CreatePaymentApiResponse
        >({
            url:"https://api-sandbox.transfeera.com/pix/qrcode/static",
            body: requestOrder,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              },
        });
        if(response.statusCode !== 200 && response.statusCode !== 201){
            Object.assign(response, {
                error: new ValidationError(body),
                externalResquest: payload,
                externalResponse: body,
            });
        }else{
            Object.assign(response, {
                success: true, 
                externalRequest: payload,
                externalResponse: response.body,
                info: {
                    image_base64: response.body.image_base64,
                    emv_payload: response.body.emv_payload,
                    status: response.body.status,
                    txid: response.body.txid,
                    value: payload.value
                }
            })
        }
        return response.body

    }
}