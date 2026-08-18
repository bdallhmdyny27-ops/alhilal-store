export type ProductCategory = 'all' | 'tops' | 'shoes' | 'shorts' | 'kits' | 'accessories';
export type GenderFilter = 'all' | 'men' | 'women' | 'kids';

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isBestseller?: boolean;
  image: string;
  galleryImages: string[];
  description: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  isCustomizable?: boolean; // Can print name and number
  gender?: 'men' | 'women' | 'unisex' | 'kids';
  inStock: boolean;
  details: string[];
  reviews: Review[];
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  selectedSize: string;
  selectedColor: string;
  selectedGender?: 'men' | 'women' | 'kids';
  quantity: number;
  customName?: string;
  customNumber?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: 'received' | 'processing' | 'shipped' | 'delivered';
  customerInfo: {
    fullName: string;
    phone: string;
    city: string;
    address: string;
    paymentMethod: string;
  };
  trackingCode: string;
}
