import { Payment } from '../../database/entities/payments'

export interface PayRepository {
  createPayment(params: Payment): Promise<Payment | undefined>
}
