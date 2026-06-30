import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { event as EventRecord } from '@prisma/client'
import { ArrowRight, CalendarDays, MapPin, Play } from 'lucide-react'
import { getPublishedEvents } from '@/lib/actions'
import { getYouTubeThumbnailUrl } from '@/lib/youtube'

export const metadata: Metadata = {
    title: 'Events - GAPS',
    description: 'Explore upcoming and published GAPS Academy events.',
}

function formatEventDate(date?: Date | null) {
    if (!date) return 'Date to be announced'

    return new Intl.DateTimeFormat('en', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(date)
}

function EventCard({ event }: { event: EventRecord }) {
    const videoThumbnailUrl = event.videoUrl ? getYouTubeThumbnailUrl(event.videoUrl) : null
    const mediaUrl = event.imageUrl || videoThumbnailUrl

    return (
        <Link
            href={`/events/${event.id}`}
            className="group flex h-full flex-col overflow-hidden rounded-lg border border-[#050c45]/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#e49400]/60 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e49400]"
        >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                {mediaUrl ? (
                    <Image
                        src={mediaUrl}
                        alt={event.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 360px"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-[#050c45] px-6 text-center text-sm font-semibold text-white/80">
                        GAPS Event
                    </div>
                )}

                {event.videoUrl ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#050c45] shadow-lg">
                            <Play className="h-7 w-7 fill-current" />
                        </span>
                    </div>
                ) : null}
            </div>

            <div className="flex flex-1 flex-col gap-4 p-5">
                <div className="space-y-3">
                    <h2 className="text-xl font-bold leading-snug text-[#050c45] line-clamp-2">
                        {event.title}
                    </h2>
                    {event.description ? (
                        <p className="line-clamp-3 text-sm leading-6 text-gray-600">{event.description}</p>
                    ) : null}
                </div>

                <div className="mt-auto space-y-2 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 shrink-0 text-[#e49400]" />
                        {formatEventDate(event.date)}
                    </p>
                    {event.location ? (
                        <p className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 shrink-0 text-[#e49400]" />
                            {event.location}
                        </p>
                    ) : null}
                </div>

                <span className="inline-flex items-center gap-2 pt-2 text-sm font-semibold text-[#050c45] transition group-hover:text-[#e49400]">
                    View event
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
            </div>
        </Link>
    )
}

export default async function EventsPage() {
    const events = await getPublishedEvents()

    return (
        <main className="min-h-screen bg-[#f8fafc]">
            <section className="bg-[#050c45] px-4 py-16 text-center text-white md:px-24">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#e49400]">Events</p>
                <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">GAPS Events</h1>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/80">
                    Follow academy activities, upcoming sessions, and event highlights from Global Academy of Professional Skills.
                </p>
            </section>

            <section className="px-4 py-16 md:px-24">
                <div className="mx-auto max-w-6xl">
                    {events.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {events.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-lg border border-dashed border-[#050c45]/20 bg-white px-6 py-12 text-center shadow-sm">
                            <h2 className="text-2xl font-bold text-[#050c45]">No events published yet</h2>
                            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-600">
                                New GAPS events will appear here once they are announced.
                            </p>
                            <Link
                                href="/contact"
                                className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-[#e49400] px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-600"
                            >
                                Contact us
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </main>
    )
}
