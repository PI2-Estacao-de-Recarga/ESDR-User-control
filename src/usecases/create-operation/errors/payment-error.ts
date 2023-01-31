export class GetPaymentError extends Error {
    constructor() {
      super('Pagamento referente não encontrado')
      this.name = 'GetPaymentError'
    }
  }