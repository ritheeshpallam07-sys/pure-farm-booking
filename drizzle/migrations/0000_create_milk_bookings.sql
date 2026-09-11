CREATE TABLE public.milk_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL CHECK (char_length(customer_name) BETWEEN 2 AND 100),
  phone TEXT NOT NULL CHECK (char_length(phone) BETWEEN 5 AND 30),
  address TEXT NOT NULL CHECK (char_length(address) BETWEEN 5 AND 500),
  quantity TEXT NOT NULL CHECK (quantity IN ('500ml', '1litre', '2litres', '5litres', 'other')),
  preferred_time TEXT NOT NULL CHECK (preferred_time IN ('morning', 'afternoon', 'evening')),
  message TEXT CHECK (message IS NULL OR char_length(message) <= 1000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.milk_bookings TO anon;
GRANT SELECT, INSERT ON public.milk_bookings TO authenticated;
GRANT ALL ON public.milk_bookings TO service_role;

ALTER TABLE public.milk_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create a milk booking"
ON public.milk_bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Signed-in owner can view milk bookings"
ON public.milk_bookings
FOR SELECT
TO authenticated
USING (true);

CREATE INDEX milk_bookings_created_at_idx
ON public.milk_bookings (created_at DESC);