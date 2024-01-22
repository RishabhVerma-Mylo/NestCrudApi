import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { Response } from 'express'
import { CreateUserDto } from 'src/dto/signin-user'

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, pass) {
    const user = await this.userService.findUser(email)

    if (user?.password != pass) throw new UnauthorizedException()

    const payload = { email: user.email, name: user.name }
    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }

  async register(res: Response, createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto
    const user = await this.userService.findUser(email)

    if (user)
      return res.status(200).json({
        message: 'User is already present',
      })
    return await this.userService.createUser(email, name, password)
  }
}
