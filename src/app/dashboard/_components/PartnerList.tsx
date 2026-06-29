import { getPartners } from '@/lib/actions'
import PartnerItem from './PartnerItem'

export default async function PartnerList() {
    const partners = await getPartners()

    if (partners.length === 0) {
        return (
            <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center text-sm text-gray-500">
                No partners have been created yet.
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner) => (
                <PartnerItem key={partner.id} partner={partner} />
            ))}
        </div>
    )
}
