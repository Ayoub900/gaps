'use client'

import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { updateLPFormStatus } from '@/lib/actions'

type Status = 'waiting' | 'processing' | 'processed'

export default function LPSStatusCell({ formId, initialStatus }: { formId: string, initialStatus: Status }) {
    const [status, setStatus] = useState<Status>(initialStatus)

    const handleStatusChange = async (newStatus: Status) => {
        setStatus(newStatus)
        await updateLPFormStatus(formId, newStatus)
    }

    return (
        <Select onValueChange={handleStatusChange} defaultValue={status}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="waiting">Waiting</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="processed">Processed</SelectItem>
            </SelectContent>
        </Select>
    )
}