import { getPaginatedEvents } from '@/lib/actions'
import DashboardPagination from './DashboardPagination'
import EventItem from './EventItem'

interface EventListProps {
    page?: number
}

export default async function EventList({ page = 1 }: EventListProps) {
    const pageSize = 9
    const skip = (page - 1) * pageSize
    const { events, totalPages } = await getPaginatedEvents({ skip, take: pageSize })

    if (events.length === 0) {
        return (
            <>
                <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center text-sm text-gray-500">
                    No events found on this page.
                </div>
                <DashboardPagination basePath="/dashboard/events" currentPage={page} totalPages={totalPages} />
            </>
        )
    }

    return (
        <>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                    <EventItem key={event.id} event={event} />
                ))}
            </div>
            <DashboardPagination basePath="/dashboard/events" currentPage={page} totalPages={totalPages} />
        </>
    )
}
