import React from "react";
import { Music } from "lucide-react";

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white">
      <div className="container mx-auto px-6 text-center">
        <Music className="h-16 w-16 mx-auto mb-6 opacity-75" />
        <h2 className="text-3xl md:text-4xl font-bold mb-6 max-w-2xl mx-auto leading-tight">
          Ready to transform how you experience music together?
        </h2>
        <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
          Create your first queue in seconds. No credit card, no downloads, just
          music.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-800 rounded-full font-bold text-lg hover:bg-indigo-100 transition-all duration-300 transform hover:scale-105">
            Get Started — It&apos;s Free
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
