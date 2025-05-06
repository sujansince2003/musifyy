"use client";
import React, { useEffect, useState } from "react";
import { Share2, SkipForward, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/general/Loading";
import { Copy, Check } from "lucide-react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SongItemProps {
  title: string;
  artist: string;
  votes: number;
  albumCover: string;
  isPlaying?: boolean;
  isUpNext?: boolean;
}

interface streamInterface {
  id: string;
  type: string;
  active: boolean;
  url: string;
  extractedId: string;
  artist: string;
  streamName: string;
  smallThumbnail: string;
  largeThumbnail: string;
  userId: string;
  _count: {
    upvotes: number;
  };
}

interface StreamPlayerProps {
  type: "YouTube" | "Spotify";
  videoId: string;
}

const StreamPlayer: React.FC<StreamPlayerProps> = ({ type, videoId }) => {
  if (type === "YouTube") {
    return (
      <div className="aspect-video w-full max-w-2xl rounded-lg overflow-hidden shadow-lg">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    );
  }

  if (type === "Spotify") {
    return (
      <div className="w-full max-w-2xl rounded-lg overflow-hidden shadow-lg">
        <iframe
          src={`https://open.spotify.com/embed/track/${videoId}`}
          width="100%"
          height="352"
          allow="encrypted-media; autoplay; clipboard-write; fullscreen; picture-in-picture"
          loading="lazy"
          className="w-full"
        ></iframe>
      </div>
    );
  }

  return null;
};

const SongItem: React.FC<SongItemProps> = ({
  title,
  artist,
  votes,
  albumCover,
  isPlaying = false,
  isUpNext = false,
}) => {
  const [isVoted, setIsVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(votes);

  const handleVote = () => {
    if (isVoted) {
      setVoteCount(voteCount - 1);
    } else {
      setVoteCount(voteCount + 1);
    }
    setIsVoted(!isVoted);
  };

  return (
    <div
      className={`flex items-center p-4 gap-2 rounded-lg transition-all duration-300 ${
        isPlaying
          ? "bg-indigo-100 border-l-4 border-indigo-600"
          : isUpNext
          ? "bg-white border-l-4 border-indigo-200"
          : "bg-white hover:bg-gray-50"
      }`}
    >
      <div className="relative w-24 h-24 rounded overflow-hidden flex-shrink-0 mr-4">
        <Image
          fill
          src={albumCover}
          alt={`${title} album cover`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-base font-semibold truncate">{title}</h4>
        <p className="text-sm text-gray-500 truncate">{artist}</p>
      </div>
      <div className="flex items-center space-x-3">
        {isPlaying && (
          <div className="flex h-3 space-x-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-indigo-600 rounded-full animate-pulse"
                style={{
                  height: `${i % 2 === 0 ? 12 : 8}px`,
                  animationDuration: `${0.8 + i * 0.2}s`,
                }}
              ></div>
            ))}
          </div>
        )}
        <button
          onClick={handleVote}
          className={`flex items-center space-x-1 px-2 py-1 rounded-full ${
            isVoted
              ? "bg-indigo-100 text-indigo-600"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          } transition-colors duration-200`}
        >
          <ThumbsUp className="h-4 w-4" />
          <span className="text-sm font-medium">{voteCount}</span>
        </button>
      </div>
    </div>
  );
};

const StreamPage: React.FC = () => {
  // const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStream, setCurrentStream] = useState<streamInterface>();
  const [songs, setSongs] = useState<streamInterface[]>([]);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    async function getStreamData() {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:3000/api/streams/getuserstreams"
        );
        const data = await response.json();
        setSongs(data.streams);

        setLoading(false);
      } catch (error) {
        setError(error as string);
      }
    }
    getStreamData();
  }, []);

  useEffect(() => {
    if (songs.length > 0) {
      const sortedSongs = [...songs].sort(
        (a, b) => b._count.upvotes - a._count.upvotes
      );
      setCurrentStream(sortedSongs[0]);
    }
  }, [songs]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );

  return (
    <div className="pt-20 pb-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="bg-indigo-700 p-6 text-white">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-bold">Rooftop Party</h3>
                  <p className="text-indigo-200">
                    {/*todo: get real time users in the website */}5 listeners ·{" "}
                    {songs.length} songs queued
                  </p>
                </div>
                <div className="bg-white/10 flex flex-col justify-center gap-2 rounded-lg px-4 py-2">
                  <p className="text-sm">
                    Room Code:{" "}
                    <span className="font-mono font-bold">PARTY123</span>
                  </p>

                  <div>
                    <Dialog onOpenChange={() => setIsCopied(false)}>
                      <DialogTrigger asChild>
                        <Button className="bg-blue-800 hover:bg-white hover:text-indigo-600">
                          <Share2 />
                          Share
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Share link</DialogTitle>
                          <DialogDescription>
                            Anyone who has this link will be able to view this.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex items-center space-x-2">
                          <div className="grid flex-1 gap-2">
                            <Label htmlFor="link" className="sr-only">
                              Link
                            </Label>
                            <Input
                              id="link"
                              value={window.location.href}
                              readOnly
                            />
                          </div>
                          <Button
                            type="submit"
                            size="sm"
                            className="px-3 bg-blue-700 hover:bg-blue-800"
                            onClick={() => {
                              window.navigator.clipboard.writeText(
                                window.location.href
                              );
                              setIsCopied(true);
                              toast.success(
                                "Link copied to clipboardclipboard "
                              );
                            }}
                          >
                            <span className="sr-only">Copy</span>
                            {isCopied ? <Check /> : <Copy />}
                          </Button>
                        </div>
                        <DialogFooter className="sm:justify-start">
                          <DialogClose asChild>
                            <Button
                              type="button"
                              variant="secondary"
                              onClick={() => setIsCopied(false)}
                            >
                              Close
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="relative w-16 h-16 ">
                  <Image
                    src={(currentStream?.smallThumbnail as string) || ""}
                    alt="album cover"
                    fill
                    className="h-full w-full object-cover rounded-md"
                  />
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold text-xl line-clamp-2  text-ellipsis">
                    {currentStream?.streamName}
                  </h4>
                  <p className="text-indigo-200">Glass Animals</p>
                </div>
                <button className="rounded-full p-2 hover:bg-white/10 transition-colors duration-200">
                  <SkipForward className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              <div className="p-4 bg-indigo-50">
                <h4 className="text-sm font-semibold text-indigo-700 uppercase tracking-wider">
                  Up Next
                </h4>
              </div>

              <div className="max-h-[400px] overflow-y-auto flex flex-col gap-y-1">
                {songs?.map((song, index) => (
                  <SongItem
                    key={index}
                    title={song.streamName}
                    artist={song.artist}
                    votes={song._count.upvotes}
                    albumCover={song.smallThumbnail}
                    isPlaying={true}
                    isUpNext={false}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-start justify-center lg:sticky lg:top-24">
            {currentStream?.type && currentStream?.extractedId && (
              <StreamPlayer
                type={currentStream.type as "YouTube" | "Spotify"}
                videoId={currentStream.extractedId}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamPage;
