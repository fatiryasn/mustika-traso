export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  thumbnail: string | null;
  created_at: string;
  updated_at: string;
  sub_products: SubProductDetail[];
}

export interface GetProductsParams {
  search?: string;
  sort?: { column: string; ascending: boolean };
  page?: number;
  limit?: number;
}

export interface SubProductDetail {
  id: string;
  name: string;
  size: string | null;
  weight: string | null;
  price: number | null;
  count: number | null;
}

export interface ProductDetail {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  thumbnail: string | null;
  created_at: string;
  updated_at: string;
  sub_products: SubProductDetail[];
}

export interface UpdateProductWithSubProductsParams {
  id: string;
  slug: string; 
  name?: string;
  description?: string;
  thumbnail?: string;
  sub_products: {
    id?: string;
    name: string;
    size?: string;
    weight?: string;
    price?: number;
  }[];
}