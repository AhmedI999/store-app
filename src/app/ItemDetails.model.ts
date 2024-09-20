export interface ItemDetails {
  imagePath: string;
  imageAlt: string;
  title: string;
  price: number;
  quantity: number;
}

export interface UserDetails {
  id: number;
  basket: ItemDetails[];
}
