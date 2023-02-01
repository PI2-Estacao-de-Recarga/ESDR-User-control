export class InvalidCpf extends Error {
    constructor() {
      super('CPF inválido!')
      this.name = 'InvalidCpf'
    }
  }
  