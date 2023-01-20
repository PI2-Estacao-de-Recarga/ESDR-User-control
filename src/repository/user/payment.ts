import { dataSource } from '../../database/config'
import { Payment } from '../../database/entities/payments'
import { Repository } from '../port/payment-repository'

class PaymentRepository implements Repository {
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