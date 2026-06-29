import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Form from './Form'

interface PageProps {
    searchParams: {
        success: string
        error: string
    }
}

export const metadata: Metadata = {
    title: 'GAPS | Diploma',
    openGraph: {
        images: '/logo_gaps4.png',
    },
}

export default function page({ searchParams: { success, error } }: PageProps) {
    return (
        <div className="flex flex-col justify-center bg-[#f8fafc] p-4 md:p-24">
            <div className="max-w-5xl mx-auto">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#e49400]">Diploma pathways</p>
                <h2 className="mt-2 text-4xl font-bold text-[#050c45] mb-6">Get Certified with GAPS</h2>
                <p className="mb-8 text-lg text-gray-700">
                    Boost Your Career with an Internationally Accredited Diploma
                </p>

                <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start mb-12">
                    <div className="overflow-hidden rounded-lg border border-[#050c45]/10 bg-white shadow-sm">
                        <div className="relative aspect-[3/4] w-full bg-gray-100">
                            <Image
                                src="/documents/gaps-diploma-preview.png"
                                alt="GAPS international diploma sample preview"
                                fill
                                className="object-cover object-top"
                                sizes="(max-width: 1024px) 100vw, 520px"
                                priority
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-lg border border-[#050c45]/10 bg-white p-6 shadow-sm">
                            <h3 className="text-2xl font-semibold text-[#050c45] mb-4">Diploma Sample</h3>
                            <p className="text-gray-700 leading-7 mb-5">
                                Preview the diploma layout, validation link, serial number format, and official GAPS registration details.
                            </p>
                            <Link
                                href="/documents/gaps-diploma.pdf"
                                target="_blank"
                                className="inline-flex items-center justify-center rounded-md bg-[#e49400] px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-600"
                            >
                                Open PDF Sample
                            </Link>
                        </div>

                        <div className="rounded-lg border border-[#050c45]/10 bg-white p-6 shadow-sm">
                            <Image
                                src="/ukrlp-badge.svg"
                                width={360}
                                height={150}
                                alt="UKRLP UK Register of Learning Providers badge"
                                className="w-full max-w-[360px]"
                            />
                            <p className="mt-4 text-sm leading-6 text-gray-600">
                                GAPS diploma documents include UK Register of Learning Providers reference details and a public verification link.
                            </p>
                        </div>
                    </div>
                </section>

                <h2 className="text-3xl font-semibold text-[#050c45] mb-4">Why Choose a GAPS Diploma?</h2>
                <ul className="list-disc list-inside text-lg space-y-2 text-[#050c45]">
                    <li>Internationally recognized certification</li>
                    <li>Practical and career-focused training</li>
                    <li>Delivered by industry experts and native professionals</li>
                    <li>Listed in the GAPS Public Registry for global verification</li>
                    <li>Available 100% online or in hybrid format</li>
                </ul>

                <p className="mt-8 mb-8 text-lg text-[#050c45]">
                    Whether you&apos;re looking to upskill, change careers, or gain international credibility — GAPS Diplomas are your gateway to professional growth.
                </p>

                <h2 className="text-3xl font-semibold text-[#050c45] mb-4">Available Diploma Fields:</h2>
                <ul className="list-disc list-inside text-lg space-y-2 text-[#050c45]">
                    <li>Information Technology (IT)</li>
                    <li>Logistics & Supply Chain</li>
                    <li>Business Management & Administration</li>
                    <li>Quality Management</li>
                    <li>Digital Commerce & Marketing</li>
                    <li>Technical and Service Professions</li>
                    <li>Sports Professions</li>
                    <li>Health & Safety Management</li>
                    <li>Automobile Diagnosis</li>
                    <li>Fashion Stylist And Model Making</li>
                    <li>Mobile Phone Repair And Maintenance</li>
                    <li>English, French, Spanish, German, Dutch, Chinese Languages</li>
                </ul>

                <h2 className="text-3xl font-semibold text-[#050c45] mt-12 mb-4">Request Your Diploma Now</h2>
                <p className="text-lg mb-8 text-[#050c45]">
                    Fill out the form below and our team will contact you with program details, pricing, and registration steps.
                </p>
            </div>

            {success === '1' ? (
                <div className="max-w-2xl mx-auto py-8 px-6 bg-green-600 text-white text-2xl font-bold rounded-md text-center">
                    Your application has been sent successfully!
                </div>
            ) : error === '1' ? (
                <div className="max-w-2xl mx-auto py-8 px-6 bg-red-600 text-white text-2xl font-bold rounded-md text-center">
                    Something has gone wrong, please try again later!
                </div>
            ) : (
                <Form title="International diploma" />
            )}
        </div>
    )
}
