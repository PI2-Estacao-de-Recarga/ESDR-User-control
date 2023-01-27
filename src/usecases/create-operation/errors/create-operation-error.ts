export class CreateOperationError extends Error {
    constructor() {
      super('Não foi possível executar a operação')
      this.name = 'CreateOperationError'
    }
  }
  