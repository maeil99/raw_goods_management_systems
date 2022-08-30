export interface IProductProps {
  name: string;
  category: 'chicken' | 'meat' | 'seafood' | 'vegetable' | 'fruit';
  price: number;
  description: string;
  weight: number;
  deliveryMethod: string;
  deliveryPeriod: number;
  imageURI: File | null;
  createdAt: string;
}
