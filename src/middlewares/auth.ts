import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
interface PayLoad {
  userId: string
}
const secret = 'QvyZPuDgia9HbF8UBShd6ljoLEzxcTkO'

export function auth(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization
  if (!authToken) {
    return res.status(401).end('Token não informado')
  }
  const [, token] = authToken.split(' ')
  try {
    verify(token, secret) as PayLoad

    return next()
  } catch (error) {
    return res.status(401).end('Token invalido')
  }
}
