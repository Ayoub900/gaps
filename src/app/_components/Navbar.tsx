import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import PhoneNavbar from './PhoneNavbar'

function LogoTitle() {
    return (
        <Link href="/" className="flex items-center gap-2">
            <Image
                src="/logo_gaps5.png"
                alt="GAPS Academy Logo"
                width={80}
                height={80}
                className="max-h-[65px] max-w-[65px] lg:max-h-[80px] lg:max-w-[80px]"
                priority
            />
            <h1 className="leading-tight text-xl font-bold text-[#050c45]">GAPS Academy</h1>
        </Link>
    )
}

export default function Navbar() {
    return (
        <>
            <nav className="sticky top-0 z-40 hidden border-b border-gray-100 bg-white/95 px-4 shadow-sm backdrop-blur md:block">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <LogoTitle />
                    <div className="flex items-center gap-1 text-sm font-semibold text-[#050c45]">
                        <Link href="/" className="px-3 py-5 hover:text-[#e49400] transition duration-300">Home</Link>
                        <Link href="/posts/686a566d0cb9966c44354e0b" className="px-3 py-5 hover:text-[#e49400] transition duration-300">Certification</Link>
                        <Link href="/international-diploma" className="px-3 py-5 hover:text-[#e49400] transition duration-300">International Diploma</Link>
                        <Link href="/verification" className="px-3 py-5 hover:text-[#e49400] transition duration-300">Verification</Link>
                        <Link href="/about" className="px-3 py-5 hover:text-[#e49400] transition duration-300">About Us</Link>
                        <Link href="/contact" className="px-3 py-5 hover:text-[#e49400] transition duration-300">Contact Us</Link>
                    </div>
                </div>
            </nav>

            <nav className="sticky top-0 z-40 flex md:hidden justify-between items-center border-b border-gray-100 bg-white/95 py-2 px-4 shadow-sm backdrop-blur">
                <LogoTitle />
                <PhoneNavbar />
            </nav>
        </>
    )
}
