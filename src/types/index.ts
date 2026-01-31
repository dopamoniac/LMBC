// Product Types
export interface Product {
  id: number;
  name: string;
  aura: string;
  specs: Record<string, string>;
  price: number;
  image: string;
}

export interface ProductFamily {
  id: string;
  name: string;
  description: string;
  defaultProductId: number;
  productIds: number[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface SizeGuideData {
  age: string;
  height: string;
  size: string;
}
