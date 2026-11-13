-- ========================================================
-- TABEL UCAPAN TAMU (WISHES) UNTUK SUPABASE
-- Jalankan query ini di Dashboard Supabase -> SQL Editor
-- ========================================================

-- 1. Buat tabel wishes dengan validasi constraint
CREATE TABLE IF NOT EXISTS public.wishes (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    status VARCHAR(10) NOT NULL CHECK (status IN ('Hadir', 'Ragu', 'Maaf')),
    message VARCHAR(400) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Aktifkan Row Level Security (RLS)
ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;

-- 3. Kebijakan: Siapapun (publik) boleh membaca semua ucapan
CREATE POLICY "Public read wishes"
ON public.wishes
FOR SELECT
TO public
USING (true);

-- 4. Kebijakan: Siapapun (publik) boleh mengirimkan ucapan baru
CREATE POLICY "Public insert wishes"
ON public.wishes
FOR INSERT
TO public
WITH CHECK (true);

-- 5. Aktifkan Realtime agar ucapan baru langsung muncul tanpa refresh
ALTER PUBLICATION supabase_realtime ADD TABLE public.wishes;

-- 6. Masukkan beberapa ucapan awal (opsional)
INSERT INTO public.wishes (name, status, message)
VALUES 
  ('Iliana Kusuma', 'Hadir', 'Selamat menempuh babak baru kehidupan, Chintia & Tommy! Semoga cinta kasih kalian selalu diberkahi ketenangan dan kebahagiaan abadi.'),
  ('Bimo Perkasa & Keluarga', 'Hadir', 'Baarakallahu laka wa baaraka ''alaika wa jama''a bainakuma fii khoir untuk Chintia & Tommy. Sampai jumpa di hari bahagia nanti!')
ON CONFLICT DO NOTHING;
