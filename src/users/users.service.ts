import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './users.entity'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from 'src/dto/signin-user'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userModel: Repository<User>,
    private jwtService: JwtService
  ) {}

  async findUser(id: number): Promise<User> {
    return this.userModel.findOneBy({ id })
  }

  async findAllUser(): Promise<User[]> {
    return this.userModel.find()
  }

  async deleteUser(email: string) {
    return await this.userModel.delete({ email })
  }

  async signIn(email: string, pass) {
    const user = await this.userModel.findOneBy({ email })

    if (!user)
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'User not present',
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      )

    const isMatch = await bcrypt.compare(pass, user.password)
    if (!isMatch) throw new UnauthorizedException()

    const payload = { email: user.email, name: user.name, id: user.id }
    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.userModel.findOneBy({ email: createUserDto.email })

    if (user)
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'User already present',
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds)
    await this.userModel.save({
      ...createUserDto,
      password: hashedPassword,
    })
    return 'User Registered Successfully'
  }
}
