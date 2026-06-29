import { post } from '@prisma/client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

interface postCardProps {
    post: post
}

export default function postCard({ post }: postCardProps) {
    return (
        <Link
            href={`/posts/${post.id}`}
            className="group flex h-full w-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#e49400]/60 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e49400]"
        >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                <Image
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 360px"
                />
            </div>

            <div className="flex flex-1 flex-col p-5">
                <h2 className="text-xl font-bold leading-snug text-[#050c45] line-clamp-2">
                    {post.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                    <span className="font-medium text-[#e49400]">by</span> Global Academy of Professional Skills
                </p>
                <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-[#050c45] transition group-hover:text-[#e49400]">
                    View full program
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
            </div>
        </Link>
    )
}
