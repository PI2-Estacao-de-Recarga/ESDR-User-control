export class SetPlugError extends Error {
    constructor() {
      super('Não foi possível ativar/desativar a tomada')
      this.name = 'SetPlugError'
    }
  }
