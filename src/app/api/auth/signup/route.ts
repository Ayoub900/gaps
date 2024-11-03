import { db } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";

const FormSchema = z.object({
    name: z.string().min(2, {
        message: "The Name is required.",
    }).max(40, {
        message: "The Name must be less than 40 characters."
    }),
    email: z.string().email({
        message: "The Email must be a valid Email"
    }).min(2, {
        message: "The Email is required.",
    }),
    password: z.string().min(8, {
        message: "The Password must be at least 8 characters.",
    }).max(40, {
        message: "The Password must be less than 40 characters."
    }),
    confirmPassword: z.string().min(8, {
        message: "The Password must be at least 8 characters.",
    }).max(40, {
        message: "The Password must be less than 40 characters."
    }),
})

export async function POST(req: NextRequest) {

    // get the data
    const formData = await req.formData()
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    // check if the password match
    if (password !== confirmPassword) {
        console.log("password not match")
        return NextResponse.json({ error: "password does not match!" }, { status: 400 });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // validate the data
    const data = { name, email, password, confirmPassword }
    const parseddata = FormSchema.safeParse(data);

    if (!parseddata.success) {
        console.log("not success")
        return NextResponse.json({ error: "invalid arguments!" }, { status: 400 });
    }

    try {
        // check if the user excists
        const dbUser = await db.user.findFirst({
            where: {
                email
            }
        })

        if (dbUser) {
            console.log("use excists")
            return NextResponse.json({ error: 'User already excits!' }, { status: 400 });
        }

        // create the user if not excist
        const user = await db.user.create({
            data: {
                name: parseddata.data.name,
                email: parseddata.data.email,
                hashedPassword
            }
        })
        console.log("success")
        return NextResponse.json({ success: "user created successfully!", email: user.email }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'smt went wrong!' }, { status: 200 });
    }
} 