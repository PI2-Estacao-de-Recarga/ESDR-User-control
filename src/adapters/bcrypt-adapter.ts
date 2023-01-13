import { hashSync, compareSync } from 'bcrypt'

export interface Encryptor {
  encrypt(password: string): string
  compare(passwordLogin: string, passwordDB: string): boolean
}

export class BcryptAdapter implements Encryptor {
  compare(passwordLogin: string, passwordDB: string): boolean {
    return compareSync(passwordLogin, passwordDB)
  }

  encrypt(password: string) {
    return hashSync(password, 3)
  }
}
