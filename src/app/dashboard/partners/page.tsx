import { Suspense } from 'react'
import { getServerSession } from 'next-auth'
import { notFound, redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/auth'
import DashboardNav from '../_components/DashboardNav'
import PartnerCreateButton from '../_components/PartnerCreateButton'
import PartnerList from '../_components/PartnerList'

export default async function PartnersPage() {
    const session = await getServerSession(authOptions)
    const user = session?.user

    if (!user) {
        const callbackUrl = "/dashboard/partners"
        redirect("/login?callbackUrl=" + encodeURIComponent(callbackUrl))
    }

    if (user.role !== "ADMIN") notFound()

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">
            <div className="space-y-2">
                <h1 className="text-3xl md:text-5xl font-extrabold text-[#050c45]">Partners</h1>
                <p className="text-sm md:text-base text-gray-600">
                    Manage partner logos, websites, ordering, and publish state.
                </p>
            </div>

            <DashboardNav active="partners" />

            <div className="space-y-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-[#050c45]">Partner Management</h2>
                        <p className="text-sm text-gray-500">Create, update, publish, reorder, and delete partners.</p>
                    </div>
                    <PartnerCreateButton />
                </div>
                <Suspense fallback={<div className="text-center text-[#050c45] font-medium">Loading partners...</div>}>
                    <PartnerList />
                </Suspense>
            </div>
        </div>
    )
}
