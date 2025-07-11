import { Metadata } from "next";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import Link from "next/link";
import { db } from "@/lib/db/prisma";
import Form from "./Form";

interface postPageProps {
    searchParams: {
        success: string,
        error: string,
    },
    params: {
        id: string;
    };
}

const getpost = cache(async (id: string) => {
    const post = await db.post.findUnique({
        where: { id },
    });
    if (!post) notFound();
    return post;
});

export async function generateMetadata({
    params: { id },
}: postPageProps): Promise<Metadata> {
    const post = await getpost(id);

    return {
        title: post.title + " - GAS",
        description: post.body,
        openGraph: {
            images: [{ url: post.imageUrl }],
        },
    };
}

export default async function postPage({
    searchParams: { success, error },
    params: { id },
}: postPageProps) {
    const post = await getpost(id);
    return (
        <>
            {/* Post Image */}
            <div className="relative w-full h-[180px] md:h-[450px]">
                <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Content & Form */}
            <main className="min-h-screen px-4 md:px-24 my-6 space-y-6 relative max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center">{post.title}</h1>

                <article
                    className="prose max-w-full"
                    dangerouslySetInnerHTML={{ __html: post.body }}
                />

                {/* Success/Error Messages or Form */}
                {success === "1" ? (
                    <div className="bg-green-600 text-white text-2xl font-bold text-center py-6 rounded-md">
                        Your application has been sent successfully!
                    </div>
                ) : error === "1" ? (
                    <div className="bg-red-600 text-white text-2xl font-bold text-center py-6 rounded-md">
                        Something has gone wrong, please try again later!
                    </div>
                ) : (
                    <Form title={post.title} />
                )}
            </main>
        </>

    );
}