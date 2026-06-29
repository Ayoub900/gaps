const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const rootDir = path.resolve(__dirname, "..");
const testPassword = "TestPassword123!";

function parseArgs(argv) {
  return argv.reduce(
    (args, arg) => {
      if (arg === "--dry-run") {
        args.dryRun = true;
      } else if (arg === "--check-admin") {
        args.checkAdmin = true;
      } else if (arg === "--events-only") {
        args.eventsOnly = true;
      } else if (arg === "--allow-non-test-db") {
        args.allowNonTestDb = true;
      } else if (arg.startsWith("--env=")) {
        args.envFiles.push(arg.replace("--env=", ""));
      }

      return args;
    },
    { dryRun: false, checkAdmin: false, eventsOnly: false, allowNonTestDb: false, envFiles: [] }
  );
}

function cleanEnvValue(value) {
  const trimmed = value.trim();
  const quote = trimmed[0];

  if ((quote === "\"" || quote === "'") && trimmed.endsWith(quote)) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

function loadEnvFile(fileName) {
  const envPath = path.resolve(rootDir, fileName);

  if (!fs.existsSync(envPath)) {
    return false;
  }

  const content = fs.readFileSync(envPath, "utf8");

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);

    if (!match) {
      continue;
    }

    const [, key, rawValue] = match;

    if (process.env[key] === undefined) {
      process.env[key] = cleanEnvValue(rawValue);
    }
  }

  return true;
}

function loadEnv(envFiles) {
  const filesToTry = envFiles.length
    ? envFiles
    : [".env.test.local", ".env.test", ".env.local", ".env"];

  return filesToTry.filter(loadEnvFile);
}

function date(value) {
  return new Date(value);
}

function objectId(prefix, index) {
  const suffix = index.toString(16).padStart(24 - prefix.length, "0");
  return `${prefix}${suffix}`.slice(0, 24);
}

