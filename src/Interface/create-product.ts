export interface CreateClassDto {
  name: string
  desc: string
  price: number
}

export interface ProductType extends CreateClassDto {
  id: string
}
