import { post } from '@prisma/client'
import React from 'react'
import { format } from 'date-fns'
import Link from 'next/link'
import Image from 'next/image'

interface postCardProps {
    post: post
}

export default function postCard({ post }: postCardProps) {
    return (
        <Link href={'/posts/' + post.id}>
            <div className='shadow-xl border-[#050c45] border-opacity-30 h-full flex flex-col justify-between hover:shadow-xl hover:scale-105 transition-all ease-in-out duration-300 relative w-full md:max-w-[320px] min-w-[220px]'>
                <div>
                    <div className='w-full relative'  >
                        <Image className='object-cover' src={post.imageUrl} alt={post.title} width={500} height={300} />
                        {/* <span className='absolute top-1 right-2 bg-white p-2 my-2 text-secondery'>{format(post.createdAt, 'dd/MM/yyyy')}</span> */}
                    </div>
                    <div className='p-4 flex flex-col gap-4'>
                        <div className='relative '>
                            <div className=' max-h-[300px] text-2xl font-bold overflow-y-hidden' >{post.title}</div>
                            <div className='w-full text-sm'><span className='text-[#e49400]'>by</span> Global Academy of Professional Skills</div>
                        </div>
                    </div>
                </div>
                <Link href={'/posts/' + post.id} className="text-white text w-full p-3 bg-[#050c45] border">View Full Post</Link>
            </div>
        </Link>
    )
}