function databaseInfo() {
  if (!process.env.DATABASE_URL) {
    return {
      label: "DATABASE_URL is not set",
      hostname: "",
      dbName: "",
    };
  }

  try {
    const url = new URL(process.env.DATABASE_URL);
    const dbName = url.pathname.replace(/^\//, "") || "(no database name)";
    return {
      label: `${url.protocol}//${url.hostname}${url.port ? `:${url.port}` : ""}/${dbName}`,
      hostname: url.hostname.toLowerCase(),
      dbName: dbName.toLowerCase(),
    };
  } catch {
    return {
      label: "configured DATABASE_URL",
      hostname: "",
      dbName: "",
    };
  }
}

function databaseLabel() {
  return databaseInfo().label;
}

function isLikelyTestDatabase() {
  const { hostname, dbName } = databaseInfo();

  if (["localhost", "127.0.0.1", "::1"].includes(hostname)) {
    return true;
  }

  const target = `${hostname}/${dbName}`;
  return ["test", "testing", "dev", "development", "local", "staging", "sandbox"].some((hint) =>
    target.includes(hint)
  );
}

const posts = [
  {
    id: "686a566d0cb9966c44354e0b",
    title: "Professional Certification",
    body: [
      "<p>Build practical skills through a guided certification path, final evaluation, and public verification.</p>",
      "<ul><li>Designed for working professionals</li><li>Includes assessment and certificate verification</li><li>Suitable for corporate and individual learners</li></ul>",
    ].join(""),
    publish: true,
    imageUrl: "/certification.png",
    createdAt: date("2026-06-10T09:00:00.000Z"),
  },
  {
    id: objectId("64f", 2),
    title: "International Diploma Program",
    body: [
      "<p>A career-ready diploma track for learners who need recognized training with a clear application flow.</p>",
      "<p>This fixture is published so it appears on the home page and can create applications from its detail page.</p>",
    ].join(""),
    publish: true,
    imageUrl: "/gaps_diplome.png",
    createdAt: date("2026-06-09T10:30:00.000Z"),
  },
  {
    id: objectId("64f", 3),
    title: "Corporate Skills Workshop",
    body: [
      "<p>Short-form training for teams that need fast, measurable improvement in workplace skills.</p>",
      "<p>Use this record to test another published service card and successful application submissions.</p>",
    ].join(""),
    publish: true,
    imageUrl: "/F_1.png",
    createdAt: date("2026-06-08T14:00:00.000Z"),
  },
  {
    id: objectId("64f", 4),
    title: "Draft Leadership Course",
    body: "<p>This draft should not appear on the home page because publish is false, but the detail page still exists by direct URL.</p>",
    publish: false,
    imageUrl: "/F_2.png",
    createdAt: date("2026-06-07T15:15:00.000Z"),
  },
  {
    id: objectId("64f", 5),
    title: "Pending Publication Preview",
    body: "<p>This record has a null publish flag to test records that are neither explicitly published nor deleted.</p>",
    publish: null,
    imageUrl: "/F_3.png",
    createdAt: date("2026-06-06T16:45:00.000Z"),
  },
];

const events = [
  {
    id: objectId("66f", 1),
    title: "Professional Skills Open Day",
    description:
      "A public introduction to GAPS Academy programs, verification services, and career-focused certification paths.",
    fullDescription: [
      "Meet the GAPS Academy team, review available certification pathways, and learn how public verification works after course completion.",
      "",
      "This event is seeded with an uploaded image so you can test the default event card, the public detail page, and full description rendering.",
    ].join("\n"),
    location: "Casablanca Training Center",
    date: date("2026-07-10T10:00:00.000Z"),
    imageUrl: "/F2_1.jpg",
    videoUrl: null,
    publish: true,
    createdAt: date("2026-06-20T09:00:00.000Z"),
  },
  {
    id: objectId("66f", 2),
    title: "International Diploma Video Briefing",
    description:
      "A published event that uses a YouTube link instead of an uploaded image.",
    fullDescription: [
      "This seeded record tests the video path: dashboard thumbnail, home page video card, and embedded YouTube player on the event detail page.",
      "",
      "The video URL is stored as a YouTube link and no local image is attached.",
    ].join("\n"),
    location: "Online",
    date: date("2026-07-18T15:30:00.000Z"),
    imageUrl: null,
    videoUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    publish: true,
    createdAt: date("2026-06-19T09:30:00.000Z"),
  },
  {
    id: objectId("66f", 3),
    title: "Corporate Training Workshop",
    description:
      "A practical workshop for partners and team leaders focused on workplace training design and assessment.",
    fullDescription: [
      "Participants will review needs analysis, outcome mapping, assessment design, and delivery planning for workplace learning programs.",
      "",
      "This event uses an uploaded image and a longer full description.",
    ].join("\n"),
    location: "London Partner Office",
    date: date("2026-08-05T13:00:00.000Z"),
    imageUrl: "/F2_2.jpg",
    videoUrl: null,
    publish: true,
    createdAt: date("2026-06-18T10:00:00.000Z"),
  },
  {
    id: objectId("66f", 4),
    title: "Partner Recognition Ceremony",
    description:
      "A celebration of learning partners and professional contributors across the GAPS Academy network.",
    fullDescription: [
      "This ceremony recognizes learning partners, assessors, trainers, and professional contributors who support GAPS Academy programs.",
      "",
      "Use this seeded event to test a standard published image event with date and location.",
    ].join("\n"),
    location: "Manchester",
    date: date("2026-09-12T18:00:00.000Z"),
    imageUrl: "/F2_3.jpg",
    videoUrl: null,
    publish: true,
    createdAt: date("2026-06-17T10:30:00.000Z"),
  },
  {
    id: objectId("66f", 5),
    title: "Draft Private Evaluator Briefing",
    description:
      "This draft event is seeded to test dashboard editing and unpublished event visibility.",
    fullDescription:
      "This draft event should appear in the dashboard, but it should not appear on the home page and its public detail page should return not found while unpublished.",
    location: "Internal",
    date: date("2026-07-02T11:00:00.000Z"),
    imageUrl: "/F2_4.jpg",
    videoUrl: null,
    publish: false,
    createdAt: date("2026-06-16T11:00:00.000Z"),
  },
  {
    id: objectId("66f", 6),
    title: "YouTube Replay: Assessment Standards",
    description:
      "A second published video event for testing multiple YouTube cards and embeds.",
    fullDescription: [
      "This replay fixture uses a short YouTube URL and no uploaded image.",
      "",
      "It helps confirm that different YouTube URL formats are handled consistently after editing through the dashboard.",
    ].join("\n"),
    location: "Online Replay",
    date: date("2026-08-22T16:00:00.000Z"),
    imageUrl: null,
    videoUrl: "https://youtu.be/jNQXAC9IVRw",
    publish: true,
    createdAt: date("2026-06-15T11:00:00.000Z"),
  },
  {
    id: objectId("66f", 7),
    title: "Open Registration Event With No Date",
    description:
      "A published image event without a date, used to test date fallback text.",
    fullDescription:
      "This record intentionally leaves the date empty so the home page and detail page show the date fallback state.",
    location: "To be confirmed",
    date: null,
    imageUrl: "/gaps_diplome.png",
    videoUrl: null,
    publish: true,
    createdAt: date("2026-06-14T11:00:00.000Z"),
  },
  {
    id: objectId("66f", 8),
    title: "Remote Skills Forum",
    description:
      "A published video event without a location, used to test optional location display.",
    fullDescription:
      "This event intentionally omits location so cards and detail pages can be checked without that row.",
    location: null,
    date: date("2026-10-01T12:00:00.000Z"),
    imageUrl: null,
    videoUrl: "https://www.youtube.com/embed/ysz5S6PUM-U",
    publish: true,
    createdAt: date("2026-06-13T11:00:00.000Z"),
  },
  {
    id: objectId("66f", 9),
    title: "Quality Management Masterclass",
    description:
      "A published image event added to fill the first dashboard pagination page.",
    fullDescription:
      "This event helps test the dashboard event pagination boundary with normal image media.",
    location: "Rabat",
    date: date("2026-10-15T09:30:00.000Z"),
    imageUrl: "/F_4.png",
    videoUrl: null,
    publish: true,
    createdAt: date("2026-06-12T11:00:00.000Z"),
  },
  {
    id: objectId("66f", 10),
    title: "Second Page YouTube Fixture",
    description:
      "A published video event intended to land on the second dashboard page.",
    fullDescription:
      "Use this event to verify that pagination, YouTube thumbnail rendering, and public event links work beyond the first page.",
    location: "Online",
    date: date("2026-11-05T17:00:00.000Z"),
    imageUrl: null,
    videoUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
    publish: true,
    createdAt: date("2026-06-11T11:00:00.000Z"),
  },
  {
    id: objectId("66f", 11),
    title: "Draft YouTube Planning Session",
    description:
      "A draft video event for testing dashboard-only visibility.",
    fullDescription:
      "This event should show in the dashboard with a YouTube thumbnail but stay hidden from the public home page and detail route.",
    location: "Internal",
    date: date("2026-11-20T10:00:00.000Z"),
    imageUrl: null,
    videoUrl: "https://youtu.be/ysz5S6PUM-U",
    publish: false,
    createdAt: date("2026-06-10T11:00:00.000Z"),
  },
  {
    id: objectId("66f", 12),
    title: "Compact Description Image Event",
    description:
      "A published image event with no separate full description.",
    fullDescription: null,
    location: "Marrakesh",
    date: date("2026-12-03T14:00:00.000Z"),
    imageUrl: "/F_5.png",
    videoUrl: null,
    publish: true,
    createdAt: date("2026-06-09T11:00:00.000Z"),
  },
];

const partners = [
  {
    id: objectId("67a", 1),
    name: "ASBA Partner",
    website: null,
    imageUrl: "/logo_asba.png",
    sortOrder: 10,
    publish: true,
    createdAt: date("2026-06-14T09:00:00.000Z"),
  },
  {
    id: objectId("67a", 2),
    name: "IT Partner",
    website: null,
    imageUrl: "/logo_it.png",
    sortOrder: 20,
    publish: true,
    createdAt: date("2026-06-14T09:05:00.000Z"),
  },
  {
    id: objectId("67a", 3),
    name: "Need Formation Partner",
    website: null,
    imageUrl: "/need_formation.jpeg",
    sortOrder: 30,
    publish: true,
    createdAt: date("2026-06-14T09:10:00.000Z"),
  },
  {
    id: objectId("67a", 4),
    name: "New Max Dev Partner",
    website: null,
    imageUrl: "/newmaxdev.jpeg",
    sortOrder: 40,
    publish: true,
    createdAt: date("2026-06-14T09:15:00.000Z"),
  },
  {
    id: objectId("67a", 5),
    name: "On Lesson Pro Partner",
    website: null,
    imageUrl: "/onlessonpro.jpeg",
    sortOrder: 50,
    publish: true,
    createdAt: date("2026-06-14T09:20:00.000Z"),
  },
  {
    id: objectId("67a", 6),
    name: "Damej Print Partner",
    website: null,
    imageUrl: "/damej-print.png",
    sortOrder: 60,
    publish: true,
    createdAt: date("2026-06-14T09:25:00.000Z"),
  },
  {
    id: objectId("67a", 7),
    name: "Innova Partner",
    website: null,
    imageUrl: "/logo_innova.png",
    sortOrder: 70,
    publish: true,
    createdAt: date("2026-06-14T09:30:00.000Z"),
  },
];

const accreditationIds = [
  {
    id: objectId("65a", 1),
    name: "Amina Haddad",
    code: "GAPS/CERT-2026-001",
    cin: "BK123456",
    diploma: "Professional Certificate in Project Management",
    type: "EDU",
    diplomas: ["Project Management", "Professional Skills"],
    createdAt: date("2026-06-01T08:00:00.000Z"),
  },
  {
    id: objectId("65a", 2),
    name: "Youssef El Amrani",
    code: "GAPS.2026.002",
    cin: "CD987654",
    diploma: "International Diploma in Business Administration",
    type: "DIPLOMA",
    diplomas: ["Business Administration", "Leadership"],
    createdAt: date("2026-05-28T08:30:00.000Z"),
  },
  {
    id: objectId("65a", 3),
    name: "Sara Mensah",
    code: "GAPS/CERT-2026-003",
    cin: "GH445566",
    diploma: "Corporate Training Specialist Certificate",
    type: "CERT",
    diplomas: ["Training", "Evaluation"],
    createdAt: date("2026-05-20T09:00:00.000Z"),
  },
  {
    id: objectId("65a", 4),
    name: "Nora Williams",
    code: "GAPS-PLAIN-004",
    cin: "UK778899",
    diploma: "Quality Management Certificate",
    type: "EDU",
    diplomas: ["Quality Management"],
    createdAt: date("2026-05-12T09:30:00.000Z"),
  },
  {
    id: objectId("65a", 5),
    name: null,
    code: null,
    cin: null,
    diploma: null,
    type: null,
    diplomas: [],
    createdAt: date("2026-05-01T10:00:00.000Z"),
  },
];

const countries = ["Morocco", "United Kingdom", "France", "Senegal", "UAE", "Canada"];
const applicationTitles = [
  "Contact Us Page",
  "International Diploma Program",
  "Professional Certification",
  "Corporate Skills Workshop",
  "Pending Publication Preview",
];

const applications = Array.from({ length: 24 }, (_, index) => {
  const number = index + 1;
  const createdAt = new Date(Date.UTC(2026, 5, 24 - index, 9 + (index % 8), 15, 0));

  return {
    id: objectId("66b", number),
    name: `Test Lead ${number.toString().padStart(2, "0")}`,
    title: applicationTitles[index % applicationTitles.length],
    email: `lead${number.toString().padStart(2, "0")}@example.test`,
    phone: `+212600000${number.toString().padStart(3, "0")}`,
    country: countries[index % countries.length],
    createdAt,
  };
});

const internationalDiplomas = [
  {
    id: objectId("66c", 1),
    name: "Leila Benali",
    country: "Morocco",
    phone: 600111222,
    job: "Training Coordinator",
    whatsapp: 600111222,
    email: "leila.benali@example.test",
    createdAt: date("2026-06-12T11:00:00.000Z"),
  },
  {
    id: objectId("66c", 2),
    name: "Thomas Carter",
    country: "United Kingdom",
    phone: 770090123,
    job: "Operations Manager",
    whatsapp: 770090123,
    email: "thomas.carter@example.test",
    createdAt: date("2026-06-11T11:30:00.000Z"),
  },
  {
    id: objectId("66c", 3),
    name: "Fatou Diop",
    country: "Senegal",
    phone: 770001122,
    job: "HR Specialist",
    whatsapp: 770001122,
    email: "fatou.diop@example.test",
    createdAt: date("2026-06-10T12:00:00.000Z"),
  },
];

const lpForms = [
  {
    id: objectId("66d", 1),
    lp: "Casablanca Learning Partner",
    name: "Hicham Berrada",
    hasExp: "yes",
    hasDiplomas: "yes",
    phone: "+212600200001",
    field: "Professional Training",
    status: "waiting",
    createdAt: date("2026-06-18T09:00:00.000Z"),
  },
  {
    id: objectId("66d", 2),
    lp: "London Skills Center",
    name: "Emily Johnson",
    hasExp: "yes",
    hasDiplomas: "no",
    phone: "+447700900456",
    field: "Business Administration",
    status: "processing",
    createdAt: date("2026-06-17T10:00:00.000Z"),
  },
  {
    id: objectId("66d", 3),
    lp: "Dakar Career Hub",
    name: "Mamadou Sow",
    hasExp: "no",
    hasDiplomas: "yes",
    phone: "+221770009988",
    field: "Hospitality",
    status: "processed",
    createdAt: date("2026-06-16T11:00:00.000Z"),
  },
];

async function buildUsers() {
  const hashedPassword = await bcrypt.hash(testPassword, 10);

  return [
    {
      id: objectId("66e", 1),
      name: "GAPS Admin",
      email: "admin@gaps.test",
      phone: "+212600300001",
      emailVerified: date("2026-06-01T08:00:00.000Z"),
      verified: true,
      hashedPassword,
      image: null,
      role: "ADMIN",
      courses: ["Operations", "Verification"],
      online: [],
      createdAt: date("2026-06-01T08:00:00.000Z"),
    },
    {
      id: objectId("66e", 2),
      name: "GAPS Manager",
      email: "manager@gaps.test",
      phone: "+212600300002",
      emailVerified: date("2026-06-02T08:00:00.000Z"),
      verified: true,
      hashedPassword,
      image: null,
      role: "MANAGER",
      courses: ["Applications"],
      online: [],
      createdAt: date("2026-06-02T08:00:00.000Z"),
    },
    {
      id: objectId("66e", 3),
      name: "Test Student",
      email: "student@gaps.test",
      phone: "+212600300003",
      emailVerified: null,
      verified: false,
      hashedPassword,
      image: null,
      role: "USER",
      courses: ["Professional Certification"],
      online: [],
      createdAt: date("2026-06-03T08:00:00.000Z"),
    },
  ];
}

async function upsertById(model, records) {
  for (const record of records) {
    const { id, ...data } = record;

    await model.upsert({
      where: { id },
      update: data,
      create: record,
    });
  }
}

async function upsertUsers(prisma, users) {
  for (const user of users) {
    const { id, email, ...data } = user;

    await prisma.user.upsert({
      where: { email },
      update: data,
      create: { id, email, ...data },
    });
  }
}

async function checkAdminLogin(prisma) {
  const admin = await prisma.user.findUnique({
    where: { email: "admin@gaps.test" },
    select: {
      email: true,
      role: true,
      hashedPassword: true,
    },
  });

  if (!admin) {
    console.log("admin@gaps.test was not found in the configured database.");
    return;
  }

  const passwordMatches = admin.hashedPassword
    ? await bcrypt.compare(testPassword, admin.hashedPassword)
    : false;

  console.log(`admin@gaps.test exists with role ${admin.role}.`);
  console.log(`Test password matches: ${passwordMatches ? "yes" : "no"}.`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const loadedEnvFiles = loadEnv(args.envFiles);
  const users = await buildUsers();

  const summary = {
    posts: posts.length,
    events: events.length,
    partners: partners.length,
    ids: accreditationIds.length,
    applications: applications.length,
    internationalDiplomas: internationalDiplomas.length,
    lpForms: lpForms.length,
    users: users.length,
  };

  if (args.dryRun) {
    console.log("Seed dry run");
    console.log(`Mode: ${args.eventsOnly ? "events only" : "full fixture set"}`);
    console.table(summary);
    console.log(`Env files loaded: ${loadedEnvFiles.join(", ") || "none"}`);
    console.log(`Target: ${databaseLabel()}`);
    console.log(
      `Safety: ${
        isLikelyTestDatabase()
          ? "target looks like a test/dev/local database"
          : "target does not look like a test database"
      }`
    );
    console.log(`Test password for seeded users: ${testPassword}`);
    return;
  }

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required. Add it to .env, .env.test, or your shell before seeding.");
  }

  if (args.checkAdmin) {
    const prisma = new PrismaClient();

    try {
      console.log(`Checking admin login in ${databaseLabel()}`);
      await checkAdminLogin(prisma);
    } finally {
      await prisma.$disconnect();
    }

    return;
  }

  if (!args.allowNonTestDb && !isLikelyTestDatabase()) {
    throw new Error(
      `Refusing to seed ${databaseLabel()} because it does not look like a test database. ` +
        "Point DATABASE_URL at a test database via .env.test, or rerun with --allow-non-test-db after confirming the target is safe."
    );
  }

  const prisma = new PrismaClient();

  try {
    if (args.eventsOnly) {
      await upsertById(prisma.event, events);

      console.log(`Seeded event fixtures into ${databaseLabel()}`);
      console.table({ events: events.length });
      console.log("Event fixtures: image events, YouTube events, draft events, missing date/location, and pagination coverage.");
      return;
    }

    await upsertById(prisma.post, posts);
    await upsertById(prisma.event, events);
    await upsertById(prisma.partner, partners);
    await upsertById(prisma.id, accreditationIds);
    await upsertById(prisma.application, applications);
    await upsertById(prisma.internationalDiploma, internationalDiplomas);
    await upsertById(prisma.lpForm, lpForms);
    await upsertUsers(prisma, users);

    console.log(`Seeded test data into ${databaseLabel()}`);
    console.table(summary);
    console.log("Admin login: admin@gaps.test / TestPassword123!");
    console.log("Other logins: manager@gaps.test and student@gaps.test use the same password.");
    console.log("Verification examples: GAPS/CERT-2026-001, GAPS.2026.002, or 65a000000000000000000001.");
    console.log("Homepage fixtures: 10 published events, 2 draft events, and 7 published partners.");
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(async (error) => {
  console.error(error);
  process.exit(1);
});
