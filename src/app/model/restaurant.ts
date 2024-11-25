export interface Restaurant{
  restaurant_id?: number;
  restaurant_uuid?: string;
  status?: boolean;
  name?: string;
  email?: string;
  description?: string;
  address?: string;
  category_id?: number;
  user_id?: number;
  phone?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}
