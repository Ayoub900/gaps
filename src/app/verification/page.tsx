import FormSubmitButton from '@/app/_components/ui/FormSubmitButton'
import React from 'react'
import { redirect } from 'next/navigation'
import PersonCard from './PersonCard'
import { Metadata } from 'next'

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
        const q = formData.get('q')?.toString()
        redirect('?q=' + q)

    }
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-[#f4f6fb] px-4 md:px-24 py-12">
            <form
                action={handleSubmit}
                className="bg-white shadow-xl rounded-2xl w-full max-w-[560px] p-6 md:p-10 border border-gray-100"
            >
                <h1 className="text-2xl md:text-3xl font-bold text-[#050c45] mb-6">
                    Verify Your Identity
                </h1>
                <p className="text-sm text-gray-600 mb-6">
                    Enter your ID below to search for your account.
                </p>
                <div className="flex flex-col md:flex-row gap-3">
                    <input
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#e49400]"
                        name="q"
                        type="text"
                        placeholder="Enter your ID"
                        required
                    />
                    <FormSubmitButton className="bg-[#e49400] text-white font-semibold px-6 py-3 rounded-lg hover:bg-opacity-90 transition">
                        Search
                    </FormSubmitButton>
                </div>
            </form>

            {q && (
                <div className="mt-8 w-full max-w-[560px]">
                    <PersonCard q={q} />
                </div>
            )}
        </div>

    )
}