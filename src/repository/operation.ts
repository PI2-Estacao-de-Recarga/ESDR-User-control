import { dataSource } from '../database/config'
import { Operation } from '../database/entities/operation'
import { OpRepository } from './port/operation-repository'

class OperationRepository implements OpRepository {
  private readonly operationRepository
  constructor() {
    this.operationRepository = dataSource.getRepository(Operation)
  }

  async createOperation(params: Operation): Promise<Operation | undefined> {
    const operation = await this.operationRepository.save(params)

    return operation
  }
}

export default OperationRepository
