import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";



export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return NextResponse.json({ msg: "unauthenticated user" })
    }


    try {

        const user = await prisma.user.findUnique({
            where: { email: session.user.email as string },
        });
        if (!user) {
            return NextResponse.json({ msg: "user not found" })
        }


        const streams = await prisma.stream.findMany({

            where: {
                userId: user.id
            },
            include: {
                _count: {
                    select: {
                        upvotes: true
                    }
                }
            }
        })
        return NextResponse.json({ msg: "Fetched all streams", streams }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ msg: "failed to get streams", error })
    }


}