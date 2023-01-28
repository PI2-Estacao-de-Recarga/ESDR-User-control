export class BalanceError extends Error {
    constructor() {
        super('Saldo de créditos insuficiente')
        this.name = 'BalanceError'
      }
    }

export class UpdateBalanceError extends Error {
    constructor() {
        super('Erro ao atualizar saldo de créditos do usuário')
        this.name = 'BalanceError'
        }
    }
