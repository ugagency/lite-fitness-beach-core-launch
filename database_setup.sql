-- ==========================================
-- LITE FITNESS BEACH - COMPLETE DATABASE SETUP
-- ==========================================

-- 1. CLEANUP (FORCE DROP TO FIX SCHEMA ISSUES)
DROP VIEW IF EXISTS customer_stats_view;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS admin_invites CASCADE;
-- DROP TYPE IF EXISTS product_category CASCADE; -- Uncomment if you want to reset enums too
-- DROP TYPE IF EXISTS order_status CASCADE;
-- DROP TYPE IF EXISTS payment_method CASCADE;

-- 2. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 3. ENUMS
DO $$ BEGIN
    CREATE TYPE product_category AS ENUM ('fitness', 'beachwear', 'accessories');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'preparing', 'shipped', 'delivered', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_method AS ENUM ('pix', 'credit_card', 'debit_card');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 4. TABLES

-- PROFILES: Extends Supabase Auth
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT, -- Added this column which was missing before
  full_name TEXT,
  phone TEXT,
  cpf TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'editor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ADMIN INVITES: For creating admin users via dashboard
CREATE TABLE admin_invites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_by UUID REFERENCES profiles(id)
);

-- PRODUCTS
CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  category product_category NOT NULL,
  images TEXT[] DEFAULT '{}',
  stock INTEGER DEFAULT 0,
  sizes TEXT[] DEFAULT '{}',
  colors TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  is_new BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ORDERS
CREATE TABLE orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id), -- Nullable for guest checkout
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  shipping_address JSONB,
  status order_status DEFAULT 'pending',
  payment_method payment_method,
  total DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  tracking_code TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ORDER ITEMS
CREATE TABLE order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id),
  product_name TEXT NOT NULL, 
  product_image TEXT,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  size TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. VIEWS (For Dashboard Analytics & Customers Page)

-- CUSTOMER STATS VIEW: Aggregates spent and last order
CREATE OR REPLACE VIEW customer_stats_view AS
SELECT 
  p.id,
  p.full_name,
  p.email,
  p.role,
  p.created_at as joined_at,
  COALESCE(SUM(o.total), 0) as total_spent,
  COUNT(o.id) as orders_count,
  MAX(o.created_at) as last_order_date
FROM profiles p
LEFT JOIN orders o ON p.id = o.user_id
GROUP BY p.id, p.full_name, p.email, p.role, p.created_at;

-- 6. SECURITY (Row Level Security)

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can update any profile" ON profiles FOR UPDATE USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

-- Admin Invites Policies
CREATE POLICY "Admins can view invites" ON admin_invites FOR SELECT USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));
CREATE POLICY "Admins can insert invites" ON admin_invites FOR INSERT WITH CHECK (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));
CREATE POLICY "Admins can delete invites" ON admin_invites FOR DELETE USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

-- Products Policies
CREATE POLICY "Public view active products" ON products FOR SELECT USING (is_active = true OR auth.uid() IN (SELECT id FROM profiles WHERE role IN ('admin', 'editor')));
CREATE POLICY "Admins/Editors can insert products" ON products FOR INSERT WITH CHECK (auth.uid() IN (SELECT id FROM profiles WHERE role IN ('admin', 'editor')));
CREATE POLICY "Admins/Editors can update products" ON products FOR UPDATE USING (auth.uid() IN (SELECT id FROM profiles WHERE role IN ('admin', 'editor')));
CREATE POLICY "Admins/Editors can delete products" ON products FOR DELETE USING (auth.uid() IN (SELECT id FROM profiles WHERE role IN ('admin', 'editor')));

-- Orders Policies
CREATE POLICY "Users see own orders" ON orders FOR SELECT USING (auth.uid() = user_id OR auth.uid() IN (SELECT id FROM profiles WHERE role IN ('admin', 'editor')));
CREATE POLICY "Admins see all orders" ON orders FOR SELECT USING (auth.uid() IN (SELECT id FROM profiles WHERE role IN ('admin', 'editor')));
CREATE POLICY "Anyone can create orders" ON orders FOR INSERT WITH CHECK (true);

-- 7. FUNCTIONS & TRIGGERS

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now(); 
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Handle New User (with Admin Invite support)
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
DECLARE
  invited_role TEXT;
BEGIN
  -- Check if email is in admin_invites
  SELECT role INTO invited_role FROM public.admin_invites WHERE email = new.email LIMIT 1;

  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id, 
    new.email, -- Now we are correctly inserting email
    new.raw_user_meta_data->>'full_name', 
    COALESCE(invited_role, 'customer')
  );
  
  -- If invited, delete the invite
  IF invited_role IS NOT NULL THEN
    DELETE FROM public.admin_invites WHERE email = new.email;
  END IF;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists to avoid error on recreation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
