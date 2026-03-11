/** @type {import('next').NextConfig} */

// Extract the hostname safely
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'your-project.supabase.co';
const supabaseHostname = supabaseUrl.replace('https://', '').replace('http://', '');

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: supabaseHostname,
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
