import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
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

            <main className="min-h-screen bg-white px-4 py-12 md:px-24">
                <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
                    <section className="max-w-3xl">
                        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#e49400]">GAPS Program</p>
                        <h1 className="mt-3 text-3xl font-extrabold leading-tight text-[#050c45] md:text-4xl">{post.title}</h1>

                        <article
                            className="mt-8 text-lg leading-8 text-[#050c45] [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_p]:mb-5 [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-2"
                            dangerouslySetInnerHTML={{ __html: post.body }}
                        />
                    </section>

                    <aside className="rounded-lg border border-[#050c45]/10 bg-[#f8fafc] p-5 shadow-sm lg:sticky lg:top-6">
                        <div className="mb-5 border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-bold text-[#050c45]">Apply for this program</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">Send your details and our team will contact you.</p>
                        </div>

                        {success === "1" ? (
                            <div className="rounded-md bg-green-600 px-5 py-4 text-center text-lg font-bold text-white">
                                Your application has been sent successfully!
                            </div>
                        ) : error === "1" ? (
                            <div className="rounded-md bg-red-600 px-5 py-4 text-center text-lg font-bold text-white">
                                Something has gone wrong, please try again later!
                            </div>
                        ) : (
                            <Form title={post.title} />
                        )}
                    </aside>
                </div>
            </main>
        </>

    );
}
