'use server'

import { revalidatePath } from 'next/cache'
import { createClient, isAdmin as checkAdmin } from '@/utils/supabase/server'

export async function createBook(formData: FormData) {
    const supabase = await createClient()

    // Verify admin status
    if (!await checkAdmin()) {
        throw new Error('Unauthorized');
    }

    const title = formData.get('title') as string
    const author = formData.get('author') as string
    const description = formData.get('description') as string
    const coverImage = formData.get('coverImage') as File | null

    let coverImageUrl = null;

    if (coverImage && coverImage.size > 0) {
        const fileExt = coverImage.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${fileName}`

        const { error: uploadError } = await supabase.storage
            .from('book-covers')
            .upload(filePath, coverImage)

        if (uploadError) {
            // Log the error but don't crash — save the book without a cover
            console.error('Error uploading image (book will be saved without cover):', uploadError);
        } else {
            const { data: { publicUrl } } = supabase.storage
                .from('book-covers')
                .getPublicUrl(filePath)
            coverImageUrl = publicUrl;
        }
    }

    const { error } = await supabase
        .from('books')
        .insert([{ title, author, description, cover_image_url: coverImageUrl }])

    if (error) {
        console.error('Error creating book:', error);
        throw new Error('Failed to create book');
    }

    revalidatePath('/books')
}

export async function deleteBook(formData: FormData) {
    const supabase = await createClient()

    // Verify admin status
    if (!await checkAdmin()) {
        throw new Error('Unauthorized');
    }

    const id = formData.get('id') as string
    const coverImageUrl = formData.get('cover_image_url') as string | null

    // If there's an image, delete it from storage first
    if (coverImageUrl) {
        const fileName = coverImageUrl.split('/').pop()
        if (fileName) {
            await supabase.storage
                .from('book-covers')
                .remove([fileName])
        }
    }

    const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error deleting book:', error);
        throw new Error('Failed to delete book');
    }

    revalidatePath('/books')
}
