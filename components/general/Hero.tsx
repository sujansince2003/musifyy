"use client";
import React from "react";
import { ChevronDown } from "lucide-react";

const Hero: React.FC = () => {
  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 8 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight max-w-4xl mx-auto">
          Group <span className="text-indigo-300">Listening</span> Reimagined
        </h1>
        <p className="text-xl md:text-2xl text-indigo-100 mb-12 max-w-2xl mx-auto leading-relaxed">
          Create the perfect atmosphere with collaborative music queues that
          everyone can contribute to and enjoy.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <button className="rounded-full bg-white text-indigo-800 px-8 py-4 font-bold text-lg hover:bg-indigo-100 transition-all duration-300 transform hover:scale-105">
            Create Your Queue
          </button>
          <button className="rounded-full bg-transparent border-2 border-white text-white px-8 py-4 font-bold text-lg hover:bg-white/10 transition-all duration-300">
            Join A Group
          </button>
        </div>
      </div>

      <button
        onClick={scrollToFeatures}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
};

export default Hero;
