import { createClient, isAdmin as checkAdmin } from '@/utils/supabase/server';
import { createPost, deletePost } from './actions';

export const dynamic = 'force-dynamic';

export default async function Blog() {
    let posts: any[] = [];
    try {
        const supabase = await createClient();
        const { data } = await supabase.auth.getUser();
        const user = data.user;

        const { data: postsData, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching posts:', JSON.stringify(error, null, 2));
        } else {
            posts = postsData || [];
        }
    } catch (e) {
        console.error('Supabase client error:', e);
    }

    const isAdmin = await checkAdmin();

    return (
        <div style={{ minHeight: 'calc(100vh - 64px)', background: 'linear-gradient(150deg, #f8f9fc 0%, #eef2ff 60%, #f8f9fc 100%)', padding: '4rem 1.5rem' }}>
            <div style={{ maxWidth: 780, margin: '0 auto' }}>

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
                        marginBottom: '1rem',
                    }}>
                        ✍️ Writing
                    </span>
                    <h1 style={{
                        fontSize: 'clamp(2rem, 5vw, 3rem)',
                        fontWeight: 800,
                        letterSpacing: '-0.03em',
                        color: '#0f172a',
                        margin: '0 0 0.75rem',
                    }}>
                        Blog
                    </h1>
                    <p style={{ color: '#64748b', fontSize: '1.05rem', margin: 0 }}>
                        Thoughts, essays, and ideas I&apos;ve been working through.
                    </p>
                </div>

                {/* Admin Create Form */}
                {isAdmin && (
                    <div style={{
                        background: '#fff',
                        border: '1px solid #e2e8f0',
                        borderRadius: 16,
                        padding: '1.75rem',
                        marginBottom: '2.5rem',
                        boxShadow: '0 1px 8px rgba(0,0,0,0.05)',
                    }}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', margin: '0 0 1.25rem' }}>
                            ✏️ New Post
                        </h2>
                        <form action={createPost} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    placeholder="Post title..."
                                    style={{
                                        width: '100%',
                                        padding: '0.6rem 0.9rem',
                                        borderRadius: 10,
                                        border: '1px solid #e2e8f0',
                                        fontSize: '0.95rem',
                                        color: '#0f172a',
                                        background: '#f8fafc',
                                        outline: 'none',
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    Content
                                </label>
                                <textarea
                                    name="content"
                                    required
                                    rows={4}
                                    placeholder="Write your post..."
                                    style={{
                                        width: '100%',
                                        padding: '0.6rem 0.9rem',
                                        borderRadius: 10,
                                        border: '1px solid #e2e8f0',
                                        fontSize: '0.95rem',
                                        color: '#0f172a',
                                        background: '#f8fafc',
                                        resize: 'vertical',
                                        outline: 'none',
                                    }}
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    style={{
                                        padding: '0.6rem 1.4rem',
                                        borderRadius: 10,
                                        fontWeight: 700,
                                        fontSize: '0.875rem',
                                        color: '#fff',
                                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                        border: 'none',
                                        cursor: 'pointer',
                                        boxShadow: '0 2px 8px rgba(99,102,241,0.3)',
                                    }}
                                >
                                    Publish Post
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Posts List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {posts.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '4rem 2rem',
                            background: '#fff',
                            borderRadius: 16,
                            border: '1px dashed #cbd5e1',
                            color: '#94a3b8',
                            fontSize: '1rem',
                        }}>
                            No posts yet. Check back soon! 📝
                        </div>
                    ) : (
                        posts.map((post) => (
                            <div key={post.id} style={{
                                background: '#fff',
                                border: '1px solid #e2e8f0',
                                borderRadius: 16,
                                padding: '1.75rem',
                                boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                gap: '1rem',
                                transition: 'box-shadow 0.15s',
                            }}>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.6rem' }}>
                                        {post.title}
                                    </h3>
                                    <p style={{ color: '#475569', lineHeight: 1.75, margin: '0 0 1rem', whiteSpace: 'pre-wrap' }}>
                                        {post.content}
                                    </p>
                                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500 }}>
                                        {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </span>
                                </div>
                                {isAdmin && (
                                    <form action={deletePost} style={{ flexShrink: 0 }}>
                                        <input type="hidden" name="id" value={post.id} />
                                        <button
                                            type="submit"
                                            style={{
                                                padding: '0.35rem 0.8rem',
                                                borderRadius: 8,
                                                fontSize: '0.8rem',
                                                fontWeight: 600,
                                                color: '#ef4444',
                                                background: '#fef2f2',
                                                border: '1px solid #fecaca',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </form>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
