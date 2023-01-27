import { Encryptor } from '../../adapters/bcrypt-adapter'
import { Token } from '../../adapters/token-adapter'
import { Repository } from '../../repository/port/user-repository'
import { UseCase, UseCaseReponse } from '../domain/use-case'
import { DataUserLogin } from './domain/login-request'
import { UserLoginResponse } from './domain/login-response'
import { LoginEmailError } from './errors/login-email-error'
import { LoginPasswordError } from './errors/login-password-error'

export class LoginUseCase implements UseCase<UserLoginResponse> {
  constructor(
    private userRepository: Repository,
    private encryptor: Encryptor,
    private createToken: Token
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

    const timeExpire = '600s'
    const token = this.createToken.createToken(
      { userId: userFound.id, email: userFound.email, cpf: userFound.cpf },
      'QvyZPuDgia9HbF8UBShd6ljoLEzxcTkO',
      { expiresIn: timeExpire }
    )

    return {
      isSuccess: true,
      body: {
        token,
        email: userFound.email,
        name: userFound.name,
        cpf: userFound.cpf,
        expireIn: timeExpire
      }
    }
  }
}
