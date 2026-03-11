import Image from 'next/image';

export default function About() {
    return (
        <div style={{ minHeight: 'calc(100vh - 64px)', background: 'linear-gradient(150deg, #f8f9fc 0%, #eef2ff 60%, #f8f9fc 100%)', padding: '4rem 1.5rem' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>

                {/* Header */}
                <div style={{ marginBottom: '3rem' }}>
                    <span style={{
                        display: 'inline-block',
                        padding: '0.3rem 0.9rem',
                        borderRadius: 999,
                        background: '#eef2ff',
                        color: '#6366f1',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        border: '1px solid #c7d2fe',
                        marginBottom: '1.25rem',
                    }}>
                        About Me
                    </span>
                    <h1 style={{
                        fontSize: 'clamp(2rem, 5vw, 3rem)',
                        fontWeight: 800,
                        letterSpacing: '-0.03em',
                        color: '#0f172a',
                        margin: 0,
                        lineHeight: 1.15,
                    }}>
                        Hi, I&apos;m{' '}
                        <span style={{
                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>
                            Usama
                        </span>
                    </h1>
                </div>

                {/* Card */}
                <div style={{
                    background: '#fff',
                    borderRadius: 24,
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                    overflow: 'hidden',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                }}>
                    {/* Image */}
                    <div style={{ position: 'relative', minHeight: 360, background: '#f1f5f9' }}>
                        <Image
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
                            alt="Usama's profile picture"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 40vw"
                            priority
                        />
                        {/* Gradient overlay */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(99,102,241,0.15) 0%, transparent 60%)',
                        }} />
                    </div>

                    {/* Content */}
                    <div style={{ padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                            <p style={{ fontSize: '1.05rem', color: '#334155', lineHeight: 1.8, margin: 0 }}>
                                I&apos;m a passionate software engineer and lifelong learner. I specialize in building robust, user-friendly web applications using modern technologies like React, Next.js, and Node.
                            </p>
                            <p style={{ fontSize: '1.05rem', color: '#334155', lineHeight: 1.8, margin: 0 }}>
                                When I&apos;m not coding, you can find me reading a good book, exploring new technologies, or writing on my blog to share insights and personal projects with the community.
                            </p>
                        </div>

                        {/* Skills */}
                        <div style={{ marginTop: '2rem' }}>
                            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
                                Things I work with
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {['React', 'Next.js', 'TypeScript', 'Node.js', 'Supabase', 'PostgreSQL'].map(skill => (
                                    <span key={skill} style={{
                                        padding: '0.3rem 0.75rem',
                                        borderRadius: 8,
                                        background: '#f8fafc',
                                        border: '1px solid #e2e8f0',
                                        fontSize: '0.8rem',
                                        fontWeight: 500,
                                        color: '#475569',
                                    }}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <div style={{ marginTop: '2rem' }}>
                            <a
                                href="mailto:hello@example.com"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    padding: '0.7rem 1.5rem',
                                    borderRadius: 12,
                                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                    color: '#fff',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                    textDecoration: 'none',
                                    boxShadow: '0 4px 12px rgba(99,102,241,0.3)',
                                }}
                            >
                                Get in touch ✉️
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
