export class GetPlugsrError extends Error {
    constructor() {
      super('Nenhuma tomada com esses requisitos foi encontrada')
      this.name = 'GetPlugsrError'
    }
  }