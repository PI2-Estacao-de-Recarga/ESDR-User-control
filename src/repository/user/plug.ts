import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult'
import { dataSource } from '../../database/config'
import { Plug } from '../../database/entities/plug'
import { User } from '../../database/entities/user'
import { PlugsRepository } from '../port/plug-repository'

class PlugRepository implements PlugsRepository {
  private readonly plugRepository
  constructor() {
    this.plugRepository = dataSource.getRepository(Plug)
  }

  async updatePlug(name: string, newDateTimeActivated: Date, newDateTimeToDeactivate: Date, active: boolean, newUser: User): Promise<Plug | undefined> {
    const resultUpdate = await this.plugRepository.update({
      name: name,
    }, {
      dateTimeActivated: newDateTimeActivated,
      dateTimeToDeactivate: newDateTimeToDeactivate,
      inUse: active,
      user: newUser,
    })
 
    const result = await this.plugRepository.findOneBy({
        name
    })
    if (!result) {
        return undefined
      }
    return result
  }

  async findOneByName(name: string): Promise<Plug | undefined> {
    const plug = await this.plugRepository.findOneBy({
      name
    })
    if (!plug) {
      return undefined
    }
    return plug
  }
}

export default PlugRepository
