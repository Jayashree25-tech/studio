
export interface Book {
  id: string;
  title: string;
  author: string;
  rentPrice: number;
  buyPrice: number;
  coverImage: string;
  data_ai_hint?: string;
  genre: string;
  description: string;
}

export interface CartItem extends Book {
  purchaseType: 'rent' | 'buy';
  price: number;
  rentalDays?: number;
}
