import { Repository } from '../../repository/port/user-repository'
import { OpRepository } from '../../repository/port/operation-repository'
import { CreateOperationRequest } from './domain/create-operation-request'
import { CreateOperationError, MissingPayIdError } from './errors/create-operation-error'
import { OperationTypeError } from './errors/operation-type-error'
import { BalanceError, UpdateBalanceError } from './errors/balance-error'
import { CreateOperationResponse } from './domain/create-operation-response'
import { UseCase, UseCaseReponse } from '../domain/use-case'
import { GetUserError } from '../get-user/errors/get-user-error'
import { OperationTypeEnum } from '../../database/entities/enums/operationType'
import { PayRepository } from '../../repository/port/payment-repository'
import { GetPaymentError } from './errors/payment-error'

export class CreateOperationUseCase implements UseCase<CreateOperationResponse> {
  constructor(
    private operationRepository: OpRepository,
    private userRepository: Repository,
    private paymentRepository: PayRepository
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

      if (payload.operationType !== OperationTypeEnum.USO && payload.operationType !== OperationTypeEnum.COMPRA) {
        return {
          isSuccess: false,
          error: new OperationTypeError()
        }
      }


      let newBalance = 0

      if (payload.operationType === OperationTypeEnum.COMPRA) {
        if (!payload.paymentId) {
          return {
            isSuccess: false,
            error: new MissingPayIdError()
          }
        }

        const pay = await this.paymentRepository.findOneById(payload.paymentId)
        if (!pay) {
            return {
                isSuccess: false,
                error: new GetPaymentError()
            }
        }

        payload.creditAmount = pay.totalAmount
        newBalance = user.balance + payload.creditAmount
      } else { 
        newBalance = user.balance - payload.creditAmount

        if (payload.creditAmount > user.balance) {
        return {
          isSuccess: false,
          error: new BalanceError()
        }
      }
    }
      
      const userOperation = {
        operationType: payload.operationType,
        creditAmount: payload.creditAmount,
        user
      }
      
      const operation = await this.operationRepository.createOperation(userOperation)

      if (payload.operationType === OperationTypeEnum.USO) {
        newBalance = user.balance - payload.creditAmount
      } else {
        newBalance = user.balance + payload.creditAmount
      }
      
      if (operation) {
        const response = await this.userRepository.updateBalance(newBalance, payload.userId)
        if (!response) {
            return {
                isSuccess: false,
                error: new UpdateBalanceError()
            }
        }
        return { 
            isSuccess: true, 
            body: {
                operationType: operation.operationType,
                creditAmount: operation.creditAmount,
                currentBalance: newBalance,
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
