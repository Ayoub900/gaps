import { db } from "@/lib/db/prisma";
import Image from "next/image";
import PostCard from "./_components/PostCard";
import Link from "next/link";
import { ArrowRight, CalendarDays, FileText, GraduationCap, MapPin, Play, SearchCheck, ShieldCheck } from "lucide-react";
import { getYouTubeThumbnailUrl } from "@/lib/youtube";

const fallbackPartners = [
  { id: "logo_asba", name: "ASBA Partner", imageUrl: "/logo_asba.png", website: null },
  { id: "logo_it", name: "IT Partner", imageUrl: "/logo_it.png", website: null },
  { id: "need_formation", name: "Need Formation Partner", imageUrl: "/need_formation.jpeg", website: null },
  { id: "newmaxdev", name: "New Max Dev Partner", imageUrl: "/newmaxdev.jpeg", website: null },
  { id: "onlessonpro", name: "On Lesson Pro Partner", imageUrl: "/onlessonpro.jpeg", website: null },
  { id: "damej_print", name: "Damej Print Partner", imageUrl: "/damej-print.png", website: null },
  { id: "logo_innova", name: "Innova Partner", imageUrl: "/logo_innova.png", website: null },
];

function formatEventDate(date?: Date | null) {
  if (!date) return "Date to be announced";

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default async function Home() {
  const [posts, events, partners] = await Promise.all([
    db.post.findMany({
      orderBy: { createdAt: 'desc' },
      where: {
        publish: true
      }
    }),
    db.event.findMany({
      where: {
        publish: true
      },
      orderBy: [
        {
          date: 'asc'
        },
        {
          createdAt: 'desc'
        }
      ]
    }),
    db.partner.findMany({
      where: {
        publish: true
      },
      orderBy: [
        {
          sortOrder: 'asc'
        },
        {
          createdAt: 'desc'
        }
      ]
    })
  ]);

  const partnersToDisplay = partners.length > 0 ? partners : fallbackPartners;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#050c45] px-4 py-10 text-white sm:py-14 md:px-24 lg:py-16">
        <Image
          src="/hero_bg.jpeg"
          alt="Background"
          fill
          className="object-cover opacity-45"
          priority
        />
        <div className="absolute inset-0 bg-[#050c45]/65" />

        <div className="relative z-10 mx-auto flex min-h-[560px] max-w-6xl flex-col justify-center md:min-h-[52svh]">
          <Image
            src="/logo_gaps4.png"
            width={190}
            height={190}
            alt="GAPS Logo"
            className="mb-4 h-auto w-24 sm:w-32 md:w-36"
          />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e49400] sm:text-sm">
            UK-based professional training academy
          </p>
          <h1 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            Global Academy of Professional Skills
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/85 md:text-base md:leading-7">
            Global Academy of Professional Skills is a UK-based institution specialized in delivering high-quality professional training and skills development programs. It empowers individuals through practical, career-oriented education across various sectors.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/verification"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#e49400] px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-600"
            >
              <SearchCheck className="h-4 w-4" />
              Verify certificate
            </Link>
            <Link
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/35 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-[#050c45]"
            >
              <GraduationCap className="h-4 w-4" />
              Explore programs
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-white/80">
            <Image src="/UK-1.png" width={46} height={46} alt="UK Flag 1" className="h-10 w-10 rounded bg-white/10 p-1 object-contain" />
            <Image src="/UK-2.png" width={46} height={46} alt="UK Flag 2" className="h-10 w-10 rounded bg-white/10 p-1 object-contain" />
            <span className="border-l border-white/25 pl-3">Public verification and diploma pathways</span>
          </div>
        </div>
      </section>


      <section id="accreditation" className="bg-white px-4 py-16 md:px-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="overflow-hidden rounded-lg bg-[#050c45] p-8 shadow-xl">
            <div className="flex min-h-[320px] items-center justify-center">
              <Image
                src="/logo_gaps2.png"
                width={430}
                height={430}
                alt="GAPS Logo"
                className="h-auto w-full max-w-[360px] object-contain"
                priority
              />
            </div>
            <div className="mt-6 grid gap-3 border-t border-white/15 pt-6 text-white sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-[#e49400]" />
                <span className="text-sm font-semibold">Public verification</span>
              </div>
              <div className="flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-[#e49400]" />
                <span className="text-sm font-semibold">Diploma pathways</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#e49400]">Accreditation & registry</p>
              <h2 className="text-3xl font-extrabold leading-tight text-[#050c45] md:text-4xl">
                Verify credentials and explore GAPS diploma recognition.
              </h2>
              <p className="text-base leading-7 text-gray-600">
                GAPS combines public certificate verification, diploma sample access, and UK Register of Learning Providers reference details in one place.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/verification"
                className="group rounded-lg border border-[#050c45]/15 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#e49400] hover:shadow-lg"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-[#050c45] text-white">
                    <SearchCheck className="h-5 w-5" />
                  </span>
                  <ArrowRight className="h-5 w-5 text-[#e49400] transition group-hover:translate-x-1" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-[#050c45]">Verify Certificate</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">Search the public registry by ID, code, or certificate reference.</p>
              </Link>

              <Link
                href="/international-diploma"
                className="group rounded-lg border border-[#050c45]/15 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#e49400] hover:shadow-lg"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-[#050c45] text-white">
                    <FileText className="h-5 w-5" />
                  </span>
                  <ArrowRight className="h-5 w-5 text-[#e49400] transition group-hover:translate-x-1" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-[#050c45]">International Diploma</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">Review diploma fields, sample layout, and request program details.</p>
              </Link>
            </div>

            <div className="rounded-lg border border-[#050c45]/15 bg-[#f8fafc] p-5 shadow-sm">
              <div className="grid gap-5 md:grid-cols-[230px_1fr] md:items-center">
                <Image
                  src="/ukrlp-badge.svg"
                  width={320}
                  height={134}
                  alt="UKRLP UK Register of Learning Providers badge"
                  className="w-full max-w-[230px] rounded-md bg-white"
                />
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#e49400]">Provider registry</p>
                  <h3 className="mt-2 text-2xl font-bold text-[#050c45]">UK Register reference included on diploma documents.</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Diploma samples include serial number, validation link, company details, and UKPRN reference.
                  </p>
                  <Link
                    href="/documents/gaps-diploma.pdf"
                    target="_blank"
                    className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#e49400] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600"
                  >
                    <FileText className="h-4 w-4" />
                    View diploma sample
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section id="services" className="bg-[#f8fafc] px-4 py-16 md:px-24">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#e49400]">Programs</p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-[#050c45]">
            Our Services
          </h1>
          <p className="mt-3 text-sm leading-6 text-gray-600 md:text-base">
            Practical certification programs designed for professional growth and workplace-ready skills.
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts && posts.length > 0 ? (
            posts.map((a) => <PostCard key={a.id} post={a} />)
          ) : (
            <p className="col-span-full text-center text-gray-500">No services available at the moment.</p>
          )}
        </div>
      </section>

      {events.length > 0 ? (
        <div id="events" className="flex flex-col px-4 md:px-24 py-16 bg-white">
          <div className="mb-12 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#e49400]">Events</p>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold text-[#050c45]">
              Upcoming Events
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-4 justify-center max-w-6xl mx-auto">
            {events.map((event) => {
              const videoThumbnailUrl = event.videoUrl ? getYouTubeThumbnailUrl(event.videoUrl) : null;
              const mediaUrl = event.imageUrl || videoThumbnailUrl;

              return (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="flex h-full flex-col overflow-hidden rounded-lg border border-[#050c45]/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#e49400]/60 hover:shadow-md"
              >
                <div className="relative h-[220px] w-full">
                  {mediaUrl ? (
                    <Image
                      className="object-cover"
                      src={mediaUrl}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : null}
                  {event.videoUrl ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#050c45] shadow-lg">
                        <Play className="h-7 w-7 fill-current" />
                      </span>
                    </div>
                  ) : null}
                </div>
                <div className="flex min-h-[200px] flex-col gap-4 p-5">
                  <h2 className="text-xl font-bold text-[#050c45]">{event.title}</h2>
                  {event.description ? (
                    <p className="line-clamp-3 text-sm leading-6 text-gray-600">{event.description}</p>
                  ) : null}
                  <div className="mt-auto space-y-2 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-[#e49400]" />
                      {formatEventDate(event.date)}
                    </p>
                    {event.location ? (
                      <p className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#e49400]" />
                        {event.location}
                      </p>
                    ) : null}
                  </div>
                </div>
              </Link>
              );
            })}
          </div>
        </div>
      ) : null}


      <div className="flex flex-col items-center px-4 md:px-24 py-16 bg-[#f8fafc] space-y-8">
        {/* Heading */}
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#e49400]">Network</p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-[#050c45]">
            Our Partners
          </h1>
        </div>

        {/* Logos Grid */}
        <div className="flex flex-wrap gap-6 justify-center items-center">
          {partnersToDisplay.map((partner) => {
            const partnerLogo = (
              <Image
                src={partner.imageUrl}
                width={180}
                height={180}
                alt={partner.name}
                className="max-h-28 w-auto object-contain"
              />
            );

            return partner.website ? (
              <Link
                key={partner.id}
                href={partner.website}
                target="_blank"
                rel="noreferrer"
                className="flex h-32 w-44 items-center justify-center rounded-lg border border-[#050c45]/10 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                {partnerLogo}
              </Link>
            ) : (
              <div
                key={partner.id}
                className="flex h-32 w-44 items-center justify-center rounded-lg border border-[#050c45]/10 bg-white p-4 shadow-sm"
              >
                {partnerLogo}
              </div>
            );
          })}
        </div>
      </div>

    </>
  );
}
