import { AxiosService } from '../../services/axios-service'

export const makeAxiosHttpClient = (): AxiosService => {
  return new AxiosService()
}
