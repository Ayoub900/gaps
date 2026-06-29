import { getPaginatedIds } from '@/lib/actions'
import IdItem from './IdItem'
import DashboardPagination from './DashboardPagination'

interface IdListProps {
    page?: number
}

export default async function IdList({ page = 1 }: IdListProps) {
    const pageSize = 9
    const skip = (page - 1) * pageSize
    const { ids, totalPages } = await getPaginatedIds({ skip, take: pageSize })

    if (ids.length === 0) {
        return (
            <>
                <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center text-sm text-gray-500">
                    No IDs found on this page.
                </div>
                <DashboardPagination basePath="/dashboard" currentPage={page} totalPages={totalPages} />
            </>
        )
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ids.map((id) => (
                    <IdItem key={id.id} id={id} />
                ))}
            </div>
            <DashboardPagination basePath="/dashboard" currentPage={page} totalPages={totalPages} />
        </>
    )
}
