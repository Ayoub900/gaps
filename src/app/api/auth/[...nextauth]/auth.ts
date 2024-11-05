import { db } from "@/lib/db/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import z from 'zod'

const CredentialsSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

const sessionExpirationDate = 60 * 60 * 48 // 2 days
const tokenExpirationDate = 60 * 60 * 24 * 7 // 7 days

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db as PrismaClient) as Adapter,
    session: {
        strategy: 'jwt',
        maxAge: sessionExpirationDate,
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {

                    const parsedCredentials = CredentialsSchema.safeParse(credentials);

                    if (!parsedCredentials.success) {
                        return null; // Return null if credentials do not match schema
                    }

                    const { email, password } = parsedCredentials.data; // Destructure email and password, or default to empty object if credentials is undefined

                    if (!email || !password) {
                        // If email or password is missing, return null (authentication fails)
                        return Promise.resolve(null);
                    }

                    const user = await db.user.findFirst({
                        where: {
                            email: email
                        }
                    });

                    if (user && user.hashedPassword && (await bcrypt.compare(password, user.hashedPassword))) {
                        // Return the user object if authentication succeeds
                        return Promise.resolve(user);
                    } else {
                        // Return null if authentication fails
                        return Promise.resolve(null);
                    }
                } catch (error) {
                    console.error('Authentication error', error);
                    return Promise.resolve(null);
                }
            }
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id
                session.user.name = token.name
                session.user.image = token.picture
                session.user.email = token.email
                session.user.role = token.role

            }
            session.expires = sessionExpirationDate.toString();

            return session
        },
        async jwt({ token, user }) {
            if (user) {
                const dbUser = await db.user.findFirst({
                    where: {
                        email: user.email,
                    },
                });

                if (!dbUser) {
                    // If the user does not exist in the database, add their information to the token.
                    token.id = user.id;
                } else {
                    // If the user exists in the database, update the token with the user's database information.
                    token.id = dbUser.id;
                    token.name = dbUser.name;
                    token.image = dbUser.image;
                    token.email = dbUser.email;
                    token.role = dbUser.role;
                }

                token.exp = tokenExpirationDate;
            }

            return token;
        }
    }
};