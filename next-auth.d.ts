import { UserRole } from "@prisma/client";
import type { User as NextAuthUser } from "next-auth";

type UserId = string;

declare module "next-auth/jwt" {
    interface JWT {
        id: UserId;
        role: UserRole;
        phone?: string | null;
    }
}

declare module "next-auth" {
    interface Session {
        user: NextAuthUser & {
            id: UserId;
            role: UserRole;
            phone?: string | null;
        };
    }
}