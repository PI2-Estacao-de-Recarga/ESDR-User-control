import { Router } from 'express'
import { adaptExpressRoute } from './adapters/express-router'
import { makeCreateUserController } from './factories/controllers/create-user'
import { makeGetUserController } from './factories/controllers/get-user'
import { makeLoginController } from './factories/controllers/login'

const routes = Router()

routes.post('/create-user', adaptExpressRoute(makeCreateUserController()))
routes.post('/login', adaptExpressRoute(makeLoginController()))
routes.get('/get-user', adaptExpressRoute(makeGetUserController()))

export default routes
