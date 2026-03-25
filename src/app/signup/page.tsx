import { signup } from '@/app/login/actions'
import Link from 'next/link'

export default async function SignupPage(props: {
    searchParams?: Promise<{ message?: string }>
}) {
    const searchParams = await props.searchParams;
    return (
        <div style={{
            minHeight: 'calc(100vh - 64px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(150deg, #f8f9fc 0%, #eef2ff 60%, #f8f9fc 100%)',
            padding: '2rem 1rem',
        }}>
            <div style={{
                width: '100%',
                maxWidth: 420,
                background: '#fff',
                borderRadius: 24,
                border: '1px solid #e2e8f0',
                boxShadow: '0 8px 32px rgba(99,102,241,0.1)',
                padding: '2.5rem',
                direction: 'rtl'
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: 52,
                        height: 52,
                        borderRadius: 14,
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        margin: '0 auto 1rem',
                        boxShadow: '0 4px 12px rgba(16,185,129,0.3)',
                    }}>
                        👤
                    </div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.4rem', letterSpacing: '-0.02em', fontFamily: "'Noto Sans Arabic', sans-serif" }}>
                        إنشاء حساب جديد
                    </h1>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0, fontFamily: "'Noto Sans Arabic', sans-serif" }}>
                        انضم إلى نادي البراغماتيين العرب
                    </p>
                </div>

                {/* Error message */}
                {searchParams?.message && (
                    <div style={{
                        background: '#fef2f2',
                        border: '1px solid #fecaca',
                        color: '#dc2626',
                        padding: '0.75rem 1rem',
                        borderRadius: 10,
                        fontSize: '0.875rem',
                        textAlign: 'center',
                        marginBottom: '1.25rem',
                    }}>
                        {searchParams.message}
                    </div>
                )}

                {/* Form */}
                <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label
                            htmlFor="email"
                            style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem', letterSpacing: '0.05em', fontFamily: "'Noto Sans Arabic', sans-serif" }}
                        >
                            البريد الإلكتروني
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            required
                            dir="ltr"
                            style={{
                                width: '100%',
                                padding: '0.65rem 0.9rem',
                                borderRadius: 10,
                                border: '1px solid #e2e8f0',
                                fontSize: '0.95rem',
                                color: '#0f172a',
                                background: '#f8fafc',
                                outline: 'none',
                                transition: 'border-color 0.15s',
                                textAlign: 'left'
                            }}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem', letterSpacing: '0.05em', fontFamily: "'Noto Sans Arabic', sans-serif" }}
                        >
                            كلمة المرور
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            required
                            dir="ltr"
                            style={{
                                width: '100%',
                                padding: '0.65rem 0.9rem',
                                borderRadius: 10,
                                border: '1px solid #e2e8f0',
                                fontSize: '0.95rem',
                                color: '#0f172a',
                                background: '#f8fafc',
                                outline: 'none',
                                transition: 'border-color 0.15s',
                                textAlign: 'left'
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        formAction={signup}
                        style={{
                            marginTop: '0.5rem',
                            padding: '0.75rem',
                            width: '100%',
                            borderRadius: 12,
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            color: '#fff',
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 4px 14px rgba(16,185,129,0.35)',
                            transition: 'opacity 0.15s',
                            fontFamily: "'Noto Sans Arabic', sans-serif"
                        }}
                    >
                        تسجيل ←
                    </button>
                    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                        <Link href="/login" style={{ fontSize: '0.85rem', color: '#6366f1', textDecoration: 'none', fontWeight: 600, fontFamily: "'Noto Sans Arabic', sans-serif" }}>
                            لديك حساب بالفعل؟ تسجيل الدخول
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
