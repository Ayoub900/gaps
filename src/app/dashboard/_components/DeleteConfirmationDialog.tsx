'use client'

import { useState, type MouseEvent } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface DeleteConfirmationDialogProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void | Promise<void>
    itemName: string
    resourceLabel?: string
}

export default function DeleteConfirmationDialog({
    isOpen,
    onClose,
    onConfirm,
    itemName,
    resourceLabel = 'item',
}: DeleteConfirmationDialogProps) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState('')

    const handleConfirm = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        setIsDeleting(true)
        setError('')

        try {
            await onConfirm()
            onClose()
        } catch (confirmError) {
            setError(confirmError instanceof Error ? confirmError.message : `Unable to delete this ${resourceLabel}.`)
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete {itemName}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the {resourceLabel} from the database.
                    </AlertDialogDescription>
                    {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm} disabled={isDeleting}>
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
