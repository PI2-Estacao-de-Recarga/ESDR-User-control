import { AuthenticationService } from '../../services/pixapi/authentication-service'
import { makeAxiosHttpClient } from './http-client'

export const makeAuthenticationServicePix = (): AuthenticationService => {
  return new AuthenticationService(makeAxiosHttpClient())
}
