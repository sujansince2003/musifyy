import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"
//@ts-expect-error no-types
import youtubesearchapi from "youtube-search-api"

// definining regex for the youtube url
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
        const ytdata = await youtubesearchapi.GetVideoDetails(extractedId)



        const thumbnails = ytdata.thumbnail.thumbnails;
        //sorting videos accoring to the sizes
        thumbnails.sort((a: { width: string }, b: { width: string }) =>
            a.width < b.width ? -1 : 1)




        const createStream = await prisma.stream.create({
            data: {
                userId: data.userId,
                url: data.url,
                extractedId,
                type: "YouTube",
                streamName: ytdata.title ?? "video title not available",

                largeThumbnail: thumbnails[thumbnails.length - 1].url ?? "",
                smallThumbnail: (thumbnails.length > 1 ? thumbnails[thumbnails.length - 2].url : thumbnails[thumbnails.length - 1].url) ?? ""

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



