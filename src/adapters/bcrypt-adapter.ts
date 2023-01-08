import { hashSync } from 'bcrypt'

export interface Encryptor {
  encrypt(password: string): string
}

export class BcryptAdapter implements Encryptor {
  encrypt(password: string) {
    return hashSync(password, 3)
  }
}
