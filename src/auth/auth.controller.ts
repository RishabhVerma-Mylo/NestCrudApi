import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto, signInDto } from '../dto/signin-user'
import { AuthGuard } from './auth.guard'
import { CreateClassDto } from 'src/dto/create-product'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signInUser(@Body() signInObject: signInDto) {
    return this.authService.signIn(signInObject.email, signInObject.password)
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async registerUser(
    @Res({ passthrough: true }) Res,
    @Body() createUserDto: CreateUserDto
  ) {
    return this.authService.register(Res, createUserDto)
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }
}
