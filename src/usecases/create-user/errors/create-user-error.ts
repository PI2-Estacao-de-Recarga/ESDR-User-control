export class CreateUserError extends Error {
  constructor() {
    super('Não foi possível criar o usuário')
    this.name = 'CreateUserError'
  }
}
