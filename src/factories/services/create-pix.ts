import { CreatePixService } from '../../services/pixapi/create-pix'
import { makeAuthenticationServicePix } from './authentication-service'
import { makeAxiosHttpClient } from './http-client'

export const makeCreatePix = (): CreatePixService => {
  return new CreatePixService(
    makeAxiosHttpClient(),
    makeAuthenticationServicePix()
  )
}
