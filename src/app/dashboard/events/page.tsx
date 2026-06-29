import { Suspense } from 'react'
import { getServerSession } from 'next-auth'
import { notFound, redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/auth'
import DashboardNav from '../_components/DashboardNav'
import EventCreateButton from '../_components/EventCreateButton'
import EventList from '../_components/EventList'

interface EventsPageProps {
    searchParams: { page?: string }
}

function getCurrentPage(page?: string) {
    const parsedPage = Number.parseInt(page || '1', 10)
    return Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
    const session = await getServerSession(authOptions)
    const user = session?.user

    if (!user) {
        const callbackUrl = "/dashboard/events"
        redirect("/login?callbackUrl=" + encodeURIComponent(callbackUrl))
    }

    if (user.role !== "ADMIN") notFound()

    const page = getCurrentPage(searchParams.page)

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">
            <div className="space-y-2">
                <h1 className="text-3xl md:text-5xl font-extrabold text-[#050c45]">Events</h1>
                <p className="text-sm md:text-base text-gray-600">
                    Publish event cards with uploaded images.
                </p>
            </div>

            <DashboardNav active="events" />

            <div className="space-y-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-[#050c45]">Event Management</h2>
                        <p className="text-sm text-gray-500">Create, update, publish, and delete events.</p>
                    </div>
                    <EventCreateButton />
                </div>
                <Suspense fallback={<div className="text-center text-[#050c45] font-medium">Loading events...</div>}>
                    <EventList page={page} />
                </Suspense>
            </div>
        </div>
    )
}
