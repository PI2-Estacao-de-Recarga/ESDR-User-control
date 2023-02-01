export class InvalidCpfError extends Error {
  constructor() {
    super('CPF invalido')
    this.name = 'InvalidCpf'
  }
}
