import { Payment } from '../../database/entities/payments'

export interface PayRepository {
  createPayment(params: Payment): Promise<Payment | undefined>
  findOneById(paymentId: string): Promise<Payment | undefined>
}
