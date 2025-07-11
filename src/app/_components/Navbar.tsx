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
            <h1 className="leading-[14px] text-xl font-bold text-red-bg-red-950">GAPS Academy</h1>
        </Link>
    )
}

export default function Navbar() {
    return (
        <>
            <nav className="hidden md:flex justify-between items-center bg-white py-2 px-4 max-w-7xl mx-auto">
                <LogoTitle />
                <div className="flex items-center gap-1 text-black font-semibold">
                    <Link href="/" className="p-4 hover:text-[#e49400] transition duration-300">Home</Link>
                    <Link href="/posts/686a566d0cb9966c44354e0b" className="p-4 hover:text-[#e49400] transition duration-300">Certification</Link>
                    <Link href="/international-diploma" className="p-4 hover:text-[#e49400] transition duration-300">International Diploma</Link>
                    <Link href="/verification" className="p-4 hover:text-[#e49400] transition duration-300">Verification</Link>
                    <Link href="/about" className="p-4 hover:text-[#e49400] transition duration-300">About Us</Link>
                </div>
            </nav>

            <nav className="flex md:hidden justify-between items-center bg-white py-2 px-4">
                <LogoTitle />
                <PhoneNavbar />
            </nav>
        </>
    )
}
