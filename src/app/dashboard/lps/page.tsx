import { Suspense } from 'react'
import LPSList from '../_components/LPSList'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/auth'
import { notFound, redirect } from 'next/navigation'
import DashboardNav from '../_components/DashboardNav'

interface LPSPageProps {
    searchParams: { page?: string }
}

export default async function LPSPage({ searchParams }: LPSPageProps) {
    const session = await getServerSession(authOptions)
    const user = session?.user

    if (!user) {
        const callbackUrl = "/dashboard/lps"
        redirect("/login?callbackUrl=" + encodeURIComponent(callbackUrl))
    }

    if (user.role !== "ADMIN" && user.role !== "MANAGER") notFound()

    const page = searchParams.page ? parseInt(searchParams.page) : 1

    return (
        <div className="container mx-auto py-10 px-4 space-y-8">
            <h1 className="text-4xl font-bold mb-8 text-[#050c45]">Landing Page Submissions</h1>
            <DashboardNav active="submissions" />
            <Card className="shadow-md">
                <CardHeader className="border-b border-gray-200">
                    <CardTitle className="text-xl font-semibold text-[#050c45]">Form Submissions</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <Suspense fallback={<div className="text-center py-10 text-gray-500">Loading...</div>}>
                        <LPSList page={page} />
                    </Suspense>
                </CardContent>
            </Card>
        </div>
    )
}
