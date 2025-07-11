"use client"
import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function PhoneNavbar() {
    const [isActive, setIsActive] = useState(false)

    const toggleMenu = () => setIsActive((prev) => !prev)

    return (
        <>
            {/* Burger Button */}
            <button
                aria-label="Toggle menu"
                aria-expanded={isActive}
                aria-controls="mobile-menu"
                onClick={toggleMenu}
                className="p-2 rounded-lg bg-[#e49400] focus:outline-none focus:ring-2 focus:ring-[#e49400]"
            >
                <Image
                    src="/burger.svg"
                    alt="Menu"
                    width={24}
                    height={24}
                    className={`transition-transform duration-300 ease-in-out ${isActive ? "rotate-180" : ""}`}
                />
            </button>

            {/* Mobile Menu */}
            <nav
                id="mobile-menu"
                className={`fixed inset-0 bg-white z-50 flex flex-col justify-center items-center gap-6 p-6 transition-transform duration-300 ease-in-out ${isActive ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <button
                    aria-label="Close menu"
                    onClick={toggleMenu}
                    className="absolute top-4 right-4 p-2 rounded-lg bg-[#e49400] focus:outline-none focus:ring-2 focus:ring-[#e49400]"
                >
                    <Image src="/arrow.svg" alt="Close" width={24} height={24} className="rotate-90" />
                </button>

                <Link href="/" className="text-black font-semibold text-lg hover:text-[#e49400]" onClick={toggleMenu}>
                    Home
                </Link>
                <Link href="/posts/686a566d0cb9966c44354e0b" className="text-black font-semibold text-lg hover:text-[#e49400]" onClick={toggleMenu}>
                    Certification
                </Link>
                <Link href="/international-diploma" className="text-black font-semibold text-lg hover:text-[#e49400]" onClick={toggleMenu}>
                    International Diploma
                </Link>
                <Link href="/verification" className="text-black font-semibold text-lg hover:text-[#e49400]" onClick={toggleMenu}>
                    Verification
                </Link>
                <Link href="/about" className="text-black font-semibold text-lg hover:text-[#e49400]" onClick={toggleMenu}>
                    About Us
                </Link>
                <Link href="/contact" className="text-black font-semibold text-lg hover:text-[#e49400]" onClick={toggleMenu}>
                    Contact Us
                </Link>
            </nav>
        </>
    )
}
