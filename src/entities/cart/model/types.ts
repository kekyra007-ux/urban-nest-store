/** Design reminder: cart entities should remain minimal, fast, and persistence-friendly. */

export interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  brand?: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}
