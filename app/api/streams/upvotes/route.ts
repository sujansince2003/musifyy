import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"



const upvoteSchema = z.object({
    streamId: z.string()
})

export async function POST(req: NextRequest) {
    const session = await getServerSession();
    if (!session?.user?.email) {
        return NextResponse.json({ msg: "unauthenticated" }, { status: 403 });

    }

    const user = await prisma.user.findFirst({
        where: {
            email: session.user.email
        }
    });

    try {
        const upvoteData = await upvoteSchema.safeParse(req.json());

        if (!upvoteData.success) {
            return NextResponse.json({ msg: "invalid data from client" })
        }

        await prisma.upvote.create({
            data: {
                streamId: upvoteData.data?.streamId,
                userId: user?.id ?? ""
            }
        })

        return NextResponse.json({ msg: "successfully upvoted" })

    } catch (error) {
        return NextResponse.json({ msg: "erorr occured", err: error }, { status: 400 })

    }




}

