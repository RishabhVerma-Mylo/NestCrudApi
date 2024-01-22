import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './users.entity'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userModel: Repository<User>) {}

  async findAllUser(): Promise<User[]> {
    return this.userModel.find()
  }

  async findUser(email: string): Promise<User | undefined> {
    return this.userModel.findOneBy({ email })
  }

  async createUser(
    email: string,
    name: string,
    password: string
  ): Promise<User> {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return await this.userModel.save({ email, name, password: hashedPassword })
  }

  async deleteUser(email: string) {
    return await this.userModel.delete({ email })
  }
}
