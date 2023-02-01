export class PlugNameError extends Error {
  constructor() {
      super('Não há tomadas com esse nome!')
      this.name = 'PlugNameError'
    }
  }
  