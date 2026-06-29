'use server'

import { revalidatePath } from 'next/cache'
import { randomUUID } from 'crypto'
import { mkdir, unlink, writeFile } from 'fs/promises'
import { extname, join } from 'path'
import { db } from './db/prisma'
import { getCanonicalYouTubeUrl } from './youtube'

const uploadDir = join(process.cwd(), 'public', 'uploads')
const uploadUrlPrefix = '/uploads/'
const maxImageSize = 5 * 1024 * 1024
const imageExtensions: Record<string, string> = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
    'image/gif': '.gif',
}

function getText(formData: FormData, name: string) {
    const value = formData.get(name)
    return typeof value === 'string' ? value.trim() : ''
}

function getOptionalFile(formData: FormData, name: string) {
    const value = formData.get(name)

    if (!value || typeof value === 'string' || value.size === 0) {
        return null
    }

    return value
}

function getPublishState(formData: FormData) {
    const value = formData.get('publish')
    return value === 'on' || value === 'true'
}

function getEventDate(formData: FormData) {
    const value = getText(formData, 'date')

    if (!value) return null

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        throw new Error('Please enter a valid event date.')
    }

    return date
}

function getSortOrder(formData: FormData) {
    const value = Number.parseInt(getText(formData, 'sortOrder'), 10)
    return Number.isFinite(value) ? value : 0
}

function getYouTubeVideoUrl(formData: FormData) {
    const value = getText(formData, 'videoUrl')

    if (!value) return null

    const videoUrl = getCanonicalYouTubeUrl(value)

    if (!videoUrl) {
        throw new Error('Video must be a valid YouTube link.')
    }

    return videoUrl
}

function getFileExtension(file: File) {
    if (imageExtensions[file.type]) {
        return imageExtensions[file.type]
    }

    if (file.type) {
        throw new Error('Please upload a JPG, PNG, WebP, or GIF image.')
    }

    const extension = extname(file.name).toLowerCase()
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif']

    if (allowedExtensions.includes(extension)) {
        return extension === '.jpeg' ? '.jpg' : extension
    }

    throw new Error('Please upload a JPG, PNG, WebP, or GIF image.')
}

function getSafeBaseName(fileName: string) {
    const withoutExtension = fileName.replace(/\.[^/.]+$/, '')
    const safeName = withoutExtension
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 40)

    return safeName || 'image'
}

async function saveUploadedImage(file: File | null, required = false) {
    if (!file) {
        if (required) throw new Error('Image is required.')
        return null
    }

    if (file.size > maxImageSize) {
        throw new Error('Image must be 5MB or smaller.')
    }

    const extension = getFileExtension(file)
    const fileName = `${Date.now()}-${getSafeBaseName(file.name)}-${randomUUID()}${extension}`

    await mkdir(uploadDir, { recursive: true })
    await writeFile(join(uploadDir, fileName), Buffer.from(await file.arrayBuffer()))

    return `${uploadUrlPrefix}${fileName}`
}

async function deleteUploadedImage(imageUrl?: string | null) {
    if (!imageUrl?.startsWith(uploadUrlPrefix)) return

    const fileName = imageUrl.slice(uploadUrlPrefix.length)

    if (!fileName || fileName.includes('/') || fileName.includes('\\')) return

    try {
        await unlink(join(uploadDir, fileName))
    } catch (error) {
        const nodeError = error as NodeJS.ErrnoException
        if (nodeError.code !== 'ENOENT') {
            console.warn(`Unable to delete uploaded image ${imageUrl}`, error)
        }
    }
}

function revalidateDashboardContent() {
    revalidatePath('/dashboard')
    revalidatePath('/dashboard/events')
    revalidatePath('/dashboard/partners')
    revalidatePath('/events')
    revalidatePath('/')
}


// ids
export async function getIds() {
    return db.id.findMany({
        orderBy: {
            id: "desc"
        }
    })
}

export async function getPaginatedIds({ skip = 0, take = 9 } = {}) {
    const [ids, totalCount] = await Promise.all([
        db.id.findMany({
            skip,
            take,
            orderBy: {
                id: "desc"
            }
        }),
        db.id.count(),
    ])

    return {
        ids,
        totalPages: Math.max(1, Math.ceil(totalCount / take)),
    }
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

// events
export async function getEvents() {
    return db.event.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    })
}

export async function getPaginatedEvents({ skip = 0, take = 9 } = {}) {
    const [events, totalCount] = await Promise.all([
        db.event.findMany({
            skip,
            take,
            orderBy: {
                createdAt: 'desc',
            },
        }),
        db.event.count(),
    ])

    return {
        events,
        totalPages: Math.max(1, Math.ceil(totalCount / take)),
    }
}

export async function getPublishedEvents() {
    return db.event.findMany({
        where: {
            publish: true,
        },
        orderBy: [
            {
                date: 'asc',
            },
            {
                createdAt: 'desc',
            },
        ],
    })
}

