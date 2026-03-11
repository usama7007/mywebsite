'use server'

import { revalidatePath } from 'next/cache'
import { createClient, isAdmin as checkAdmin } from '@/utils/supabase/server'

export async function createPost(formData: FormData) {
    const supabase = await createClient()

    // Verify admin status
    if (!await checkAdmin()) {
        throw new Error('Unauthorized');
    }

    const title = formData.get('title') as string
    const content = formData.get('content') as string

    const { error } = await supabase
        .from('posts')
        .insert([{ title, content }])

    if (error) {
        console.error('Error creating post:', error);
        throw new Error('Failed to create post');
    }

    revalidatePath('/blog')
}

export async function deletePost(formData: FormData) {
    const supabase = await createClient()

    // Verify admin status
    if (!await checkAdmin()) {
        throw new Error('Unauthorized');
    }

    const id = formData.get('id') as string

    const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error deleting post:', error);
        throw new Error('Failed to delete post');
    }

    revalidatePath('/blog')
}
