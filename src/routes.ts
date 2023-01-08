import { Router } from 'express'
import { adaptExpressRoute } from './adapters/express-router'
import { makeCreateUserController } from './factories/controllers/create-user'

const routes = Router()

routes.post('/create-user', adaptExpressRoute(makeCreateUserController()))

export default routes
