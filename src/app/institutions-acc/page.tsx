import { db } from '@/lib/db/prisma'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import React from 'react'
import FormSubmitButton from '../_components/ui/FormSubmitButton'
import Link from 'next/link'

interface PageProps {
    searchParams: {
        s: '1' | '0'
    }
}

export const metadata: Metadata = {
    title: "ASBA | Accreditation",
    openGraph: {
        images: '/logo.png',
    },
};

export default function page({ searchParams: { s } }: PageProps) {
    const handleSubmit = async (formData: FormData) => {
        "use server"
        const organizationName = formData.get('organizationName')?.toString()
        const ownerName = formData.get('ownerName')?.toString()
        const country = formData.get('country')?.toString()
        const email = formData.get('email')?.toString()
        const phone = Number(formData.get('phone')) | 0
        const whatsapp = Number(formData.get('whatsapp')) | 0
        const website = formData.get('website')?.toString()
        const facebook = formData.get('facebook')?.toString()
        const field = formData.get('field')?.toString()

        if (!organizationName || !ownerName || !country || !email || !phone || !whatsapp || !field) {
            throw new Error('missing inputs')
        }

        try {
            await db.institutionsAcc.create({
                data: {
                    organizationName,
                    ownerName,
                    country,
                    phone,
                    whatsapp,
                    email,
                    field,
                    facebook,
                    website
                }
            })
        } catch (error) {
            console.log('error :', error)
            throw new Error("couldn't save the request!!")
        }

        redirect('?s=1')
    }
    return (
        <div className='flex flex-col justify-center p-4 md:p-24'>
            <form action={handleSubmit} className='p-4 mx-auto bg-white max-w-3xl'>
                <p className='mb-8'>
                    <h1 className='text-3xl font-semibold'>Accreditation</h1>
                    <br />
                    If you are an organization or training or educational center, here is your right place to obtain excellence.
                    <br />
                    <br />
                    Under the supervision of <strong className='font-semibold'>GA-SKILLS®</strong> <Link className='underline text-blue-600' href={"https://www.ga-skills.org.uk"}>www.ga-skills.org.uk</Link>
                    <br />
                    <br />
                    You can obtain the name of :
                    <br />
                    <br />
                    An accredited organization.
                    An accredited agent.
                    An accredited exclusive agent in you country.
                    To learn more about the conditions, features and fees,
                    fill out the form and we will get back to you as soon as possible.
                    <br />
                    <br />
                </p>
                <h1 className='text-3xl font-semibold'>Accreditation Of Institutions Form</h1>
                <p className='mb-2'>(*) required fields.</p>
                <label className='flex flex-col'>
                    Name of organization *
                    <input name='organizationName' className='p-3 mb-3 border border-gray/70 outline-none' type="text" required />
                </label>
                <label className='flex flex-col'>
                    Name of owner/manager *
                    <input name='ownerName' className='p-3 mb-3 border border-gray/70 outline-none' type="text" required />
                </label>
                <label className='flex flex-col'>
                    Country *
                    <input name='country' className='p-3 mb-3 border border-gray/70 outline-none' type="text" required />
                </label>
                <label className='flex flex-col'>
                    Filed/profession *
                    <input name='field' className='p-3 mb-3 border border-gray/70 outline-none' type='text' required />
                </label>
                <label className='flex flex-col'>
                    Website
                    <input name='website' className='p-3 mb-3 border border-gray/70 outline-none' type='text' />
                </label>
                <label className='flex flex-col'>
                    Facebook
                    <input name='facebook' className='p-3 mb-3 border border-gray/70 outline-none' type='text' />
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