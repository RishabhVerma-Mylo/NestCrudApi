import { IsEmail, IsEnum, IsStrongPassword, Length } from 'class-validator'

export class signInDto {
  @IsEmail()
  email: string

  // @IsStrongPassword()
  password: string
}

export class CreateUserDto extends signInDto {
  @Length(5, 10)
  name: string
  city: string

  company: string

  @IsEnum({ '0': '0', '1': '1' })
  status: string
}
