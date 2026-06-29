'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { id as Id } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { deleteId } from '@/lib/actions'
import IdForm from './IdForm'
import DeleteConfirmationDialog from './DeleteConfirmationDialog'

export default function IdItem({ id }: { id: Id }) {
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        await deleteId(id.id)
        router.refresh()
    }

    return (
        <Card className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
            <CardContent className="grid grid-cols-2 gap-6 p-6">
                <div>
                    <p className="text-sm font-medium text-[#6b7280]">Name</p>
                    <p className="text-lg font-semibold text-[#050c45]">{id.name || 'N/A'}</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-[#6b7280]">Code</p>
                    <p className="text-lg font-semibold text-[#050c45]">{id.code || 'N/A'}</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-[#6b7280]">CIN</p>
                    <p className="text-lg font-semibold text-[#050c45]">{id.cin || 'N/A'}</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-[#6b7280]">Diploma</p>
                    <p className="text-lg font-semibold text-[#050c45]">{id.diploma || 'N/A'}</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-[#6b7280]">Type</p>
                    <p className="text-lg font-semibold text-[#050c45]">{id.type || 'N/A'}</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-[#6b7280]">Created At</p>
                    <p className="text-lg font-semibold text-[#050c45]">{id.createdAt.toLocaleDateString()}</p>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2 bg-gray-50 p-6">
                <Button type="button" className='bg-[#050c45] hover:bg-blue-900' onClick={() => setIsEditing(true)}>Edit</Button>
                <Button type="button" variant="destructive" onClick={() => setIsDeleting(true)}>Delete</Button>
            </CardFooter>
            <IdForm id={id} isOpen={isEditing} onClose={() => setIsEditing(false)} />
            <DeleteConfirmationDialog
                isOpen={isDeleting}
                onClose={() => setIsDeleting(false)}
                onConfirm={handleDelete}
                itemName={id.name || 'this ID'}
                resourceLabel="ID"
            />
        </Card>
    )
}
