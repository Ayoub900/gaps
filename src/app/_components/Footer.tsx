import React from "react"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="bg-[#050c45] text-white">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-around items-center gap-10 p-8 md:py-16">
                {/* Logo & Contact */}
                <div className="flex flex-col items-center text-center max-w-sm">
                    <Image
                        src="/logo_gaps8.png"
                        alt="GAPS Logo"
                        width={180}
                        height={180}
                        className="mb-4"
                        priority
                    />
                    <h2 className="text-3xl font-semibold mb-2">
                        Global Academy of Professional Skills
                    </h2>
                    <a
                        href="mailto:academygaps@gmail.com"
                        className="text-white/70 hover:text-[#e49400] transition"
                    >
                        academygaps@gmail.com
                    </a>
                </div>

                {/* Useful Links */}
                <nav className="flex flex-col gap-3 text-center md:text-left">
                    <h3 className="text-2xl font-semibold mb-3">Useful Links</h3>
                    <Link
                        href="/"
                        className="text-white/70 hover:text-[#e49400] underline transition px-2 py-1 rounded"
                    >
                        Home
                    </Link>
                    <Link
                        href="/about"
                        className="text-white/70 hover:text-[#e49400] underline transition px-2 py-1 rounded"
                    >
                        About Us
                    </Link>
                    <Link
                        href="/posts/686a566d0cb9966c44354e0b"
                        className="text-white/70 hover:text-[#e49400] underline transition px-2 py-1 rounded"
                    >
                        Certification
                    </Link>
                    <Link
                        href="/international-diploma"
                        className="text-white/70 hover:text-[#e49400] underline transition px-2 py-1 rounded"
                    >
                        International Diploma
                    </Link>
                    <Link
                        href="/verification"
                        className="text-white/70 hover:text-[#e49400] underline transition px-2 py-1 rounded"
                    >
                        Verification
                    </Link>
                </nav>
            </div>

            {/* Bottom copyright */}
            <div className="bg-blue-950 py-4 text-center text-white/80 text-sm">
                &copy; 2025 GAPS. All rights reserved.
            </div>
        </footer>
    )
}
