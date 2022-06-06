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

export interface CreateProductDTO extends Omit<product, 'id' | 'category'> {
  categoryId: number;
}

export interface UpdateproductDTO extends Partial<CreateProductDTO>  {
}
