'use client'

import { useState } from 'react'
import { Suspense } from 'react'
import IdList from './_components/IdList'
import IdForm from './_components/IdForm'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
    const [isCreating, setIsCreating] = useState(false)

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex items-center justify-between mb-10">
                <h1 className="text-5xl font-extrabold text-[#050c45]">ID Dashboard</h1>
                <Button
                    className="bg-[#e49400] text-white hover:bg-amber-600 px-6 py-3 font-semibold"
                    onClick={() => setIsCreating(true)}
                >
                    Add New ID
                </Button>
            </div>
            <Suspense fallback={<div className="text-center text-[#050c45] font-medium">Loading...</div>}>
                <IdList />
            </Suspense>
            <IdForm isOpen={isCreating} onClose={() => setIsCreating(false)} />
        </div>
    )
}
