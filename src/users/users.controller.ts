import { Body, Controller, Delete, Get } from '@nestjs/common'
import { UsersService } from './users.service'

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
}
