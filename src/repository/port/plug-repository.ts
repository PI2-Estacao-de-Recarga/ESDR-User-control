import { UpdateResult } from 'typeorm'
import { Plug } from '../../database/entities/plug'
import { User } from '../../database/entities/user'

export interface PlugsRepository {
  updatePlug(name: string, 
    newDateTimeActivated: Date,
    newDateTimeToDeactivate: Date,
    active: boolean,
    newUser: User): Promise<Plug | undefined>
  findOneByName(name: string): Promise<Plug | undefined>
  // findByUse(inUse: boolean): Promise<Plug[] | undefined>
  // findByUserId(userId: string): Promise<Plug[] | undefined>
}
