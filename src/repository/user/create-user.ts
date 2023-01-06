import { dataSource } from '../../database/config'
import { User } from '../../database/entities/user'
import { Repository } from '../port/repository'

interface options {
  name: string
  email: string
  cpf: string
  password: string
}
class UserRepository implements Repository {
  private readonly userRepository
  constructor() {
    this.userRepository = dataSource.getRepository(User)
  }

  async createUser(params: options): Promise<User | undefined> {
    const { name, email, cpf, password } = params

    const user = this.userRepository.create({
      name,
      email: email !== '' ? email : undefined,
      cpf,
      password
    })

    await this.userRepository.save(user)
    return user
  }
}

export default UserRepository
