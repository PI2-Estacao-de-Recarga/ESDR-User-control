export class OperationTypeError extends Error {
  constructor() {
      super('Tipo de operação inválido!')
      this.name = 'OperationTypeError'
    }
  }
  