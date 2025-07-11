import { getIds } from '@/lib/actions'
import IdItem from './IdItem'

export default async function IdList() {
    const ids = await getIds()

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ids.map((id) => (
                <IdItem key={id.id} id={id} />
            ))}
        </div>

    )
}