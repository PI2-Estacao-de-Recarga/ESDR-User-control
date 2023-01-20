import { Payment } from '../../database/entities/payments'

export interface Repository {
  createPayment(params:Payment): Promise<Payment | undefined>
}
