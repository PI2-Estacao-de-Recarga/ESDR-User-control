import { Repository } from '../../repository/port/user-repository'
import { CreateUserRequest } from './domain/create-user-request'
import { CreateUserError } from './errors/create-user-error'
import { CreateUserResponse } from './domain/create-user-response'
import { UseCase, UseCaseReponse } from '../domain/use-case'
import { Encryptor } from '../../adapters/bcrypt-adapter'
import { DifferentPasswords } from './errors/different-passwords-error'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { cpf } from 'cpf-cnpj-validator'
import { InvalidCpfError } from './errors/invalid-cpf'

export class CreateUserUseCase implements UseCase<CreateUserResponse> {
  constructor(
    private encryptor: Encryptor,
    private userRepository: Repository
  ) {}

  async execute(
    payload: CreateUserRequest
  ): Promise<UseCaseReponse<CreateUserResponse>> {
    try {
      if (!cpf.isValid(payload.cpf)) {
        return {
          isSuccess: false,
          error: new InvalidCpfError()
        }
      }

      if (payload.password !== payload.confirmPassword) {
        return {
          isSuccess: false,
          error: new DifferentPasswords()
        }
      }

      if (!cpf.isValid(payload.cpf)) {
        return {
          isSuccess: false,
          error: new InvalidCpf()
        }
      }

      const findUserByCpf = await this.userRepository.findOneByCpf(payload.cpf)

      const findUserByEmail = await this.userRepository.findOneByEmail(
        payload.email
      )
      if (findUserByCpf) {
        return {
          isSuccess: false,
          error: new UserAlreadyExistsError('CPF já cadastrado')
        }
      } else if (findUserByEmail) {
        return {
          isSuccess: false,
          error: new UserAlreadyExistsError('Email já utilizado')
        }
      }
      const hashedPassword = this.encryptor.encrypt(payload.password)

      const user = await this.userRepository.createUser({
        name: payload.name,
        password: hashedPassword,
        email: payload.email,
        cpf: payload.cpf
      })

      if (user) {
        return { isSuccess: true, body: { email: user.email, cpf: user.cpf } }
      } else {
        return {
          isSuccess: false,
          error: new CreateUserError()
        }
      }
    } catch (error) {
      console.log(error)
      return {
        isSuccess: false,
        error: new CreateUserError()
      }
    }
  }
}
