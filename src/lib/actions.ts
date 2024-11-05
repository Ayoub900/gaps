'use server'

import { revalidatePath } from 'next/cache'
import { db } from './db/prisma'


// ids
export async function getIds() {
    return db.id.findMany({
        orderBy: {
            id: "desc"
        }
    })
}

export async function createId(formData: FormData) {
    const name = formData.get('name') as string | null
    const code = formData.get('code') as string | null
    const cin = formData.get('cin') as string | null
    const diploma = formData.get('diploma') as string | null
    const type = formData.get('type') as string | null
    const imageUrl = formData.get('imageUrl') as string

    await db.id.create({
        data: {
            name,
            code,
            cin,
            diploma,
            type,
            imageUrl,
        },
    })
    revalidatePath('/dashboard')
}

export async function updateId(id: string, formData: FormData) {
    const name = formData.get('name') as string | null
    const code = formData.get('code') as string | null
    const cin = formData.get('cin') as string | null
    const diploma = formData.get('diploma') as string | null
    const type = formData.get('type') as string | null
    const imageUrl = formData.get('imageUrl') as string

    await db.id.update({
        where: { id },
        data: {
            name,
            code,
            cin,
            diploma,
            type,
            imageUrl,
        },
    })
    revalidatePath('/dashboard')
}

export async function deleteId(id: string) {
    await db.id.delete({ where: { id } })
    revalidatePath('/dashboard')
}

// lps
export async function getLPForms() {
    return db.lpForm.findMany({
        orderBy: { createdAt: 'desc' }
    })
}

export async function updateLPFormStatus(id: string, status: 'waiting' | 'processing' | 'processed') {
    await db.lpForm.update({
        where: { id },
        data: { status }
    })
}