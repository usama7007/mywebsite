import Link from "next/link";

export default function Home() {
  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', background: 'linear-gradient(150deg, #f8f9fc 0%, #eef2ff 50%, #f8f9fc 100%)' }}>
      {/* Hero Section */}
      <section style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '5rem 1.5rem 4rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '1.5rem',
      }}>
        {/* Badge */}
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.3rem 0.9rem',
          borderRadius: 999,
          background: '#eef2ff',
          color: '#6366f1',
          fontSize: '0.8rem',
          fontWeight: 600,
          letterSpacing: '0.04em',
          border: '1px solid #c7d2fe',
        }}>
          ✦ Welcome to my corner of the internet
        </span>

        {/* Headline */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          color: '#0f172a',
          maxWidth: 700,
          margin: 0,
        }}>
          Hi, I&apos;m{' '}
          <span style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Usama
          </span>
          .{' '}
          <br />
          I write, read, and build things.
        </h1>

        {/* Subheading */}
        <p style={{
          fontSize: '1.15rem',
          color: '#64748b',
          maxWidth: 560,
          lineHeight: 1.75,
          margin: 0,
        }}>
          Software engineer, lifelong learner, and occasional blogger. I share my thoughts on technology, books I love, and the ideas that keep me curious.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
          <Link
            href="/blog"
            style={{
              padding: '0.75rem 1.75rem',
              borderRadius: 12,
              fontWeight: 700,
              fontSize: '0.95rem',
              color: '#fff',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              textDecoration: 'none',
              boxShadow: '0 4px 15px rgba(99,102,241,0.35)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
          >
            Read the Blog →
          </Link>
          <Link
            href="/about"
            style={{
              padding: '0.75rem 1.75rem',
              borderRadius: 12,
              fontWeight: 600,
              fontSize: '0.95rem',
              color: '#475569',
              background: '#fff',
              textDecoration: 'none',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              transition: 'all 0.15s',
            }}
          >
            About Me
          </Link>
        </div>
      </section>

      {/* Feature Cards */}
      <section style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '2rem 1.5rem 6rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.25rem',
      }}>
        {[
          {
            icon: '✍️',
            title: 'Blog',
            desc: 'Essays, thoughts, and ideas on software, learning, and life.',
            href: '/blog',
            color: '#6366f1',
            bg: '#eef2ff',
          },
          {
            icon: '📚',
            title: 'Books',
            desc: 'A curated shelf of books that have shaped how I think.',
            href: '/books',
            color: '#8b5cf6',
            bg: '#f5f3ff',
          },
          {
            icon: '👤',
            title: 'About',
            desc: 'Learn more about who I am, what I do, and what drives me.',
            href: '/about',
            color: '#0ea5e9',
            bg: '#f0f9ff',
          },
        ].map(({ icon, title, desc, href, color, bg }) => (
          <Link
            key={href}
            href={href}
            style={{
              display: 'block',
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: 16,
              padding: '1.75rem',
              textDecoration: 'none',
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
          >
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              marginBottom: '1rem',
            }}>
              {icon}
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.4rem' }}>{title}</h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0, lineHeight: 1.65 }}>{desc}</p>
            <span style={{ display: 'inline-block', marginTop: '1rem', fontSize: '0.875rem', fontWeight: 600, color }}>
              Explore →
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
