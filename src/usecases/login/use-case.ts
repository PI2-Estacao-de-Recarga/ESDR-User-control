import { Encryptor } from '../../adapters/bcrypt-adapter'
import { Repository } from '../../repository/port/user-repository'
import { UseCase, UseCaseReponse } from '../domain/use-case'
import { DataUserLogin } from './domain/login-request'
import { UserLoginResponse } from './domain/login-response'
import { LoginEmailError } from './errors/login-email-error'
import { LoginPasswordError } from './errors/login-password-error'

export class LoginUseCase implements UseCase<UserLoginResponse> {
  constructor(
    private userRepository: Repository,
    private encryptor: Encryptor
  ) {}

  async execute(
    userData: DataUserLogin
  ): Promise<UseCaseReponse<UserLoginResponse>> {
    let userFound = null
    userFound = await this.userRepository.findToLogin(userData.email)

    if (!userFound) {
      return { isSuccess: false, error: new LoginEmailError() }
    }

    const checkPassword = this.encryptor.compare(
      userData.password,
      userFound.password
    )

    if (!checkPassword) {
      return { isSuccess: false, error: new LoginPasswordError() }
    }

    return {
      isSuccess: true,
      body: {
        email: userFound.email,
        name: userFound.name,
        cpf: userFound.cpf
      }
    }
  }
}
