export class LoginEmailError extends Error {
    constructor() {
      super('email nao existente no banco!')
      this.name = 'LoginEmailError'
    }
}