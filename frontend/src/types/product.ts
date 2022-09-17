export type Product = {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: string;
  countInStock: number;
  rating: number;
  numReviews: number;
};

export type ProductInCart = Product & {
  quantity: number;
};
