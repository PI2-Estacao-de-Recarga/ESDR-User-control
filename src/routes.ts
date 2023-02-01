import { Router } from 'express'
import { adaptExpressRoute } from './adapters/express-router'
import { makeCreatePaymentController } from './factories/controllers/create-payment'
import { makeCreateOperationController } from './factories/controllers/create-operation'
import { makeCreateUserController } from './factories/controllers/create-user'
import { makeGetUserController } from './factories/controllers/get-user'
import { makeGetPlugsController } from './factories/controllers/get-plugs'
import { makeLoginController } from './factories/controllers/login'
import { makeSetPlugController } from './factories/controllers/set-plug'
import { auth } from './middlewares/auth'

const routes = Router()

routes.post('/create-user', adaptExpressRoute(makeCreateUserController()))
routes.post('/login', adaptExpressRoute(makeLoginController()))
routes.get('/get-user', auth, adaptExpressRoute(makeGetUserController()))
routes.get('/get-plugs', auth, adaptExpressRoute(makeGetPlugsController()))
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
routes.post(
  '/set-plug',
  auth,
  adaptExpressRoute(makeSetPlugController())
)

export default routes
