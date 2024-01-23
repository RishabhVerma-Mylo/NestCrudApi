import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto, signInDto } from 'src/dto/signin-user'
import { ID } from 'src/decorator/id.decorator'
import { User } from './users.entity'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAllUser() {
    return this.userService.findAllUser()
  }

  @Delete('delete')
  async deleteUser(@Body('email') email: string) {
    return this.userService.deleteUser(email)
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signInUser(@Body() signInObject: signInDto) {
    return this.userService.signIn(signInObject.email, signInObject.password)
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto)
  }

  @Get('profile')
  getProfile(@ID() id: number): Promise<User> {
    return this.userService.findUser(id)
  }
}
