export interface IIngredient {
  _id?: string,
  type?: string,
  name?: string,
  image?: string,
  price?: number,
  calories?: number,
  carbohydrates?: number,
  fat?: number,
  proteins?: number,
  image_large?: string,
  image_mobile?: string,
  __v?: number
}

export interface IOrder {
  _id?: string,
  createdAt?: string,
  updatedAt?: string,
  number?: number,
  name?: string,
  status?: string,
  ingredients?: Array<IIngredient>
}

export interface IUser {
  name?: string,
  password?: string,
  email?: string
}
