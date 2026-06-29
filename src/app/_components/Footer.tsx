import React from "react"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="bg-[#050c45] text-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-14 p-4 py-6 md:py-12">
                {/* Logo & Contact */}
                <div className="flex flex-col items-center text-center space-y-2">
                    <Image
                        src="/logo_gaps8.png"
                        alt="GAPS Logo"
                        width={180}
                        height={180}
                        className="mb-2"
                        priority
                    />
                    <h2 className="text-2xl font-semibold">
                        Global Academy of Professional Skills
                    </h2>
                    <a
                        href="mailto:academygaps@gmail.com"
                        className="text-white/70 hover:text-[#e49400] transition"
                    >
                        academygaps@gmail.com
                    </a>
                </div>

                {/* Site Links */}
                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold mb-2">Site Links</h3>
                    <Link href="/" className="text-white/70 hover:text-[#e49400] transition">Home</Link>
                    <Link href="/about" className="text-white/70 hover:text-[#e49400] transition">About Us</Link>
                    <Link href="/posts/686a566d0cb9966c44354e0b" className="text-white/70 hover:text-[#e49400] transition">Certification</Link>
                    <Link href="/international-diploma" className="text-white/70 hover:text-[#e49400] transition">International Diploma</Link>
                    <Link href="/verification" className="text-white/70 hover:text-[#e49400] transition">Verification</Link>
                    <Link href="/contact" className="text-white/70 hover:text-[#e49400] transition">Contact Us</Link>
                </div>

                {/* Legal */}
                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold mb-2">Legal</h3>
                    <Link href="/terms-of-use" className="text-white/70 hover:text-[#e49400] transition">Terms of Use</Link>
                    <Link href="/privacy-policy" className="text-white/70 hover:text-[#e49400] transition">Privacy Policy</Link>
                </div>
            </div>

            {/* Footer bottom */}
            <div className="bg-blue-950 px-4 py-4 text-center text-sm text-white/80">
                <p>
                    &copy; 2025 GAPS. All rights reserved. Designed by{" "}
                    <a
                        href="https://www.sentinelstudio.ma"
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-white hover:text-[#e49400] transition"
                    >
                        Sentinel Studio
                    </a>
                </p>
            </div>
        </footer>
    )
}
