import { dataSource } from '../../database/config'
import { User } from '../../database/entities/user'
import { Repository } from '../port/user-repository'

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

  async findOneByCpf(cpf: string): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({
      cpf
    })
    if (!user) {
      return undefined
    }
    return user
  }

  async findToLogin(email: string): Promise<User> {
    const userPassword = await this.userRepository.find({
      where: {
        email
      },
      select: ['password', 'email', 'name', 'id', 'cpf']
    })
    return userPassword[0]
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({
      email
    })
    if (!user) {
      return undefined
    }
    return user
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
