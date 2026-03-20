import Image from 'next/image';

export default function About() {
    return (
        <div style={{ minHeight: 'calc(100vh - 64px)', background: 'linear-gradient(150deg, #f8f9fc 0%, #eef2ff 60%, #f8f9fc 100%)', padding: '4rem 1.5rem' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>

                {/* Header */}
                <div style={{ marginBottom: '3rem', direction: 'rtl' }}>
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
                        fontFamily: "'Noto Sans Arabic', sans-serif",
                    }}>
                        عن النادي
                    </span>
                    <h1 style={{
                        fontSize: 'clamp(2rem, 5vw, 3rem)',
                        fontWeight: 800,
                        letterSpacing: '-0.03em',
                        color: '#0f172a',
                        margin: 0,
                        lineHeight: 1.2,
                        fontFamily: "'Noto Sans Arabic', sans-serif",
                    }}>
                        نادي{' '}
                        <span style={{
                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>
                            البراغماتيين العرب
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
                    {/* Logo Image */}
                    <div style={{ position: 'relative', minHeight: 360, background: 'linear-gradient(135deg, #eef2ff, #f5f3ff)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            src="/logo.png"
                            alt="شعار نادي البراغماتيين العرب"
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 40vw"
                            priority
                        />
                        {/* Gradient overlay */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(99,102,241,0.1) 0%, transparent 60%)',
                        }} />
                    </div>

                    {/* Content */}
                    <div style={{ padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', direction: 'rtl' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                            <p style={{ fontSize: '1.05rem', color: '#334155', lineHeight: 1.9, margin: 0, fontFamily: "'Noto Sans Arabic', sans-serif" }}>
                                نادي البراغماتيين العرب هو مجتمع فكري يجمع العرب المهتمين بالفلسفة البراغماتية — الفلسفة التي ترى أن قيمة الأفكار تُقاس بنتائجها العملية في الواقع.
                            </p>
                            <p style={{ fontSize: '1.05rem', color: '#334155', lineHeight: 1.9, margin: 0, fontFamily: "'Noto Sans Arabic', sans-serif" }}>
                                هنا يشارك الأعضاء مقالاتهم وأفكارهم، ويعرضون الكتب التي يقرأونها، ويتناقشون حول قضايا الفكر والمجتمع من منظور واقعي وعملي.
                            </p>
                        </div>

                        {/* Club Values */}
                        <div style={{ marginTop: '2rem' }}>
                            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem', fontFamily: "'Noto Sans Arabic', sans-serif" }}>
                                قيم النادي
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {['الواقعية', 'العملية', 'التجريب', 'النقد البنّاء', 'التفكير الحر', 'المعرفة التطبيقية'].map(value => (
                                    <span key={value} style={{
                                        padding: '0.3rem 0.75rem',
                                        borderRadius: 8,
                                        background: '#f8fafc',
                                        border: '1px solid #e2e8f0',
                                        fontSize: '0.8rem',
                                        fontWeight: 500,
                                        color: '#475569',
                                        fontFamily: "'Noto Sans Arabic', sans-serif",
                                    }}>
                                        {value}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <div style={{ marginTop: '2rem' }}>
                            <a
                                href="/blog"
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
                                    fontFamily: "'Noto Sans Arabic', sans-serif",
                                }}
                            >
                                اقرأ المقالات ✍️
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
