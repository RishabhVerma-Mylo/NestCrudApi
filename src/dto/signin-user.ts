export class signInDto {
  email: string
  password: string
}

export class CreateUserDto extends signInDto {
  name: string
  city: string
  company: string
  status: string
}
