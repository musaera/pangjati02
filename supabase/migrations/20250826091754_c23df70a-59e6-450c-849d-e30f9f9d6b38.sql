-- Create Events table
CREATE TABLE public.events (
  id BIGSERIAL PRIMARY KEY,
  nama TEXT NOT NULL,
  tanggal DATE NOT NULL,
  lokasi TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Pengurus table  
CREATE TABLE public.pengurus (
  id BIGSERIAL PRIMARY KEY,
  nama TEXT NOT NULL,
  jabatan TEXT NOT NULL,
  kontak TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Jadwal table
CREATE TABLE public.jadwal (
  id BIGSERIAL PRIMARY KEY,
  kegiatan TEXT NOT NULL,
  waktu TIMESTAMP WITH TIME ZONE NOT NULL,
  tempat TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (but allow public access for this app)
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pengurus ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jadwal ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public access for all operations
CREATE POLICY "Allow public access to events" ON public.events FOR ALL USING (true);
CREATE POLICY "Allow public access to pengurus" ON public.pengurus FOR ALL USING (true);
CREATE POLICY "Allow public access to jadwal" ON public.jadwal FOR ALL USING (true);