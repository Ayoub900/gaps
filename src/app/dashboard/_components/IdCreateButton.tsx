'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import IdForm from './IdForm'

export default function IdCreateButton() {
    const [isCreating, setIsCreating] = useState(false)

    return (
        <>
            <Button
                type="button"
                className="bg-[#e49400] text-white hover:bg-amber-600 px-6 py-3 font-semibold"
                onClick={() => setIsCreating(true)}
            >
                <Plus className="h-4 w-4" />
                Add New ID
            </Button>
            <IdForm isOpen={isCreating} onClose={() => setIsCreating(false)} />
        </>
    )
}
