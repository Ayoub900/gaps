import { Suspense } from 'react'
import IdList from './_components/IdList'
import IdCreateButton from './_components/IdCreateButton'
import DashboardNav from './_components/DashboardNav'

interface DashboardPageProps {
    page?: number
}

export default function DashboardPage({ page = 1 }: DashboardPageProps) {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">
            <div className="space-y-2">
                <h1 className="text-3xl md:text-5xl font-extrabold text-[#050c45]">Dashboard</h1>
                <p className="text-sm md:text-base text-gray-600">
                    Manage verification IDs.
                </p>
            </div>

            <DashboardNav active="ids" />

            <div className="space-y-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-[#050c45]">Verification IDs</h2>
                        <p className="text-sm text-gray-500">Create and update public certificate records.</p>
                    </div>
                    <IdCreateButton />
                </div>
                <Suspense fallback={<div className="text-center text-[#050c45] font-medium">Loading IDs...</div>}>
                    <IdList page={page} />
                </Suspense>
            </div>
        </div>
    )
}
