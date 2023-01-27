import { HttpResponse } from '../controllers/helpers/http'

export interface Middleware {
  handle: (httpRequest: any) => Promise<HttpResponse>
}
