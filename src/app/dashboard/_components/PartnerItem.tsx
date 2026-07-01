'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { partner as PartnerRecord } from '@prisma/client'
import { ExternalLink, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { deletePartner } from '@/lib/actions'
import DeleteConfirmationDialog from './DeleteConfirmationDialog'
import PartnerForm from './PartnerForm'

export default function PartnerItem({ partner }: { partner: PartnerRecord }) {
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        await deletePartner(partner.id)
        router.refresh()
    }

    return (
        <Card className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
            <div className="relative h-40 bg-white">
                <Image
                    src={partner.imageUrl}
                    alt={partner.name}
                    fill
                    unoptimized={partner.imageUrl.startsWith('/uploads/')}
                    className="object-contain p-6"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${partner.publish ? 'bg-green-600 text-white' : 'bg-gray-900 text-white'}`}>
                    {partner.publish ? 'Published' : 'Draft'}
                </span>
            </div>

            <CardContent className="space-y-3 p-6">
                <div>
                    <h3 className="text-xl font-bold text-[#050c45]">{partner.name}</h3>
                    <p className="text-sm text-gray-500">Order: {partner.sortOrder}</p>
                </div>
                {partner.website ? (
                    <Link
                        href={partner.website}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-[#050c45] hover:text-[#e49400]"
                    >
                        <ExternalLink className="h-4 w-4" />
                        Open website
                    </Link>
                ) : null}
            </CardContent>

            <CardFooter className="flex justify-end gap-2 bg-gray-50 p-6">
                <Button type="button" className="bg-[#050c45] hover:bg-blue-900" onClick={() => setIsEditing(true)}>
                    <Pencil className="h-4 w-4" />
                    Edit
                </Button>
                <Button type="button" variant="destructive" onClick={() => setIsDeleting(true)}>
                    <Trash2 className="h-4 w-4" />
                    Delete
                </Button>
            </CardFooter>

            <PartnerForm partner={partner} isOpen={isEditing} onClose={() => setIsEditing(false)} />
            <DeleteConfirmationDialog
                isOpen={isDeleting}
                onClose={() => setIsDeleting(false)}
                onConfirm={handleDelete}
                itemName={partner.name}
                resourceLabel="partner"
            />
        </Card>
    )
}
