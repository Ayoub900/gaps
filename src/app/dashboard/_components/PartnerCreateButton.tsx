'use client'

import { useState } from 'react'
import { Handshake } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PartnerForm from './PartnerForm'

export default function PartnerCreateButton() {
    const [isCreating, setIsCreating] = useState(false)

    return (
        <>
            <Button
                type="button"
                className="bg-[#e49400] text-white hover:bg-amber-600 px-6 py-3 font-semibold"
                onClick={() => setIsCreating(true)}
            >
                <Handshake className="h-4 w-4" />
                Add Partner
            </Button>
            <PartnerForm isOpen={isCreating} onClose={() => setIsCreating(false)} />
        </>
    )
}
