'use client'

import { useState } from 'react'
import Image from 'next/image'
import { id as Id } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { deleteId } from '@/lib/actions'
import IdForm from './IdForm'
import DeleteConfirmationDialog from './DeleteConfirmationDialog'

export default function IdItem({ id }: { id: Id }) {
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        await deleteId(id.id)
    }

    return (
        <Card className="overflow-hidden">
            <div className="relative h-48 w-full">
                {id.imageUrl ? (
                    <Image
                        src={id.imageUrl}
                        alt={id.name || 'ID image'}
                        layout="fill"
                        objectFit="cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">
                        No image available
                    </div>
                )}
            </div>
            <CardContent className="grid grid-cols-2 gap-4 p-6">
                <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="text-lg font-semibold">{id.name || 'N/A'}</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500">Code</p>
                    <p className="text-lg font-semibold">{id.code || 'N/A'}</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500">CIN</p>
                    <p className="text-lg font-semibold">{id.cin || 'N/A'}</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500">Diploma</p>
                    <p className="text-lg font-semibold">{id.diploma || 'N/A'}</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500">Type</p>
                    <p className="text-lg font-semibold">{id.type || 'N/A'}</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500">Created At</p>
                    <p className="text-lg font-semibold">{id.createdAt.toLocaleDateString()}</p>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2 bg-gray-50 p-6">
                <Button onClick={() => setIsEditing(true)}>Edit</Button>
                <Button variant="destructive" onClick={() => setIsDeleting(true)}>Delete</Button>
            </CardFooter>
            <IdForm id={id} isOpen={isEditing} onClose={() => setIsEditing(false)} />
            <DeleteConfirmationDialog
                isOpen={isDeleting}
                onClose={() => setIsDeleting(false)}
                onConfirm={handleDelete}
                itemName={id.name || 'this ID'}
            />
        </Card>
    )
}