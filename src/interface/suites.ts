export interface Suite {
  id: string;
  name: string;
  description: string | null;
  max_guests: number;
  regular_price: number;
  discount: number;
  features: Record<string, boolean>;
  images: string[];
  is_available: boolean;
  created_at: string;
}
