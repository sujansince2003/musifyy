import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"
const YT_URL_REGEX = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;

const StreamSchema = z.object({
    userId: z.string(),
    url: z.string()
})


export async function POST(req: NextRequest) {


    try {
        const dataFromclient = await req.json();
        const validData = StreamSchema.safeParse(dataFromclient)

        if (!validData.success) {
            return NextResponse.json({ msg: "Invalid Data from Client side" })
        }
        const data = validData.data;

        const validYTurl = data.url.match(YT_URL_REGEX)

        if (!validYTurl) {
            return NextResponse.json({ msg: "Invalid Youtube URl" }, { status: 401 })
        }



        const extractedId = data.url.split("?v=")[1];


        const createStream = await prisma.stream.create({
            data: {
                userId: data.userId,
                url: data.url,
                extractedId,
                type: "YouTube",
                streamName: "stream1"

            }
        })

        return NextResponse.json({ msg: "Created Stream successfully", createStream }, { status: 200 })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ msg: "Error while creating stream" })

    }





}


export async function GET(req: NextRequest) {

    const userId = req.nextUrl.searchParams.get("userId");

    try {

        const streams = await prisma.stream.findMany({

            where: {
                userId: userId ?? ""
            }
        })
        return NextResponse.json({ msg: "Fetched all streams", streams }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ msg: "failed to get streams", error })
    }

}