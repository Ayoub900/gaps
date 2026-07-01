'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { event as EventRecord } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { createEvent, updateEvent } from '@/lib/actions'
import { getYouTubeThumbnailUrl } from '@/lib/youtube'

interface EventFormProps {
    event?: EventRecord
    isOpen: boolean
    onClose: () => void
}

const MAX_IMAGE_SIZE = 5 * 1024 * 1024

function formatDateTimeLocal(value?: Date | string | null) {
    if (!value) return ''

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) return ''

    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    return localDate.toISOString().slice(0, 16)
}

export default function EventForm({ event, isOpen, onClose }: EventFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()
    const videoThumbnailUrl = event?.videoUrl ? getYouTubeThumbnailUrl(event.videoUrl) : null
    const previewUrl = event?.imageUrl || videoThumbnailUrl
    const previewAlt = event?.title || 'Event media'

    const handleSubmit = async (submitEvent: React.FormEvent<HTMLFormElement>) => {
        submitEvent.preventDefault()
        setError('')

        const formData = new FormData(submitEvent.currentTarget)

        const imageValue = formData.get('image')
        if (imageValue instanceof File && imageValue.size > MAX_IMAGE_SIZE) {
            setError('Image must be 5MB or smaller.')
            return
        }

        setIsLoading(true)

        try {
            if (event) {
                await updateEvent(event.id, formData)
            } else {
                await createEvent(formData)
            }
            onClose()
            router.refresh()
        } catch (submitError) {
            setError(submitError instanceof Error ? submitError.message : 'Unable to save event.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[92vw] max-h-[90vh] overflow-y-auto sm:max-w-2xl rounded-lg p-5">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-[#050c45]">
                        {event ? 'Edit Event' : 'Create Event'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {previewUrl ? (
                        <div className="relative h-44 overflow-hidden rounded-md border border-gray-200">
                            <Image
                                src={previewUrl}
                                alt={previewAlt}
                                fill
                                unoptimized={Boolean(event?.imageUrl)}
                                className="object-cover"
                                sizes="(max-width: 768px) 92vw, 640px"
                            />
                        </div>
                    ) : null}

                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="event-title">Title</Label>
                        <Input
                            id="event-title"
                            name="title"
                            defaultValue={event?.title || ''}
                            required
                            className="w-full !ring-[#e49400] focus:ring-2"
                        />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="event-description">Description</Label>
                        <textarea
                            id="event-description"
                            name="description"
                            defaultValue={event?.description || ''}
                            rows={4}
                            className="min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e49400] focus-visible:ring-offset-2"
                        />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="event-full-description">Full Description</Label>
                        <textarea
                            id="event-full-description"
                            name="fullDescription"
                            defaultValue={event?.fullDescription || ''}
                            rows={7}
                            className="min-h-40 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e49400] focus-visible:ring-offset-2"
                        />
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="event-date">Date</Label>
                            <Input
                                id="event-date"
                                name="date"
                                type="datetime-local"
                                defaultValue={formatDateTimeLocal(event?.date)}
                                className="w-full !ring-[#e49400] focus:ring-2"
                            />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="event-location">Location</Label>
                            <Input
                                id="event-location"
                                name="location"
                                defaultValue={event?.location || ''}
                                className="w-full !ring-[#e49400] focus:ring-2"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="event-image">Image</Label>
                        <Input
                            id="event-image"
                            name="image"
                            type="file"
                            accept="image/png,image/jpeg,image/webp,image/gif"
                            className="w-full !ring-[#e49400] focus:ring-2"
                        />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="event-video-url">YouTube Video Link</Label>
                        <Input
                            id="event-video-url"
                            name="videoUrl"
                            type="url"
                            defaultValue={event?.videoUrl || ''}
                            placeholder="https://www.youtube.com/watch?v=..."
                            className="w-full !ring-[#e49400] focus:ring-2"
                        />
                    </div>

                    <label htmlFor="event-publish" className="flex items-center gap-3 rounded-md border border-gray-200 px-3 py-2 text-sm font-medium text-[#050c45]">
                        <Input
                            id="event-publish"
                            name="publish"
                            type="checkbox"
                            defaultChecked={event?.publish ?? true}
                            className="h-4 w-4"
                        />
                        Published
                    </label>

                    {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

                    <DialogFooter className="flex md:justify-end gap-3 md:gap-0 space-x-3 pt-4">
                        <Button type="button" className="border border-gray-300 text-gray-700 hover:bg-gray-100" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading} className="bg-[#e49400] text-white hover:bg-amber-600">
                            {isLoading ? 'Saving...' : event ? 'Update' : 'Create'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
