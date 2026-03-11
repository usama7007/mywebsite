'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function createPost(formData: FormData) {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession();

    // Verify admin status
    const isAdmin = session?.user?.email && session.user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    if (!isAdmin) {
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
    const { data: { session } } = await supabase.auth.getSession();

    // Verify admin status
    const isAdmin = session?.user?.email && session.user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    if (!isAdmin) {
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
