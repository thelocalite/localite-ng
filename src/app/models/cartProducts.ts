export interface CartProduct {
  id: number;
  name: string;
  description: string;
  quantity?: number;
  price: number;
  imgUrl: string;
}