export async function createEvent(formData: FormData) {
    const title = getText(formData, 'title')

    if (!title) {
        throw new Error('Event title is required.')
    }

    const imageFile = getOptionalFile(formData, 'image')
    const videoUrl = getYouTubeVideoUrl(formData)

    if (imageFile && videoUrl) {
        throw new Error('Choose either an image or a YouTube video, not both.')
    }

    if (!imageFile && !videoUrl) {
        throw new Error('Upload an image or add a YouTube video link.')
    }

    const imageUrl = await saveUploadedImage(imageFile)

    try {
        const event = await db.event.create({
            data: {
                title,
                description: getText(formData, 'description') || null,
                fullDescription: getText(formData, 'fullDescription') || null,
                location: getText(formData, 'location') || null,
                date: getEventDate(formData),
                publish: getPublishState(formData),
                imageUrl,
                videoUrl,
            },
        })
        revalidatePath(`/events/${event.id}`)
    } catch (error) {
        await deleteUploadedImage(imageUrl)
        throw error
    }

    revalidateDashboardContent()
}

export async function updateEvent(id: string, formData: FormData) {
    const title = getText(formData, 'title')

    if (!title) {
        throw new Error('Event title is required.')
    }

    const existingEvent = await db.event.findUnique({ where: { id } })

    if (!existingEvent) {
        throw new Error('Event not found.')
    }

    const imageFile = getOptionalFile(formData, 'image')
    const videoUrl = getYouTubeVideoUrl(formData)

    if (imageFile && videoUrl) {
        throw new Error('Choose either an image or a YouTube video, not both.')
    }

    if (!imageFile && !videoUrl && !existingEvent.imageUrl && !existingEvent.videoUrl) {
        throw new Error('Upload an image or add a YouTube video link.')
    }

    const imageUrl = await saveUploadedImage(imageFile)
    const nextImageUrl = videoUrl ? null : imageUrl ?? existingEvent.imageUrl
    const nextVideoUrl = imageUrl ? null : videoUrl ?? existingEvent.videoUrl

    try {
        await db.event.update({
            where: { id },
            data: {
                title,
                description: getText(formData, 'description') || null,
                fullDescription: getText(formData, 'fullDescription') || null,
                location: getText(formData, 'location') || null,
                date: getEventDate(formData),
                publish: getPublishState(formData),
                imageUrl: nextImageUrl,
                videoUrl: nextVideoUrl,
            },
        })
        revalidatePath(`/events/${id}`)
    } catch (error) {
        await deleteUploadedImage(imageUrl)
        throw error
    }

    if ((imageUrl || videoUrl) && existingEvent.imageUrl) {
        await deleteUploadedImage(existingEvent.imageUrl)
    }

    revalidateDashboardContent()
}

export async function deleteEvent(id: string) {
    const existingEvent = await db.event.findUnique({ where: { id } })

    await db.event.delete({ where: { id } })
    await deleteUploadedImage(existingEvent?.imageUrl)
    revalidatePath(`/events/${id}`)

    revalidateDashboardContent()
}

// partners
export async function getPartners() {
    return db.partner.findMany({
        orderBy: [
            {
                sortOrder: 'asc',
            },
            {
                createdAt: 'desc',
            },
        ],
    })
}

export async function getPublishedPartners() {
    return db.partner.findMany({
        where: {
            publish: true,
        },
        orderBy: [
            {
                sortOrder: 'asc',
            },
            {
                createdAt: 'desc',
            },
        ],
    })
}

export async function createPartner(formData: FormData) {
    const name = getText(formData, 'name')

    if (!name) {
        throw new Error('Partner name is required.')
    }

    const imageUrl = await saveUploadedImage(getOptionalFile(formData, 'image'), true)

    try {
        await db.partner.create({
            data: {
                name,
                website: getText(formData, 'website') || null,
                sortOrder: getSortOrder(formData),
                publish: getPublishState(formData),
                imageUrl: imageUrl as string,
            },
        })
    } catch (error) {
        await deleteUploadedImage(imageUrl)
        throw error
    }

    revalidateDashboardContent()
}

export async function updatePartner(id: string, formData: FormData) {
    const name = getText(formData, 'name')

    if (!name) {
        throw new Error('Partner name is required.')
    }

    const existingPartner = await db.partner.findUnique({ where: { id } })

    if (!existingPartner) {
        throw new Error('Partner not found.')
    }

    const imageUrl = await saveUploadedImage(getOptionalFile(formData, 'image'))

    try {
        await db.partner.update({
            where: { id },
            data: {
                name,
                website: getText(formData, 'website') || null,
                sortOrder: getSortOrder(formData),
                publish: getPublishState(formData),
                imageUrl: imageUrl ?? existingPartner.imageUrl,
            },
        })
    } catch (error) {
        await deleteUploadedImage(imageUrl)
        throw error
    }

    if (imageUrl) {
        await deleteUploadedImage(existingPartner.imageUrl)
    }

    revalidateDashboardContent()
}

export async function deletePartner(id: string) {
    const existingPartner = await db.partner.findUnique({ where: { id } })

    await db.partner.delete({ where: { id } })
    await deleteUploadedImage(existingPartner?.imageUrl)

    revalidateDashboardContent()
}

