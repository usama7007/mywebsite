-- Add cover_image_url to books
ALTER TABLE public.books ADD COLUMN cover_image_url TEXT;

-- Create a storage bucket for book covers
INSERT INTO storage.buckets (id, name, public) VALUES ('book-covers', 'book-covers', true) ON CONFLICT (id) DO NOTHING;

-- Set up access controls for the new bucket
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'book-covers');
CREATE POLICY "Auth Insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'book-covers' AND auth.role() = 'authenticated');
CREATE POLICY "Auth Update" ON storage.objects FOR UPDATE USING (bucket_id = 'book-covers' AND auth.role() = 'authenticated');
CREATE POLICY "Auth Delete" ON storage.objects FOR DELETE USING (bucket_id = 'book-covers' AND auth.role() = 'authenticated');
