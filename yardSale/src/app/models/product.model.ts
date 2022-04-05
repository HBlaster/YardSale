export interface category {
  id: string;
  name: string;
}

export interface product {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: category;
}
