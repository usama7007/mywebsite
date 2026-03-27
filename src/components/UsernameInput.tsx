'use client';

import { useState } from 'react';
import { updateUsername } from '@/app/account/actions';

interface UsernameInputProps {
    initialUsername: string | null;
}

export default function UsernameInput({ initialUsername }: UsernameInputProps) {
    const [username, setUsername] = useState(initialUsername || '');
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null);

    const handleSave = async () => {
        if (!username.trim()) {
            setMessage({ text: 'يرجى إدخال اسم المستخدم', ok: false });
            return;
        }
        setSaving(true);
        setMessage(null);
        try {
            await updateUsername(username.trim());
            setMessage({ text: '✅ تم حفظ الاسم بنجاح', ok: true });
        } catch {
            setMessage({ text: '❌ حدث خطأ أثناء الحفظ', ok: false });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div style={{ width: '100%' }}>
            <p style={{
                color: '#64748b',
                fontSize: '1rem',
                marginBottom: '0.75rem',
                fontFamily: "'Noto Sans Arabic', sans-serif",
            }}>
                اسم المستخدم (Username)
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="أدخل اسمك هنا..."
                    dir="auto"
                    style={{
                        flex: 1,
                        padding: '0.6rem 0.9rem',
                        borderRadius: 10,
                        border: '1px solid #e2e8f0',
                        fontSize: '1rem',
                        color: '#0f172a',
                        background: '#f8fafc',
                        outline: 'none',
                        fontFamily: "'Noto Sans Arabic', sans-serif",
                    }}
                />
                <button
                    onClick={handleSave}
                    disabled={saving}
                    style={{
                        padding: '0.6rem 1.4rem',
                        borderRadius: 10,
                        fontWeight: 700,
                        fontSize: '0.875rem',
                        color: '#fff',
                        background: saving
                            ? '#a5b4fc'
                            : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        border: 'none',
                        cursor: saving ? 'not-allowed' : 'pointer',
                        boxShadow: '0 2px 8px rgba(99,102,241,0.3)',
                        fontFamily: "'Noto Sans Arabic', sans-serif",
                        whiteSpace: 'nowrap',
                    }}
                >
                    {saving ? 'جاري الحفظ...' : 'حفظ'}
                </button>
            </div>
            {message && (
                <p style={{
                    marginTop: '0.5rem',
                    fontSize: '0.85rem',
                    color: message.ok ? '#16a34a' : '#dc2626',
                    fontFamily: "'Noto Sans Arabic', sans-serif",
                }}>
                    {message.text}
                </p>
            )}
        </div>
    );
}
