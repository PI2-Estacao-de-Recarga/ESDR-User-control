import { Repository } from '../../repository/port/repository'
import { CreateUserRequest } from './domain/create-user-request'
import { CreateUserError } from './errors/create-user-error'
import { CreateUserResponse } from './domain/create-user-response'
import { UseCase, UseCaseReponse } from '../domain/use-case'
import { Encryptor } from '../../adapters/bcrypt-adapter'

export class CreateUserUseCase implements UseCase<CreateUserResponse> {
  constructor(
    private encryptor: Encryptor,
    private userRepository: Repository
  ) {}

  async execute(
    payload: CreateUserRequest
  ): Promise<UseCaseReponse<CreateUserResponse>> {
    try {
      const hashedPassword = this.encryptor.encrypt(payload.password)

      const user = await this.userRepository.createUser({
        name: payload.name,
        password: hashedPassword,
        email: payload.email,
        cpf: payload.cpf
      })

      if (user) {
        return { isSuccess: true, data: { email: user.email, cpf: user.cpf } }
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
