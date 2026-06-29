'use client'

import { useState } from 'react'
import { CalendarPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import EventForm from './EventForm'

export default function EventCreateButton() {
    const [isCreating, setIsCreating] = useState(false)

    return (
        <>
            <Button
                type="button"
                className="bg-[#e49400] text-white hover:bg-amber-600 px-6 py-3 font-semibold"
                onClick={() => setIsCreating(true)}
            >
                <CalendarPlus className="h-4 w-4" />
                Add Event
            </Button>
            <EventForm isOpen={isCreating} onClose={() => setIsCreating(false)} />
        </>
    )
}
