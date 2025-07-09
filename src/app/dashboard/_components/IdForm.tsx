'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        const formData = new FormData(event.currentTarget)

        try {
            if (id) {
                await updateId(id.id, formData)
            } else {
                await createId(formData)
            }
            onClose()
        } catch (error) {
            console.error('Error submitting form:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{id ? 'Edit ID' : 'Create New ID'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" defaultValue={id?.name || ''} />
                    </div>
                    <div>
                        <Label htmlFor="code">Code</Label>
                        <Input id="code" name="code" defaultValue={id?.code || ''} />
                    </div>
                    <div>
                        <Label htmlFor="cin">CIN</Label>
                        <Input id="cin" name="cin" defaultValue={id?.cin || ''} />
                    </div>
                    <div>
                        <Label htmlFor="diploma">Diploma</Label>
                        <Input id="diploma" name="diploma" defaultValue={id?.diploma || ''} />
                    </div>
                    <div>
                        <Label htmlFor="type">Type</Label>
                        <Input id="type" name="type" defaultValue={id?.type || 'EDU'} />
                    </div>
                    {/* <div>
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <Input
                            id="imageUrl"
                            name="imageUrl"
                            defaultValue={id?.imageUrl || ''}
                            onChange={handleImageUrlChange}

                        />
                    </div> */}

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Submitting...' : (id ? 'Update' : 'Create')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}