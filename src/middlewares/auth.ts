import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
interface PayLoad {
  userId: string
}
const secret = 'QvyZPuDgia9HbF8UBShd6ljoLEzxcTkO'

export function auth(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization
  if (!authToken) {
    return res.status(401).end()
  }
  const [, token] = authToken.split(' ')
  try {
    const { userId } = verify(token, secret) as PayLoad
    return next({ userId })
  } catch (error) {
    return res.status(401).end()
  }
}
