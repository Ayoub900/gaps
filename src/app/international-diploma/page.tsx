import { db } from '@/lib/db/prisma'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import React from 'react'
import FormSubmitButton from '../_components/ui/FormSubmitButton'
import Link from 'next/link'
import Form from './Form'

interface PageProps {
    searchParams: {
        success: string,
        error: string,
    },
}

export const metadata: Metadata = {
    title: "GAPS | Diploma",
    openGraph: {
        images: '/logo_gaps4.png',
    },
};

export default function page({
    searchParams: { success, error },
}: PageProps) {

    return (
        <div className='flex flex-col justify-center p-4 md:p-24'>
            <div className="max-w-2xl mx-auto">

                <h2 className="text-3xl font-bold text-blue-700 mb-6">Get Certified with GAPS</h2>
                <p className="mb-6 text-lg">
                    Boost Your Career with an Internationally Accredited Diploma
                </p>

                <h2 className="text-2xl font-semibold text-blue-700 mb-4">Why Choose a GAPS Diploma?</h2>
                <ul className="list-disc list-inside text-lg space-y-2">
                    <li>- Internationally recognized certification</li>
                    <li>- Practical and career-focused training</li>
                    <li>- Delivered by industry experts and native professionals</li>
                    <li>- Listed in the GAPS Public Registry for global verification</li>
                    <li>- Available 100% online or in hybrid format</li>
                </ul>

                <p className="mt-6 mb-6 text-lg">
                    Whether you&apos;re looking to upskill, change careers, or gain international credibility — GAPS Diplomas are your gateway to professional growth.
                </p>

                <h2 className="text-2xl font-semibold text-blue-700 mb-4">Available Diploma Fields:</h2>
                <ul className="list-disc list-inside text-lg space-y-2">
                    <li>- Information Technology (IT)</li>
                    <li>- Logistics & Supply Chain</li>
                    <li>- Business Management & Administration</li>
                    <li>- Quality Management</li>
                    <li>- Digital Commerce & Marketing</li>
                    <li>- Technical and Service Professions</li>
                    <li>- Sports Professions</li>
                    <li>- Private Security</li>
                    <li>- Social Media Professions</li>
                    <li>- Photography</li>
                    <li>- English, French, Spanish, German, Dutch, Chinese Languages</li>
                </ul>

                <h2 className="text-2xl font-semibold text-blue-700 mt-10 mb-4">Request Your Diploma Now</h2>
                <p className="text-lg mb-4">
                    Fill out the form below and our team will contact you with program details, pricing, and registration steps.
                </p>
            </div>

            {success && success === "1" ?
                <div className="w-2xl mx-auto py-8 px-4 bg-green-600 text-white text-2xl font-bold">
                    Your application has been sent successfully!
                </div>
                : (error && error === "1" ?
                    <div className="w-2xl mx-auto py-8 px-4 bg-red-600 text-white text-2xl font-bold">
                        Something has gone wrong, please try again later!
                    </div>
                    : <Form title={"International diploma"} />
                )
            }
        </div>
    )
}