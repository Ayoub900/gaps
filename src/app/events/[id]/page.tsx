import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { CalendarDays, MapPin } from 'lucide-react'
import { db } from '@/lib/db/prisma'
import { getYouTubeEmbedUrl } from '@/lib/youtube'

interface EventPageProps {
    params: {
        id: string
    }
}

const getEvent = cache(async (id: string) => {
    const event = await db.event.findUnique({
        where: { id },
    })

    if (!event || !event.publish) notFound()

    return event
})

function formatEventDate(date?: Date | null) {
    if (!date) return 'Date to be announced'

    return new Intl.DateTimeFormat('en', {
        dateStyle: 'full',
        timeStyle: 'short',
    }).format(date)
}

export async function generateMetadata({ params: { id } }: EventPageProps): Promise<Metadata> {
    const event = await getEvent(id)

    return {
        title: `${event.title} - GAPS`,
        description: event.description || event.fullDescription || 'GAPS event',
        openGraph: {
            images: event.imageUrl ? [{ url: event.imageUrl }] : undefined,
        },
    }
}

export default async function EventPage({ params: { id } }: EventPageProps) {
    const event = await getEvent(id)
    const embedUrl = event.videoUrl ? getYouTubeEmbedUrl(event.videoUrl) : null

    return (
        <main className="min-h-screen bg-white">
            <section className="mx-auto max-w-5xl px-4 py-12 md:px-8">
                <Link href="/#events" className="text-sm font-semibold text-[#050c45] hover:text-[#e49400]">
                    Back to events
                </Link>

                <div className="mt-8 space-y-6">
                    <h1 className="text-3xl font-extrabold text-[#050c45] md:text-5xl">{event.title}</h1>

                    <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-600">
                        <p className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-[#e49400]" />
                            {formatEventDate(event.date)}
                        </p>
                        {event.location ? (
                            <p className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-[#e49400]" />
                                {event.location}
                            </p>
                        ) : null}
                    </div>
                </div>

                <div className="mt-10 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                    {embedUrl ? (
                        <iframe
                            src={embedUrl}
                            title={event.title}
                            className="aspect-video w-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    ) : event.imageUrl ? (
                        <div className="relative aspect-video w-full">
                            <Image
                                src={event.imageUrl}
                                alt={event.title}
                                fill
                                priority
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 1024px"
                            />
                        </div>
                    ) : null}
                </div>

                {event.description ? (
                    <p className="mt-8 text-lg leading-8 text-gray-700">{event.description}</p>
                ) : null}

                {event.fullDescription ? (
                    <article className="mt-8 whitespace-pre-line text-base leading-8 text-gray-700">
                        {event.fullDescription}
                    </article>
                ) : null}
            </section>
        </main>
    )
}
