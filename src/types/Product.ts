export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
  discountPercentage: number;
  rating: number;
  stock: number;
  shippingInformation: string;
  availabilityStatus: string;
  date: Date;

}

export type Category = string;