'use client';

import { useState } from 'react';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';
import { updateAvatarUrl } from '@/app/account/actions';

interface AvatarUploadProps {
    userId: string;
    initialAvatarUrl: string | null;
}

export default function AvatarUpload({ userId, initialAvatarUrl }: AvatarUploadProps) {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(initialAvatarUrl);
    const [uploading, setUploading] = useState(false);
    const supabase = createClient();

    const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            
            if (!event.target.files || event.target.files.length === 0) {
                return;
            }
            
            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const filePath = `${userId}-${Math.random()}.${fileExt}`;
            
            // Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file, { upsert: true });

            if (uploadError) {
                throw uploadError;
            }

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);

            // Update local state
            setAvatarUrl(publicUrl);

            // Update database profile
            await updateAvatarUrl(publicUrl);

            alert('تم تحديث الصورة بنجاح! (Avatar updated successfully)');

        } catch (error) {
            console.error('Error uploading avatar:', error);
            alert('حدث خطأ أثناء رفع الصورة. تأكد من إعداد قاعدة البيانات. (Error uploading avatar)');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            {/* Avatar Preview */}
            <div style={{
                width: 150,
                height: 150,
                borderRadius: '50%',
                background: '#f1f5f9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative',
                border: '4px solid #fff',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
                {avatarUrl ? (
                    <Image
                        src={avatarUrl}
                        alt="Avatar"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                ) : (
                    <span style={{ fontSize: '3rem', color: '#cbd5e1' }}>👤</span>
                )}
                
                {uploading && (
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(255,255,255,0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <span style={{ color: '#6366f1', fontWeight: 'bold' }}>جاري الرفع...</span>
                    </div>
                )}
            </div>

            {/* Upload Button */}
            <div>
                <label style={{
                    display: 'inline-block',
                    padding: '0.6rem 1.5rem',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    color: '#fff',
                    borderRadius: 999,
                    cursor: uploading ? 'not-allowed' : 'pointer',
                    fontWeight: 600,
                    fontFamily: "'Noto Sans Arabic', sans-serif",
                    boxShadow: '0 2px 8px rgba(99,102,241,0.3)',
                    transition: 'transform 0.1s, box-shadow 0.1s',
                    opacity: uploading ? 0.7 : 1,
                }}>
                    {uploading ? 'يرجى الانتظار...' : 'تغيير الصورة'}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={uploadAvatar}
                        disabled={uploading}
                        style={{ display: 'none' }}
                    />
                </label>
            </div>
        </div>
    );
}
