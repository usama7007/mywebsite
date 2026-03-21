import { createClient, isAdmin as checkAdmin } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { deletePost } from '../actions';

export const dynamic = 'force-dynamic';

export default async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const supabase = await createClient();
    const { data: post, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !post) {
        notFound();
    }

    const isAdmin = await checkAdmin();

    return (
        <div style={{ minHeight: 'calc(100vh - 64px)', background: 'linear-gradient(150deg, #f8f9fc 0%, #eef2ff 60%, #f8f9fc 100%)', padding: '4rem 1.5rem' }}>
            <div style={{ maxWidth: 780, margin: '0 auto' }}>
                <Link href="/blog" style={{
                    display: 'inline-block',
                    marginBottom: '2rem',
                    color: '#6366f1',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    fontFamily: "'Noto Sans Arabic', sans-serif",
                    direction: 'rtl',
                }}>
                    ← العودة للمقالات
                </Link>

                <div style={{
                    background: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: 24,
                    padding: '3rem 2.5rem',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                        <h1 dir="auto" style={{
                            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                            fontWeight: 800,
                            color: '#0f172a',
                            margin: 0,
                            lineHeight: 1.3,
                            fontFamily: "'Noto Sans Arabic', sans-serif",
                            flex: 1,
                        }}>
                            {post.title}
                        </h1>
                        {isAdmin && (
                            <form action={deletePost} style={{ flexShrink: 0 }}>
                                <input type="hidden" name="id" value={post.id} />
                                <button
                                    type="submit"
                                    style={{
                                        padding: '0.4rem 0.9rem',
                                        borderRadius: 8,
                                        fontSize: '0.8rem',
                                        fontWeight: 600,
                                        color: '#ef4444',
                                        background: '#fef2f2',
                                        border: '1px solid #fecaca',
                                        cursor: 'pointer',
                                        fontFamily: "'Noto Sans Arabic', sans-serif",
                                    }}
                                >
                                    حذف المقال
                                </button>
                            </form>
                        )}
                    </div>
                    
                    <div style={{ marginBottom: '2.5rem', color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>
                        {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>

                    <div dir="auto" style={{
                        color: '#334155',
                        lineHeight: 1.9,
                        fontSize: '1.1rem',
                        whiteSpace: 'pre-wrap',
                        fontFamily: "'Noto Sans Arabic', sans-serif",
                    }}>
                        {post.content}
                    </div>
                </div>
            </div>
        </div>
    );
}
