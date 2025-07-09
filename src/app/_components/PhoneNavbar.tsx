"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import './styles/phonenavbar.css'

export default function PhoneNavbar() {
    const [isActive, setIsActive] = useState(false)
    return (
        <>
            <label className='p-2 rounded-lg bg-[#e49400]'>
                <Image className='group-hover:rotate-180 transition-all duration-300 ease-in-out' src={'/burger.svg'} width={20} height={20} alt='burger menu' />
                <input onChange={() => setIsActive(!isActive)} checked={isActive} className='hidden' type="checkbox" />
            </label>
            {isActive &&
                <div className=' p-4 bg-white phonesubmenu transition-all duration-300 ease-in-out w-[100vw] h-[100vh] flex z-[1000] justify-center flex-col fixed left-0 top-0'>
                    <label className='absolute p-2 rounded-lg bg-[#e49400] top-4 right-4'>
                        <Image className='rotate-90 transition-all duration-300 ease-in-out' src={'/arrow.svg'} width={20} height={20} alt='arrow' />
                        <input onChange={() => setIsActive(!isActive)} checked={isActive} className=' hidden' type="checkbox" />
                    </label>
                    <div className='flex flex-col gap-4 text-black font-semibold'>
                        <a className='hover:text-[#e49400] transition-all duration-300 py-2' href={'/'}>Home</a>
                        <a className='hover:text-[#e49400] transition-all duration-300 py-2' href={'/posts/686a566d0cb9966c44354e0b'}>Certification</a>
                        <a className='hover:text-[#e49400] transition-all duration-300 py-2' href={'/international-diploma'}>International Diploma</a>
                        <a className='hover:text-[#e49400] transition-all duration-300 py-2' href={'/verification'}>Verification</a>
                        <a className='hover:text-[#e49400] transition-all duration-300 py-2' href={'/about'}>About Us</a>
                    </div>
                </div>
            }
        </>
    )
}