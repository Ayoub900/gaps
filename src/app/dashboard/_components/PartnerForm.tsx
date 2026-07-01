'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { partner as PartnerRecord } from '@prisma/client'
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
import { createPartner, updatePartner } from '@/lib/actions'

interface PartnerFormProps {
    partner?: PartnerRecord
    isOpen: boolean
    onClose: () => void
}

export default function PartnerForm({ partner, isOpen, onClose }: PartnerFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        setError('')

        const formData = new FormData(event.currentTarget)

        try {
            if (partner) {
                await updatePartner(partner.id, formData)
            } else {
                await createPartner(formData)
            }
            onClose()
            router.refresh()
        } catch (submitError) {
            setError(submitError instanceof Error ? submitError.message : 'Unable to save partner.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[92vw] max-h-[90vh] overflow-y-auto sm:max-w-xl rounded-lg p-5">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-[#050c45]">
                        {partner ? 'Edit Partner' : 'Create Partner'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {partner?.imageUrl ? (
                        <div className="relative h-36 overflow-hidden rounded-md border border-gray-200 bg-white">
                            <Image
                                src={partner.imageUrl}
                                alt={partner.name}
                                fill
                                unoptimized={partner.imageUrl.startsWith('/uploads/')}
                                className="object-contain p-4"
                                sizes="(max-width: 768px) 92vw, 560px"
                            />
                        </div>
                    ) : null}

                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="partner-name">Name</Label>
                        <Input
                            id="partner-name"
                            name="name"
                            defaultValue={partner?.name || ''}
                            required
                            className="w-full !ring-[#e49400] focus:ring-2"
                        />
                    </div>

                    <div className="grid gap-5 md:grid-cols-[1fr_140px]">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="partner-website">Website</Label>
                            <Input
                                id="partner-website"
                                name="website"
                                type="url"
                                defaultValue={partner?.website || ''}
                                className="w-full !ring-[#e49400] focus:ring-2"
                            />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="partner-sort-order">Order</Label>
                            <Input
                                id="partner-sort-order"
                                name="sortOrder"
                                type="number"
                                defaultValue={partner?.sortOrder ?? 0}
                                className="w-full !ring-[#e49400] focus:ring-2"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="partner-image">Logo</Label>
                        <Input
                            id="partner-image"
                            name="image"
                            type="file"
                            accept="image/png,image/jpeg,image/webp,image/gif"
                            required={!partner}
                            className="w-full !ring-[#e49400] focus:ring-2"
                        />
                    </div>

                    <label htmlFor="partner-publish" className="flex items-center gap-3 rounded-md border border-gray-200 px-3 py-2 text-sm font-medium text-[#050c45]">
                        <Input
                            id="partner-publish"
                            name="publish"
                            type="checkbox"
                            defaultChecked={partner?.publish ?? true}
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
                            {isLoading ? 'Saving...' : partner ? 'Update' : 'Create'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
