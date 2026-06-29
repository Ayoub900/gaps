"use client"

import React, { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/posts/686a566d0cb9966c44354e0b", label: "Certification" },
    { href: "/international-diploma", label: "International Diploma" },
    { href: "/verification", label: "Verification" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
]

export default function PhoneNavbar() {
    const pathname = usePathname()
    const [isActive, setIsActive] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const closeButtonRef = useRef<HTMLButtonElement>(null)
    const menuClassName = [
        "fixed inset-0 z-[100] flex h-[100dvh] w-screen flex-col items-center justify-center gap-6 overflow-y-auto bg-white p-6 transition-transform duration-300 ease-in-out",
        isActive ? "translate-x-0" : "-translate-x-full pointer-events-none",
    ].join(" ")

    const toggleMenu = () => setIsActive((prev) => !prev)
    const closeMenu = () => setIsActive(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        closeMenu()
    }, [pathname])

    useEffect(() => {
        if (!isActive) return

        const originalOverflow = document.body.style.overflow
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeMenu()
            }
        }

        document.body.style.overflow = "hidden"
        document.addEventListener("keydown", handleKeyDown)
        closeButtonRef.current?.focus()

        return () => {
            document.body.style.overflow = originalOverflow
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [isActive])

    return (
        <>
            <button
                type="button"
                aria-label="Mobile menu"
                aria-expanded={isActive}
                aria-controls="mobile-menu"
                onClick={toggleMenu}
                tabIndex={isActive ? -1 : 0}
                className="rounded-lg bg-[#e49400] p-2 text-white transition hover:bg-[#c97f00] focus:outline-none focus:ring-2 focus:ring-[#e49400] focus:ring-offset-2"
            >
                <Menu aria-hidden="true" className="h-6 w-6" />
            </button>

            {isMounted &&
                createPortal(
                    <nav
                        id="mobile-menu"
                        aria-hidden={!isActive}
                        aria-label="Mobile navigation"
                        className={menuClassName}
                    >
                        <button
                            ref={closeButtonRef}
                            type="button"
                            aria-label="Close menu"
                            onClick={closeMenu}
                            tabIndex={isActive ? 0 : -1}
                            className="absolute right-4 top-4 rounded-lg bg-[#e49400] p-2 text-white transition hover:bg-[#c97f00] focus:outline-none focus:ring-2 focus:ring-[#e49400] focus:ring-offset-2"
                        >
                            <X aria-hidden="true" className="h-6 w-6" />
                        </button>

                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-lg font-semibold text-black transition hover:text-[#e49400] focus:outline-none focus:ring-2 focus:ring-[#e49400] focus:ring-offset-4"
                                onClick={closeMenu}
                                tabIndex={isActive ? 0 : -1}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>,
                    document.body
                )}
        </>
    )
}
