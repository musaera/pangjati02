-- Drop existing tables and recreate with correct structure for Pangjati App requirements
DROP TABLE IF EXISTS public.events CASCADE;
DROP TABLE IF EXISTS public.pengurus CASCADE; 
DROP TABLE IF EXISTS public.jadwal CASCADE;

-- Create Events table with correct structure: { id, nama, tanggal, lokasi }
CREATE TABLE public.events (
  id BIGSERIAL PRIMARY KEY,
  nama TEXT NOT NULL,
  tanggal DATE NOT NULL,
  lokasi TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Pengurus table with correct structure: { id, nama, jabatan, kontak }
CREATE TABLE public.pengurus (
  id BIGSERIAL PRIMARY KEY,
  nama TEXT NOT NULL,
  jabatan TEXT NOT NULL,
  kontak TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Jadwal table with correct structure: { id, kegiatan, waktu, tempat }
CREATE TABLE public.jadwal (
  id BIGSERIAL PRIMARY KEY,
  kegiatan TEXT NOT NULL,
  waktu TIMESTAMP WITH TIME ZONE NOT NULL,
  tempat TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS and create policies
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pengurus ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jadwal ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public access to events" ON public.events FOR ALL USING (true);
CREATE POLICY "Allow public access to pengurus" ON public.pengurus FOR ALL USING (true);
CREATE POLICY "Allow public access to jadwal" ON public.jadwal FOR ALL USING (true);