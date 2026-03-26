import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import AvatarUpload from '@/components/AvatarUpload';

export const dynamic = 'force-dynamic';

export default async function AccountPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Try to get the profile
    let { data: profile } = await supabase
        .from('profiles')
        .select('avatar_url, email')
        .eq('id', user.id)
        .single();

    // If profile doesn't exist yet (created before the trigger), create it now
    if (!profile) {
        const { data: newProfile, error } = await supabase
            .from('profiles')
            .insert([{ id: user.id, email: user.email }])
            .select()
            .single();
            
        if (!error) {
            profile = newProfile;
        }
    }

    return (
        <div style={{ minHeight: 'calc(100vh - 64px)', background: '#f8fafc', padding: '4rem 1.5rem', direction: 'rtl' }}>
            <div style={{ maxWidth: 600, margin: '0 auto' }}>
                <h1 style={{
                    fontSize: 'clamp(2rem, 5vw, 2.5rem)',
                    fontWeight: 800,
                    color: '#0f172a',
                    marginBottom: '2rem',
                    fontFamily: "'Noto Sans Arabic', sans-serif",
                }}>
                    حسابي (My Account)
                </h1>

                <div style={{
                    background: '#fff',
                    borderRadius: 16,
                    padding: '2rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    border: '1px solid #e2e8f0',
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
                        
                        <div style={{ width: '100%', textAlign: 'center' }}>
                            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '0.5rem', fontFamily: "'Noto Sans Arabic', sans-serif" }}>
                                البريد الإلكتروني (Email)
                            </p>
                            <p style={{ color: '#0f172a', fontSize: '1.2rem', fontWeight: 600 }} dir="ltr">
                                {user.email}
                            </p>
                        </div>

                        <div style={{ width: '100%', height: '1px', background: '#e2e8f0' }} />

                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.5rem', fontFamily: "'Noto Sans Arabic', sans-serif" }}>
                                الصورة الشخصية (Profile Picture)
                            </p>
                            
                            <AvatarUpload 
                                userId={user.id} 
                                initialAvatarUrl={profile?.avatar_url || null} 
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
