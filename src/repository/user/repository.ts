import { UpdateResult } from 'typeorm'
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

  // async findOneById(userId: string): Promise<User | undefined> {
  //   const user = await this.userRepository.findOneBy({
  //     id: userId
  //   })
  //   if (!user) {
  //     return undefined
  //   }
  //   return user
  // }

  async findOneById(userId: string): Promise<User | undefined> {
    const user = await this.userRepository.createQueryBuilder("user")
    .leftJoinAndSelect("user.operations", "operations")
    .where("user.id = :id", { id: userId })
    .getOne()

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

  async updateBalance(newBalance: number, userId: string): Promise<UpdateResult | undefined> {

    const result = await this.userRepository.update({
      id: userId,
    }, {
      balance: newBalance,
    })
 
    // await this.userRepository.save(user)
    return result
  }

}

export default UserRepository
