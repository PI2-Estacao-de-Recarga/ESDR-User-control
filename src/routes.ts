import { Router } from 'express'
import { adaptExpressRoute } from './adapters/express-router'
import { makeCreatePaymentController } from './factories/controllers/create-payment'
import { makeCreateOperationController } from './factories/controllers/create-operation'
import { makeCreateUserController } from './factories/controllers/create-user'
import { makeGetUserController } from './factories/controllers/get-user'
import { makeLoginController } from './factories/controllers/login'
import { auth } from './middlewares/auth'

const routes = Router()

routes.post('/create-user', adaptExpressRoute(makeCreateUserController()))
routes.post('/login', adaptExpressRoute(makeLoginController()))
routes.get('/get-user', auth, adaptExpressRoute(makeGetUserController()))
routes.post(
  '/create-payment',
  auth,
  adaptExpressRoute(makeCreatePaymentController())
)
routes.post(
  '/create-operation',
  auth,
  adaptExpressRoute(makeCreateOperationController())
)

export default routes
