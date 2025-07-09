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
        <div className='flex flex-col justify-center bg-gray-200 p-4 md:p-24'>
            <form action={handleSubmit} className='p-4 mx-auto bg-white shadow-lg mb-4 min-w-[300px] w-full max-w-[560px]'>
                <h1 className='text-3xl font-semibold text-secondery mb-3'>Type your Id to search:</h1>
                <div className='flex flex-col md:flex-row gap-2 w-full'>
                    <input className='p-3 border border-gray/70 w-full outline-none' name='q' type="text" required />
                    <FormSubmitButton>Search</FormSubmitButton>
                </div>
            </form>

            {q && <PersonCard q={q} />}
        </div>
    )
}