interface AuthenticationResponse {
  success: boolean
  error?: Error
  externalResponse?: object
  externalRequest?: object
  expires_in?: number
  token?: string
}

export { AuthenticationResponse }
