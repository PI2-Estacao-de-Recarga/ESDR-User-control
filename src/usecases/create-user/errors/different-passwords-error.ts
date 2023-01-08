export class DifferentPasswords extends Error {
  constructor() {
    super('As senhas se diferem')
    this.name = 'DifferentPasswords'
  }
}
