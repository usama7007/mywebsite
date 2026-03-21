import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/server';
import { logout } from '@/app/login/actions';

export default async function Navbar() {
  let user = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch (e) {
    console.error('Supabase client error:', e);
  }

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 64 }}>

          {/* Logo/Brand */}
          <Link href="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            textDecoration: 'none',
          }}>
            <Image
              src="/logo2.png"
              alt="نادي البراغماتيين العرب"
              width={44}
              height={44}
              style={{ borderRadius: 8, objectFit: 'contain' }}
            />
            <span style={{
              fontSize: '1rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.01em',
              fontFamily: "'Noto Sans Arabic', sans-serif",
            }}>
              نادي البراغماتيين العرب
            </span>
          </Link>

          {/* Nav Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Link href="/blog" className="nav-link">مقالات</Link>
            <Link href="/books" className="nav-link">كتب</Link>
            <Link href="/about" className="nav-link">عن النادي</Link>

            {user ? (
              <form action={logout}>
                <button type="submit" className="nav-logout">
                  خروج
                </button>
              </form>
            ) : (
              <Link href="/login" className="nav-login">
                دخول
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
