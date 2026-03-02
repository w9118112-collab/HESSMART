export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  images?: string[];
  description?: string;
  detailedDescription?: string;
}
