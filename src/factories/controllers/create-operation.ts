import { CreateOperationController } from '../../controllers/create-operation'
import { makeCreateOperation } from '../usecases/create-operation'

export const makeCreateOperationController = () => {
  return new CreateOperationController(makeCreateOperation())
}
