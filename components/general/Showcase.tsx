"use client";
import React, { useState } from "react";
import { Play, SkipForward, ThumbsUp } from "lucide-react";
import Image from "next/image";

interface SongItemProps {
  title: string;
  artist: string;
  votes: number;
  albumCover: string;
  isPlaying?: boolean;
  isUpNext?: boolean;
}

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
      className={`flex items-center p-4 rounded-lg transition-all duration-300 ${
        isPlaying
          ? "bg-indigo-100 border-l-4 border-indigo-600"
          : isUpNext
          ? "bg-white border-l-4 border-indigo-200"
          : "bg-white hover:bg-gray-50"
      }`}
    >
      <div className=" relative w-12 h-12 rounded overflow-hidden flex-shrink-0 mr-4">
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

const Showcase: React.FC = () => {
  const songs = [
    {
      title: "Heat Waves",
      artist: "Glass Animals",
      votes: 18,
      albumCover:
        "https://images.pexels.com/photos/1021876/pexels-photo-1021876.jpeg?auto=compress&cs=tinysrgb&w=300",
      isPlaying: true,
    },
    {
      title: "Stay",
      artist: "The Kid LAROI, Justin Bieber",
      votes: 12,
      albumCover:
        "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=300",
      isUpNext: true,
    },
    {
      title: "Levitating",
      artist: "Dua Lipa ft. DaBaby",
      votes: 9,
      albumCover:
        "https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      title: "good 4 u",
      artist: "Olivia Rodrigo",
      votes: 7,
      albumCover:
        "https://images.pexels.com/photos/2479312/pexels-photo-2479312.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      title: "Montero (Call Me By Your Name)",
      artist: "Lil Nas X",
      votes: 5,
      albumCover:
        "https://images.pexels.com/photos/3971985/pexels-photo-3971985.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
  ];

  return (
    <section id="showcase" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See It In Action
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience how QueueTunes makes group listening fun and interactive.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="bg-indigo-700 p-6 text-white">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-bold">Rooftop Party</h3>
                  <p className="text-indigo-200">
                    5 listeners · 12 songs queued
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg px-4 py-2">
                  <p className="text-sm">
                    Room Code:{" "}
                    <span className="font-mono font-bold">PARTY123</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <button className="w-14 h-14 rounded-full bg-white text-indigo-700 flex items-center justify-center hover:bg-indigo-100 transition-colors duration-300">
                  <Play className="h-8 w-8 ml-1" />
                </button>
                <div className="flex-1">
                  <h4 className="font-semibold text-xl">Heat Waves</h4>
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

              <div className="max-h-[400px] overflow-y-auto">
                {songs.map((song, index) => (
                  <SongItem
                    key={index}
                    title={song.title}
                    artist={song.artist}
                    votes={song.votes}
                    albumCover={song.albumCover}
                    isPlaying={song.isPlaying}
                    isUpNext={song.isUpNext}
                  />
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-4 pr-12 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Search and add songs..."
                />
                <button className="absolute right-1 top-1 bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors duration-300">
                  <Play className="h-5 w-5 ml-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
