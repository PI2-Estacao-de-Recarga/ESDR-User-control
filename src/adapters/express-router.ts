import { RequestHandler } from 'express'
import { Controller } from '../controllers/domain/controller'

type Adapter = (controller: Controller) => RequestHandler

export const adaptExpressRoute: Adapter = (controller) => async (req, res) => {
  const { statusCode, body } = await controller.handle({
    ...req.body,
    ...req.query,
    ...req.params
  })
  const json = [200, 204].includes(statusCode) ? body : { error: body.message }
  res.status(statusCode).json(json)
}
