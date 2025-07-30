import { db } from "@/lib/db/prisma";
import Image from "next/image";
import PostCard from "./_components/PostCard";
import Link from "next/link";

export default async function Home() {
  const posts = await db.post.findMany({
    orderBy: { createdAt: 'desc' },
    where: {
      publish: true
    }
  })
  return (
    <>
      <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#050c45] px-4 md:px-24 overflow-hidden">
        {/* Background Image */}
        <Image
          src="/hero_bg.jpeg"
          alt="Background"
          fill
          className="object-cover opacity-50"
          priority
        />

        {/* Centered Content */}
        <div className="z-10 flex flex-col items-center text-center gap-4 max-w-5xl">
          <Image src="/logo_gaps4.png" width={220} height={220} alt="GAPS Logo" className="mb-2" />

          {/* Optional Heading (if logo doesn't have the name)*/}
          {/* <h1 className="text-white text-3xl md:text-4xl font-bold">GAPS Academy</h1> */}

          <p className="text-white/90 text-base md:text-lg leading-relaxed px-4">
            Global Academy of Professional Skills is a UK-based institution specialized in delivering high-quality professional training and skills development programs. It empowers individuals through practical, career-oriented education across various sectors.
          </p>
        </div>

        {/* Bottom Corner Flags */}
        <div className="absolute bottom-4 left-4 flex gap-2 z-10">
          <Image src="/UK-1.png" width={60} height={60} alt="UK Flag 1" />
          <Image src="/UK-2.png" width={60} height={60} alt="UK Flag 2" />
        </div>
      </div>


      <div id="accreditation" className="mx-auto my-16 flex flex-col justify-center items-center gap-8 md:flex-row px-4 md:px-24">
        {/* Left Logo */}
        <Image
          className="bg-[#050c45] rounded-xl md:w-[360px] md:h-[360px] object-contain p-4"
          src="/logo_gaps2.png"
          width={500}
          height={500}
          alt="GAPS Logo"
        />

        {/* Right Cards */}
        <div className="flex flex-col gap-6 w-full max-w-md">
          {/* Verification Card */}
          <div className="border border-[#050c45] rounded-xl overflow-hidden shadow-md">
            <h2 className="bg-[#050c45] text-white text-lg font-semibold py-3 text-center">
              Verification
            </h2>
            <div className="p-6 flex flex-col items-center gap-4">
              <Link
                href="/verification"
                className="w-full flex items-center justify-center gap-2 bg-[#e49400] hover:bg-amber-600 text-white font-medium py-2 rounded-md transition"
              >
                <Image src="/link.svg" width={20} height={20} alt="Link icon" />
                <span>Go to Verification</span>
              </Link>
              <p className="text-sm text-[#050c45] font-medium">Check certification authenticity</p>
            </div>
          </div>

          {/* Diploma Card */}
          <div className="border border-[#050c45] rounded-xl overflow-hidden shadow-md">
            <h2 className="bg-[#050c45] text-white text-lg font-semibold py-3 text-center">
              Diploma
            </h2>
            <div className="p-6 flex flex-col items-center gap-4">
              <Link
                href="/international-diploma"
                className="w-full flex items-center justify-center gap-2 bg-[#e49400] hover:bg-amber-600 text-white font-medium py-2 rounded-md transition"
              >
                <Image src="/link.svg" width={20} height={20} alt="Link icon" />
                <span>View International Diploma</span>
              </Link>
              <p className="text-sm text-[#050c45] font-medium">Access recognized qualifications</p>
            </div>
          </div>
        </div>
      </div>


      <div className="flex flex-col px-4 md:px-24 py-16 bg-white">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#050c45] mb-12 text-center">
          Our Services
        </h1>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-4 justify-center max-w-5xl mx-auto">
          {posts && posts.length > 0 ? (
            posts.map((a) => <PostCard key={a.id} post={a} />)
          ) : (
            <p className="col-span-full text-center text-gray-500">No services available at the moment.</p>
          )}
        </div>
      </div>


      <div className="flex min-h-screen flex-col items-center px-4 md:px-24 py-16 bg-white space-y-8">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#050c45] text-center">
          Our Partners
        </h1>

        {/* Logos Grid */}
        <div className="flex flex-wrap gap-6 justify-center items-center">
          <Image
            src="/logo_asba.png"
            width={160}
            height={160}
            alt="ASBA Partner"
            className="object-contain rounded-lg bg-white shadow-sm hover:shadow-md transition"
          />
          <Image
            src="/logo_it.png"
            width={160}
            height={160}
            alt="IT Partner"
            className="object-contain rounded-lg bg-white shadow-sm hover:shadow-md transition"
          />
          <Image
            src="/need_formation.jpeg"
            width={160}
            height={160}
            alt="Need Formation Partner"
            className="object-contain rounded-lg bg-white shadow-sm hover:shadow-md transition"
          />
          <Image
            src="/newmaxdev.jpeg"
            width={160}
            height={160}
            alt="New Max Dev Partner"
            className="object-contain rounded-lg bg-white shadow-sm hover:shadow-md transition"
          />
          <Image
            src="/onlessonpro.jpeg"
            width={160}
            height={160}
            alt="On Lesson Pro Partner"
            className="object-contain rounded-lg bg-white shadow-sm hover:shadow-md transition"
          />
        </div>
      </div>

    </>
  );
}
