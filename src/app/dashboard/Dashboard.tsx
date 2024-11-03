'use client'

import { useState } from 'react'
import { Suspense } from 'react'
import IdList from './_components/IdList'
import IdForm from './_components/IdForm'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
    const [isCreating, setIsCreating] = useState(false)

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold">ID Dashboard</h1>
                <Button onClick={() => setIsCreating(true)}>Add New ID</Button>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <IdList />
            </Suspense>
            <IdForm isOpen={isCreating} onClose={() => setIsCreating(false)} />
        </div>
    )
}