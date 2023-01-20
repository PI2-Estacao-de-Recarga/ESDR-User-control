export interface UseCaseReponse<T> {
  isSuccess: boolean
  body?: T
  error?: Error
}

export interface UseCase<T> {
  execute(body: any): Promise<UseCaseReponse<T>>
}
