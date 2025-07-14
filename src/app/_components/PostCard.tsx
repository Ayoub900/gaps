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
        <div>
            <Link
                href={`/posts/${post.id}`}
                className="group shadow-xl border border-[#050c45]/30 h-full flex flex-col justify-between hover:shadow-2xl hover:scale-[1.03] transition-all ease-in-out duration-300 w-full md:max-w-[320px] min-w-[220px] rounded-lg overflow-hidden"
            >
                {/* Image */}
                <div className="w-full relative h-[200px]">
                    <Image
                        className="object-cover w-full h-full"
                        src={post.imageUrl}
                        alt={post.title}
                        width={380}
                        height={240}
                    />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col gap-3 bg-white flex-1">
                    <h2 className="text-xl font-bold text-[#050c45] line-clamp-2">
                        {post.title}
                    </h2>
                    <p className="text-sm text-gray-600">
                        <span className="text-[#e49400] font-medium">by</span> Global Academy of Professional Skills
                    </p>
                </div>

                {/* Footer (optional CTA styling) */}
                <div className="bg-[#050c45] text-white text-center py-3 text-sm font-semibold group-hover:bg-[#060f5d] transition">
                    View Full Post
                </div>
            </Link>
        </div>

    )
}