export class CreateOperationError extends Error {
    constructor() {
      super('Não foi possível executar a operação')
      this.name = 'CreateOperationError'
    }
  }

  export class MissingPayIdError extends Error {
    constructor() {
      super('Não foi possível executar a operação. Para COMPRA, é necessário informar o id do pagamento')
      this.name = 'MissingPayIdError'
    }
  }
  