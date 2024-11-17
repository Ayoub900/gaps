import { getLPForms } from '@/lib/actions'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import LPSStatusCell from './LPSStatusCell'
import Link from 'next/link'

export default async function Component() {
    const forms = await getLPForms()

    const formatPhoneForWhatsApp = (phone: string) => {
        return phone.replace(/[\s-]/g, '')
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>LP</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Has Experience</TableHead>
                    <TableHead>Has Diplomas</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Field</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {forms.map((form) => (
                    <TableRow key={form.id}>
                        <TableCell>{form.lp}</TableCell>
                        <TableCell>{form.name}</TableCell>
                        <TableCell>{form.hasExp}</TableCell>
                        <TableCell>{form.hasDiplomas}</TableCell>
                        <TableCell>
                            <Link
                                href={`https://wa.me/${formatPhoneForWhatsApp(form.phone)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                {form.phone}
                            </Link>
                        </TableCell>
                        <TableCell>{form.field}</TableCell>
                        <TableCell>{form.createdAt.toLocaleString()}</TableCell>
                        <TableCell>
                            <LPSStatusCell formId={form.id} initialStatus={form.status} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}