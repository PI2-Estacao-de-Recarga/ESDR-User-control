interface OrderPixServiceResponse<T> {
  success: boolean
  error?: Error
  info?: T
  externalResponse?: any
  externalRequest?: any
}

export { OrderPixServiceResponse }
