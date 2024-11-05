import { Suspense } from 'react'
import LPSList from '../_components/LPSList'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/auth'
import { notFound, redirect } from 'next/navigation'

export default async function LPSPage() {
    const session = await getServerSession(authOptions)
    const user = session?.user

    if (!user) {
        const callbackUrl = "/dashboard/lps"
        redirect("/login?callbackUrl=" + encodeURIComponent(callbackUrl))
    }

    if (user.role !== "ADMIN" && user.role !== "MANAGER") notFound()
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold mb-8">Landing Page Submissions</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Form Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Suspense fallback={<div>Loading...</div>}>
                        <LPSList />
                    </Suspense>
                </CardContent>
            </Card>
        </div>
    )
}