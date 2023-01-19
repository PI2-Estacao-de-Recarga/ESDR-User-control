export class LoginPasswordError extends Error {
    constructor() {
      super('senha incorreta no banco!')
      this.name = 'LoginPasswordError'
    }
  }