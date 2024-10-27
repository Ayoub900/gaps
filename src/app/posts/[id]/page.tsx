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
            <div className="w-full h-[450px] relative">
                <Image className="object-cover" src={post.imageUrl} fill alt={post.title} />
            </div>
            <div className="min-h-screen flex flex-col px-4 md:px-24 relative space-y-4 my-4">
                <h1 className="text-3xl font-bold text-center">{post.title}</h1>

                <div dangerouslySetInnerHTML={{ __html: post.body }}></div>
                {success && success === "1" ?
                    <div className="w-2xl mx-auto py-8 px-4 bg-green-600 text-white text-2xl font-bold">
                        Your application has been sent successfully!
                    </div>
                    : (error && error === "1" ?
                        <div className="w-2xl mx-auto py-8 px-4 bg-red-600 text-white text-2xl font-bold">
                            Something has gone wrong, please try again later!
                        </div>
                        : <Form title={post.title} />
                    )
                }
            </div >
        </>
    );
}