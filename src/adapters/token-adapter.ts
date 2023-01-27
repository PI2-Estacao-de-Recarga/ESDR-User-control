import { Secret, sign } from 'jsonwebtoken'

export interface Token {
  createToken(payload: object, secret: any, options?: object): string
}

export class CreateToken implements Token {
  createToken(payload: object, secretJwt: Secret, options?: object): string {
    const token = sign(payload, secretJwt, options)

    return token
  }
}
