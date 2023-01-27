import { dataSource } from '../../database/config'
import { Payment } from '../../database/entities/payments'
import { PayRepository } from '../port/payment-repository'

class PaymentRepository implements PayRepository {
  private readonly paymentRepository
  constructor() {
    this.paymentRepository = dataSource.getRepository(Payment)
  }

  async createPayment(params: Payment): Promise<Payment | undefined> {
    const payment = await this.paymentRepository.save(params)

    return payment
  }
}

export default PaymentRepository
