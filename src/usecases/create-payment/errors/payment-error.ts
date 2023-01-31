export class PaymentError extends Error {
  constructor() {
    super('Erro ao fazer um pagamento')
    this.name = 'PaymentError'
  }
}
