export class CreateClassDto {
  name: string
  desc: string
  price: number
}

export class ProductType extends CreateClassDto {
  id: string
}
