import Link from 'next/link'

const navItems = [
    { href: '/dashboard', label: 'IDs', key: 'ids' },
    { href: '/dashboard/events', label: 'Events', key: 'events' },
    { href: '/dashboard/partners', label: 'Partners', key: 'partners' },
    { href: '/dashboard/lps', label: 'Submissions', key: 'submissions' },
]

interface DashboardNavProps {
    active: 'ids' | 'events' | 'partners' | 'submissions'
}

export default function DashboardNav({ active }: DashboardNavProps) {
    return (
        <nav className="flex flex-wrap gap-2 rounded-lg border border-gray-200 bg-white p-2 shadow-sm">
            {navItems.map((item) => {
                const isActive = item.key === active

                return (
                    <Link
                        key={item.key}
                        href={item.href}
                        aria-current={isActive ? 'page' : undefined}
                        className={`rounded-md px-4 py-2 text-sm font-semibold transition ${isActive
                            ? 'bg-[#050c45] text-white'
                            : 'text-[#050c45] hover:bg-[#050c45]/10'
                            }`}
                    >
                        {item.label}
                    </Link>
                )
            })}
        </nav>
    )
}
