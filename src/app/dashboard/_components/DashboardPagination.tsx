import Link from 'next/link'

interface DashboardPaginationProps {
    basePath: string
    currentPage: number
    totalPages: number
}

function getPageHref(basePath: string, page: number) {
    return page <= 1 ? basePath : `${basePath}?page=${page}`
}

function getVisiblePages(currentPage: number, totalPages: number) {
    const pages = new Set([1, totalPages])

    for (let page = currentPage - 1; page <= currentPage + 1; page += 1) {
        if (page >= 1 && page <= totalPages) {
            pages.add(page)
        }
    }

    return Array.from(pages).sort((a, b) => a - b)
}

export default function DashboardPagination({
    basePath,
    currentPage,
    totalPages,
}: DashboardPaginationProps) {
    if (totalPages <= 1) return null

    const pages = getVisiblePages(currentPage, totalPages)

    return (
        <nav className="mt-8 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
            <Link
                href={getPageHref(basePath, Math.max(1, currentPage - 1))}
                className={`rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-[#050c45] hover:bg-gray-100 ${currentPage <= 1 ? 'pointer-events-none opacity-50' : ''
                    }`}
                aria-disabled={currentPage <= 1}
            >
                Previous
            </Link>

            {pages.map((page, index) => {
                const previousPage = pages[index - 1]
                const shouldShowGap = previousPage && page - previousPage > 1

                return (
                    <span key={page} className="flex items-center gap-2">
                        {shouldShowGap ? <span className="px-1 text-sm text-gray-400">...</span> : null}
                        <Link
                            href={getPageHref(basePath, page)}
                            aria-current={page === currentPage ? 'page' : undefined}
                            className={`rounded-md border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-100 ${page === currentPage ? 'bg-[#050c45] text-white hover:bg-[#050c45]' : 'text-[#050c45]'
                                }`}
                        >
                            {page}
                        </Link>
                    </span>
                )
            })}

            <Link
                href={getPageHref(basePath, Math.min(totalPages, currentPage + 1))}
                className={`rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-[#050c45] hover:bg-gray-100 ${currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''
                    }`}
                aria-disabled={currentPage >= totalPages}
            >
                Next
            </Link>
        </nav>
    )
}
