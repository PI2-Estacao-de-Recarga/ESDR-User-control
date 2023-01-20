import { ForbiddenError, ServerError, UnauthorizedError } from '../errors/http'

export type HttpResponse<T = any> = {
  statusCode: number
  body: T
}

export const success = <T = any>(body: T): HttpResponse<T> => ({
  statusCode: 200,
  body
})

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  body: error
})

export const unauthorized = (): HttpResponse<Error> => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const forbidden = (): HttpResponse<Error> => ({
  statusCode: 403,
  body: new ForbiddenError()
})

export const serverError = (error: unknown): HttpResponse<Error> => ({
  statusCode: 500,
  body: new ServerError(error instanceof Error ? error : undefined)
})
