import { PlugNameEnum } from '../enums/plugName'
import { User } from '../user'

export type Plug = {
  id?: string

  name: PlugNameEnum

  inUse: boolean

  dateTimeActivated: Date

  dateTimeToDeactivate: Date

  createdAt?: Date

  updatedAt?: Date

  user?: User
}
