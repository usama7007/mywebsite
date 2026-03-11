import { createClient } from '@/utils/supabase/server';
import { createBook, deleteBook } from './actions';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function Books() {
    let session = null;
    let books: any[] = [];
    try {
        const supabase = await createClient();
        const { data } = await supabase.auth.getSession();
        session = data.session;

        const { data: booksData, error } = await supabase
            .from('books')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching books:', error);
        } else {
            books = booksData || [];
        }
    } catch (e) {
        console.error('Supabase client error:', e);
    }

    const isAdmin = session?.user?.email && session.user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    return (
        <div style={{ minHeight: 'calc(100vh - 64px)', background: 'linear-gradient(150deg, #f8f9fc 0%, #f5f3ff 60%, #f8f9fc 100%)', padding: '4rem 1.5rem' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>

                {/* Header */}
                <div style={{ marginBottom: '3rem' }}>
                    <span style={{
                        display: 'inline-block',
                        padding: '0.3rem 0.9rem',
                        borderRadius: 999,
                        background: '#f5f3ff',
                        color: '#8b5cf6',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        border: '1px solid #ddd6fe',
                        marginBottom: '1rem',
                    }}>
                        📚 Reading List
                    </span>
                    <h1 style={{
                        fontSize: 'clamp(2rem, 5vw, 3rem)',
                        fontWeight: 800,
                        letterSpacing: '-0.03em',
                        color: '#0f172a',
                        margin: '0 0 0.75rem',
                    }}>
                        Bookshelf
                    </h1>
                    <p style={{ color: '#64748b', fontSize: '1.05rem', margin: 0 }}>
                        Books that have shaped how I think and see the world.
                    </p>
                </div>

                {/* Admin Add Form */}
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
                            ➕ Add New Book
                        </h2>
                        <form action={createBook} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        required
                                        placeholder="Book title..."
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
                                        Author
                                    </label>
                                    <input
                                        type="text"
                                        name="author"
                                        required
                                        placeholder="Author name..."
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
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    rows={2}
                                    placeholder="Brief description..."
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
                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    Cover Image
                                </label>
                                <input
                                    type="file"
                                    name="coverImage"
                                    accept="image/*"
                                    style={{
                                        width: '100%',
                                        fontSize: '0.875rem',
                                        color: '#475569',
                                        padding: '0.4rem 0',
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
                                    Add Book
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Books Grid */}
                {books.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '4rem 2rem',
                        background: '#fff',
                        borderRadius: 16,
                        border: '1px dashed #cbd5e1',
                        color: '#94a3b8',
                        fontSize: '1rem',
                    }}>
                        No books on the shelf yet. Add some! 📖
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                        gap: '1.25rem',
                    }}>
                        {books.map((book) => (
                            <div key={book.id} style={{
                                background: '#fff',
                                borderRadius: 16,
                                border: '1px solid #e2e8f0',
                                overflow: 'hidden',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.15s, box-shadow 0.15s',
                            }}>
                                {/* Cover */}
                                <div style={{ height: 260, position: 'relative', background: 'linear-gradient(135deg, #eef2ff, #f5f3ff)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {book.cover_image_url ? (
                                        <Image
                                            src={book.cover_image_url}
                                            alt={`Cover of ${book.title}`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 25vw"
                                        />
                                    ) : (
                                        <span style={{ fontSize: '3rem' }}>📘</span>
                                    )}
                                </div>

                                {/* Info */}
                                <div style={{ padding: '1.1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.25rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const }}>
                                        {book.title}
                                    </h3>
                                    <p style={{ fontSize: '0.8rem', fontWeight: 500, color: '#8b5cf6', margin: '0 0 0.6rem' }}>
                                        {book.author}
                                    </p>
                                    {book.description && (
                                        <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.6, margin: 0, flex: 1, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const }}>
                                            {book.description}
                                        </p>
                                    )}
                                    {isAdmin && (
                                        <form action={deleteBook} style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'flex-end' }}>
                                            <input type="hidden" name="id" value={book.id} />
                                            <input type="hidden" name="cover_image_url" value={book.cover_image_url || ''} />
                                            <button
                                                type="submit"
                                                style={{
                                                    padding: '0.25rem 0.7rem',
                                                    borderRadius: 6,
                                                    fontSize: '0.75rem',
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
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
