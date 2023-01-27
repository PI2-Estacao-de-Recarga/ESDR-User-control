export class ErroDeTeste extends Error {
    constructor() {
      super('Erro de teste, entao tá indo onde eu quero')
      this.name = 'ErroDeTeste'
    }
  }
  