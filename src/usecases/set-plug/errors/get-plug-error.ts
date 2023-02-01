export class GetPlugError extends Error {
    constructor() {
        super('Tomada não encontrada!')
        this.name = 'GetPlugError'
      }
    }
    