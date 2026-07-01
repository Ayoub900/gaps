'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { event as EventRecord } from '@prisma/client'
import { CalendarDays, ExternalLink, MapPin, Pencil, Play, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { deleteEvent } from '@/lib/actions'
import { getYouTubeThumbnailUrl } from '@/lib/youtube'
import DeleteConfirmationDialog from './DeleteConfirmationDialog'
import EventForm from './EventForm'

export default function EventItem({ event }: { event: EventRecord }) {
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        await deleteEvent(event.id)
        router.refresh()
    }

    const eventDate = event.date
        ? new Intl.DateTimeFormat('en', {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(new Date(event.date))
        : 'Date not set'
    const videoThumbnailUrl = event.videoUrl ? getYouTubeThumbnailUrl(event.videoUrl) : null
    const mediaUrl = event.imageUrl || videoThumbnailUrl

    return (
        <Card className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
            <div className="relative h-48 bg-gray-100">
                {mediaUrl ? (
                    <Image
                        src={mediaUrl}
                        alt={event.title}
                        fill
                        unoptimized={mediaUrl.startsWith('/uploads/')}
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm font-medium text-gray-500">
                        No media
                    </div>
                )}
                {event.videoUrl ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#050c45] shadow-lg">
                            <Play className="h-6 w-6 fill-current" />
                        </span>
                    </div>
                ) : null}
                <span className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${event.publish ? 'bg-green-600 text-white' : 'bg-gray-900 text-white'}`}>
                    {event.publish ? 'Published' : 'Draft'}
                </span>
            </div>

            <CardContent className="space-y-4 p-6">
                <div>
                    <h3 className="text-xl font-bold text-[#050c45]">{event.title}</h3>
                    {event.description ? (
                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">{event.description}</p>
                    ) : null}
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-[#e49400]" />
                        {eventDate}
                    </p>
                    {event.location ? (
                        <p className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-[#e49400]" />
                            {event.location}
                        </p>
                    ) : null}
                </div>
                {event.publish ? (
                    <Link
                        href={`/events/${event.id}`}
                        target="_blank"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#050c45] hover:text-[#e49400]"
                    >
                        <ExternalLink className="h-4 w-4" />
                        View page
                    </Link>
                ) : null}
            </CardContent>

            <CardFooter className="flex justify-end gap-2 bg-gray-50 p-6">
                <Button type="button" className="bg-[#050c45] hover:bg-blue-900" onClick={() => setIsEditing(true)}>
                    <Pencil className="h-4 w-4" />
                    Edit
                </Button>
                <Button type="button" variant="destructive" onClick={() => setIsDeleting(true)}>
                    <Trash2 className="h-4 w-4" />
                    Delete
                </Button>
            </CardFooter>

            <EventForm event={event} isOpen={isEditing} onClose={() => setIsEditing(false)} />
            <DeleteConfirmationDialog
                isOpen={isDeleting}
                onClose={() => setIsDeleting(false)}
                onConfirm={handleDelete}
                itemName={event.title}
                resourceLabel="event"
            />
        </Card>
    )
}
