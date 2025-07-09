import { getApplications } from '@/lib/actions'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default async function Component() {
    const applications = await getApplications()

    const formatPhoneForWhatsApp = (phone: string) => {
        return phone.replace(/[\s-]/g, '')
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>title</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>counyry</TableHead>
                    <TableHead>Created At</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {applications.map((application) => (
                    <TableRow key={application.id}>
                        <TableCell>{application.name}</TableCell>
                        <TableCell>{application.title}</TableCell>
                        <TableCell>{application.phone}</TableCell>
                        <TableCell>{application.country}</TableCell>
                        <TableCell>{application.createdAt.toLocaleString()}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}