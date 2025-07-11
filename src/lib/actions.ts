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

    await db.id.create({
        data: {
            name,
            code,
            cin,
            diploma,
            type,
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

    await db.id.update({
        where: { id },
        data: {
            name,
            code,
            cin,
            diploma,
            type,
        },
    })
    revalidatePath('/dashboard')
}

export async function deleteId(id: string) {
    await db.id.delete({ where: { id } })
    revalidatePath('/dashboard')
}

export async function getApplications({ skip = 0, take = 6 } = {}) {
    const [applications, totalCount] = await Promise.all([
        db.application.findMany({
            skip,
            take,
            orderBy: { createdAt: 'desc' },
        }),
        db.application.count(),
    ])

    const totalPages = Math.ceil(totalCount / take)

    return { applications, totalCount: totalPages }
}

