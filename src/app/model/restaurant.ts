export interface Restaurant{
  restaurant_id?: number;
  restaurant_uuid?: string;
  status?: string;
  name?: string;
  email?: string;
  description?: string;
  address?: string;
  phone?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}
