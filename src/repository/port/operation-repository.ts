import { Operation } from '../../database/entities/operation'

export interface OpRepository {
  createOperation(params: Operation): Promise<Operation | undefined>
}
