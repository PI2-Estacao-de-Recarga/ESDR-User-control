import { AuthenticationResponse } from '../../controllers/helpers/authentication-service'
import { AuthenticationPix } from '../authentication-pix'
import { HttpService } from '../http-service'
import { ValidationError } from './errors/validation-error'

interface Token {
  grant_type: string
  client_secret: string
  client_id: string
}

interface TokenResponse {
  access_token: string
  expires_in: number
}

class AuthenticationService implements AuthenticationPix {
  constructor(private axiosClient: HttpService) {}

  async authentication(): Promise<AuthenticationResponse> {
    const response = {
      success: false
    }
    const tokenRequest: Token = {
      grant_type: 'client_credentials',
      client_secret:
        'eca1023c-6308-4cb4-96f7-cdb82a445271591fbd17-f2e8-4957-90b3-d4aa0027aa46',
      client_id: 'ea3a4d3d-c4c6-466d-9acc-c6c78b798e1b'
    }

    const { statusCode, body } = await this.axiosClient.post<
      Token,
      TokenResponse
    >({
      url: 'https://login-api-sandbox.transfeera.com',
      body: tokenRequest,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (statusCode !== 200 && statusCode !== 201) {
      Object.assign(response, {
        error: new ValidationError('Não autenticado'),
        externalResquest: tokenRequest,
        externalResponse: body
      })
    } else {
      Object.assign(response, {
        success: true,
        externalRequest: tokenRequest,
        token: body.access_token,
        externalResponse: '',
        expires_in: body.expires_in
      })
    }
    return response
  }
}

export { AuthenticationService }
