-- Create missing tables for Pangjati App
-- Note: events table already exists, so we'll update RLS policies

-- Enable RLS on existing events table if not already enabled
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'events' AND policyname = 'Allow public access to events'
  ) THEN
    ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Allow public access to events" ON public.events FOR ALL USING (true);
  END IF;
END $$;

-- Create Pengurus table if not exists
CREATE TABLE IF NOT EXISTS public.pengurus (
  id BIGSERIAL PRIMARY KEY,
  nama TEXT NOT NULL,
  jabatan TEXT NOT NULL,
  kontak TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Jadwal table if not exists  
CREATE TABLE IF NOT EXISTS public.jadwal (
  id BIGSERIAL PRIMARY KEY,
  kegiatan TEXT NOT NULL,
  waktu TIMESTAMP WITH TIME ZONE NOT NULL,
  tempat TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS and create policies
ALTER TABLE public.pengurus ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jadwal ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public access to pengurus" ON public.pengurus FOR ALL USING (true);
CREATE POLICY "Allow public access to jadwal" ON public.jadwal FOR ALL USING (true);