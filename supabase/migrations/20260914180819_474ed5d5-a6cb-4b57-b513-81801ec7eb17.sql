-- Public can read images in site-images bucket (so images display on the site)
CREATE POLICY "site-images public read"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'site-images');

-- Authenticated admins can upload, update, delete images
CREATE POLICY "site-images admin write"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'site-images' AND public.has_role(auth.uid(), 'admin'));