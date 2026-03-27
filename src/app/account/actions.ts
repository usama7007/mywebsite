'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateAvatarUrl(avatarUrl: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Unauthorized');
    }

    const { error } = await supabase
        .from('profiles')
        .update({ avatar_url: avatarUrl })
        .eq('id', user.id);

    if (error) {
        console.error('Error updating profile avatar:', error);
        throw new Error('Failed to update avatar in database');
    }

    revalidatePath('/account');
    revalidatePath('/blog');
}

export async function updateUsername(username: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Unauthorized');
    }

    const trimmed = username.trim();
    if (!trimmed) {
        throw new Error('Username cannot be empty');
    }

    const { error } = await supabase
        .from('profiles')
        .update({ username: trimmed })
        .eq('id', user.id);

    if (error) {
        console.error('Error updating username:', error);
        throw new Error('Failed to update username');
    }

    revalidatePath('/account');
    revalidatePath('/blog');
}
