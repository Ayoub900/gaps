import FormSubmitButton from '@/app/_components/ui/FormSubmitButton'
import React from 'react'
import { redirect } from 'next/navigation'
import PersonCard from './PersonCard'
import { Metadata } from 'next'
import { BadgeCheck, SearchCheck, ShieldCheck } from 'lucide-react'

interface PageProps {
    searchParams: {
        q: string
    }
}

export const metadata: Metadata = {
    title: "GAPS | Accreditation Verification",
    openGraph: {
        images: [
            {
                url: 'https://www.gapsacademy.org.uk/logo_gaps1.png',
                width: 800,
                height: 600,
            },
        ],
    },
};

export default function page({ searchParams: { q } }: PageProps) {

    const handleSubmit = async (formData: FormData) => {
        "use server"
        const q = formData.get('q')?.toString().trim()

        if (!q) {
            redirect('/verification')
        }

        redirect('/verification?q=' + encodeURIComponent(q))

    }
    return (
        <main className="min-h-screen bg-[#f8fafc]">
            <section className="bg-[#050c45] px-4 py-12 text-white md:px-24 md:py-16">
                <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_430px] lg:items-center">
                    <div className="max-w-2xl">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#e49400]">Public registry</p>
                        <h1 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">
                            Verify a GAPS certificate or diploma reference.
                        </h1>
                        <p className="mt-4 text-base leading-7 text-white/80 md:text-lg">
                            Search by candidate ID, certificate code, or registry reference to confirm the public certification record.
                        </p>

                        <div className="mt-7 grid gap-3 sm:grid-cols-2">
                            <div className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/10 p-4">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white text-[#050c45]">
                                    <ShieldCheck className="h-5 w-5" />
                                </span>
                                <span className="text-sm font-semibold text-white">Official registry lookup</span>
                            </div>
                            <div className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/10 p-4">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white text-[#050c45]">
                                    <BadgeCheck className="h-5 w-5" />
                                </span>
                                <span className="text-sm font-semibold text-white">Candidate status result</span>
                            </div>
                        </div>
                    </div>

                    <form
                        action={handleSubmit}
                        className="rounded-lg border border-white/10 bg-white p-5 text-[#050c45] shadow-xl sm:p-6"
                    >
                        <div className="flex items-center gap-3">
                            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-[#050c45] text-white">
                                <SearchCheck className="h-5 w-5" />
                            </span>
                            <div>
                                <h2 className="text-xl font-bold">Certificate lookup</h2>
                                <p className="text-sm text-gray-600">Enter the public reference exactly as shown.</p>
                            </div>
                        </div>

                        <label htmlFor="q" className="mt-6 block text-sm font-semibold text-[#050c45]">
                            ID or certificate reference
                        </label>
                        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                            <input
                                id="q"
                                className="min-w-0 flex-1 rounded-md border border-gray-300 px-4 py-3 outline-none transition focus:border-[#e49400] focus:ring-2 focus:ring-[#e49400]/25"
                                name="q"
                                type="text"
                                placeholder="Example: GAPS/2026/001"
                                defaultValue={q ?? ''}
                                required
                            />
                            <FormSubmitButton className="h-12 shrink-0 rounded-md px-6 font-semibold">
                                Search
                            </FormSubmitButton>
                        </div>
                    </form>
                </div>
            </section>

            {q && (
                <section className="px-4 py-10 md:px-24">
                    <div className="mx-auto w-full max-w-3xl">
                        <PersonCard q={q} />
                    </div>
                </section>
            )}
        </main>

    )
}
