interface HttpRequest<B> {
  url: string
  body?: B
  headers?: Record<string, any>
  params?: Record<string, any>
}

export { HttpRequest }
