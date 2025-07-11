import { getApplications } from '@/lib/actions'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Link from 'next/link'

interface Props {
    page?: number
}

export default async function LPSList({ page = 1 }: Props) {
    const pageSize = 20
    const skip = (page - 1) * pageSize

    const { applications, totalCount } = await getApplications({ skip, take: pageSize })

    const buildPageUrl = (pageNum: number) => `?page=${pageNum}`

    return (
        <>
            <Table className="w-full border-collapse border border-gray-200">
                <TableHeader className="bg-[#050c45]/10">
                    <TableRow>
                        <TableHead className="text-left text-sm font-semibold text-[#050c45] px-4 py-2">Name</TableHead>
                        <TableHead className="text-left text-sm font-semibold text-[#050c45] px-4 py-2">Title</TableHead>
                        <TableHead className="text-left text-sm font-semibold text-[#050c45] px-4 py-2">Phone</TableHead>
                        <TableHead className="text-left text-sm font-semibold text-[#050c45] px-4 py-2">Country</TableHead>
                        <TableHead className="text-left text-sm font-semibold text-[#050c45] px-4 py-2">Created At</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applications.map((application) => (
                        <TableRow key={application.id} className="even:bg-gray-50">
                            <TableCell className="px-4 py-2 text-sm text-gray-700">{application.name}</TableCell>
                            <TableCell className={`px-4 py-2 text-sm ${application.title === 'Contact Us Page' && 'bg-green-500/60 '} `}>{application.title}</TableCell>
                            <TableCell className="px-4 py-2 text-sm text-gray-700">{application.phone}</TableCell>
                            <TableCell className="px-4 py-2 text-sm text-gray-700">{application.country}</TableCell>
                            <TableCell className="px-4 py-2 text-sm text-gray-700">{application.createdAt.toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <nav className="mt-6 flex justify-center space-x-2">
                <Link
                    href={buildPageUrl(page - 1)}
                    className={`px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 ${page <= 1 ? 'pointer-events-none opacity-50' : ''
                        }`}
                    aria-disabled={page <= 1}
                >
                    Previous
                </Link>

                {[...Array(totalCount)].map((_, i) => {
                    const pageNum = i + 1
                    return (
                        <Link
                            key={pageNum}
                            href={buildPageUrl(pageNum)}
                            className={`px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 ${pageNum === page ? 'bg-[#050c45] text-white font-bold' : ''
                                }`}
                        >
                            {pageNum}
                        </Link>
                    )
                })}

                <Link
                    href={buildPageUrl(page + 1)}
                    className={`px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 ${page >= totalCount ? 'pointer-events-none opacity-50' : ''
                        }`}
                    aria-disabled={page >= totalCount}
                >
                    Next
                </Link>
            </nav>
        </>
    )
}
