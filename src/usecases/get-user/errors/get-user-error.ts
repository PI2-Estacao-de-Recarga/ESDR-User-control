export class GetUserError extends Error {
  constructor() {
    super('Usuário não encontrado')
    this.name = 'GetUserError'
  }
}
