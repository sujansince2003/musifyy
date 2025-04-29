import GoogleProvider from "next-auth/providers/google";
import prisma from "./prisma";
import { PrismaAdapter } from "@auth/prisma-adapter"


export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_Client_ID!,
            clientSecret: process.env.NEXT_PUBLIC_Client_secret!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    adapter: PrismaAdapter(prisma)
}

