import { Repository } from '../../repository/port/user-repository'
import { OpRepository } from '../../repository/port/operation-repository'
import { CreateOperationRequest } from './domain/create-operation-request'
import { CreateOperationError } from './errors/create-operation-error'
import { ErroDeTeste } from './errors/teste-error'
import { CreateOperationResponse } from './domain/create-operation-response'
import { UseCase, UseCaseReponse } from '../domain/use-case'
import { Encryptor } from '../../adapters/bcrypt-adapter'
import { GetUserError } from '../get-user/errors/get-user-error'

export class CreateOperationUseCase implements UseCase<CreateOperationResponse> {
  constructor(
    private operationRepository: OpRepository,
    private userRepository: Repository
  ) {}

  async execute(
    payload: CreateOperationRequest
  ): Promise<UseCaseReponse<CreateOperationResponse>> {
    try {

        const user = await this.userRepository.findOneById(payload.userId)
        if (!user) {
            return {
                isSuccess: false,
            error: new GetUserError()
            }
        }

      if (payload.operationType == 'USO') {
        console.log("UHUUUUUUUL")
        return {
          isSuccess: false,
          error: new ErroDeTeste()
        }
      }

      const userOperation = {
        operationType: payload.operationType,
        creditAmount: payload.creditAmount,
        user
      }

     const operation = await this.operationRepository.createOperation(userOperation)

      if (operation) {
        return { 
            isSuccess: true, 
            body: {
                operationType: operation.operationType,
                creditAmount: operation.creditAmount,
            }
        }
      } else {
        return {
          isSuccess: false,
          error: new CreateOperationError()
        }
      }
    } catch (error) {
      console.log(error)
      return {
        isSuccess: false,
        error: new CreateOperationError()
      }
    }
  }
}
