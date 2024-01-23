import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const [type, token] = req.headers.authorization.split(' ') ?? []
      if (!(token && type == 'Bearer')) throw new UnauthorizedException()

      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      })

      console.log(payload)
      req['id'] = payload.id
      next()
    } catch (error) {
      console.log(error)
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'UnAuthorized Request : Bad Token',
        },
        HttpStatus.UNAUTHORIZED
      )
    }
  }
}
