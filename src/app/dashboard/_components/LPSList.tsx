import { getLPForms } from '@/lib/actions'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import LPSStatusCell from './LPSStatusCell'

export default async function LPSList() {
    const forms = await getLPForms()

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
                        <TableCell>{form.phone}</TableCell>
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