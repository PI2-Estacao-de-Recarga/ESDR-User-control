export interface UseCaseReponse<T> {
  isSuccess: boolean
  data?: T
  body?: T
  error?: Error
}

export interface UseCase<T> {
  execute(body: any): Promise<UseCaseReponse<T>>
}
