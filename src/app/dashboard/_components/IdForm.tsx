'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { id as Id } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import { createId, updateId } from '@/lib/actions'

interface IdFormProps {
    id?: Id
    isOpen: boolean
    onClose: () => void
}

export default function IdForm({ id, isOpen, onClose }: IdFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        setError('')
        const formData = new FormData(event.currentTarget)

        try {
            if (id) {
                await updateId(id.id, formData)
            } else {
                await createId(formData)
            }
            onClose()
            router.refresh()
        } catch (error) {
            console.error('Error submitting form:', error)
            setError(error instanceof Error ? error.message : 'Unable to save ID.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[90vw] min-w-[360px] md:max-w-[425px] rounded-lg p-4">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-[#050c45]">
                        {id ? 'Edit ID' : 'Create New ID'}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex flex-col space-y-1">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            defaultValue={id?.name || ''}
                            className="w-full !ring-[#e49400] focus:ring-2"
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <Label htmlFor="code">Code</Label>
                        <Input
                            id="code"
                            name="code"
                            defaultValue={id?.code || ''}
                            className="w-full !ring-[#e49400] focus:ring-2"
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <Label htmlFor="cin">CIN</Label>
                        <Input
                            id="cin"
                            name="cin"
                            defaultValue={id?.cin || ''}
                            className="w-full !ring-[#e49400] focus:ring-2"
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <Label htmlFor="diploma">Diploma</Label>
                        <Input
                            id="diploma"
                            name="diploma"
                            defaultValue={id?.diploma || ''}
                            className="w-full !ring-[#e49400] focus:ring-2"
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <Label htmlFor="type">Type</Label>
                        <Input
                            id="type"
                            name="type"
                            defaultValue={id?.type || 'EDU'}
                            className="w-full !ring-[#e49400] focus:ring-2"
                        />
                    </div>

                    {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

                    <DialogFooter className="flex md:justify-end gap-3 md:gap-0 space-x-3 pt-4">
                        <Button type="button" className='border border-gray-300 text-gray-700 hover:bg-gray-100' variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading} className="bg-[#e49400] text-white hover:bg-amber-600">
                            {isLoading ? 'Submitting...' : id ? 'Update' : 'Create'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

    )
}
