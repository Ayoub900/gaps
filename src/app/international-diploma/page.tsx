import { db } from '@/lib/db/prisma'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import React from 'react'
import FormSubmitButton from '../_components/ui/FormSubmitButton'

interface PageProps {
    searchParams: {
        s: '1' | '0'
    }
}

export const metadata: Metadata = {
    title: "ASBA | Diploma",
    openGraph: {
        images: '/logo.png',
    },
};

export default function page({ searchParams: { s } }: PageProps) {
    const handleSubmit = async (formData: FormData) => {
        "use server"
        const name = formData.get('name')?.toString()
        const country = formData.get('country')?.toString()
        const email = formData.get('email')?.toString()
        const phone = Number(formData.get('phone')) | 0
        const whatsapp = Number(formData.get('whatsapp')) | 0
        const job = formData.get('job')?.toString()

        if (!name || !country || !email || !phone || !whatsapp || !job) {
            throw new Error('missing inputs')
        }

        try {
            console.log("start saving to db")
            await db.internationalDiploma.create({
                data: {
                    name,
                    country,
                    phone,
                    whatsapp,
                    email,
                    job,
                }
            })
        } catch (error) {
            console.log('error :', error)
            throw new Error("couldn't save the request!!")
        }

        console.log("finish")
        redirect('?s=1')
    }
    return (
        <div className='flex flex-col justify-center p-4 md:p-24'>
            <form action={handleSubmit} className='p-4 mx-auto bg-white '>
                <h1 className='text-3xl font-semibold'>International Diploma Form</h1>
                <p className='mb-2'>(*) required fields.</p>
                <label className='flex flex-col'>
                    Name *
                    <input name='name' className='p-3 mb-3 border border-gray/70 outline-none' type="text" required />
                </label>
                <label className='flex flex-col'>
                    Country *
                    <input name='country' className='p-3 mb-3 border border-gray/70 outline-none' type="text" required />
                </label>
                <label className='flex flex-col'>
                    Email *
                    <input name='email' className='p-3 mb-3 border border-gray/70 outline-none' type="email" required />
                </label>
                <label className='flex flex-col'>
                    Phone *
                    <input name='phone' className='p-3 mb-3 border border-gray/70 outline-none' type='tel' required />
                </label>
                <label className='flex flex-col'>
                    Whatsapp *
                    <input name='whatsapp' className='p-3 mb-3 border border-gray/70 outline-none' type='tel' required />
                </label>
                <label className='flex flex-col'>
                    job (*)
                    <input name='job' className='p-3 mb-3 border border-gray/70 outline-none' type='tel' required />
                </label>
                {s && s === '1' ? (
                    <div className='p-4 text-green-500'>
                        <h1>your request has been sent!</h1>
                    </div>
                )
                    : <FormSubmitButton>Apply</FormSubmitButton>}
            </form>
        </div>
    )
}