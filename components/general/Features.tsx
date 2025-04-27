import React from "react";
import { Music, ThumbsUp, Users, Clock, Lock } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-5 text-indigo-600">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const Features: React.FC = () => {
  const features = [
    {
      icon: <Music className="h-6 w-6" />,
      title: "Collaborative Queue",
      description:
        "Build the perfect playlist together with friends, colleagues, or event attendees.",
    },
    {
      icon: <ThumbsUp className="h-6 w-6" />,
      title: "Song Upvoting",
      description:
        "Let the group decide what plays next by upvoting their favorite songs in the queue.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Group Listening",
      description:
        "Everyone hears the same songs at the same time, creating a shared experience.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Queue Management",
      description:
        "Intelligent queue system keeps track of songs and plays them in order of popularity.",
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Private Groups",
      description:
        "Create private listening rooms for just you and your invited guests.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Perfect Group Listening Experience
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our intuitive features make it easy to create the soundtrack for any
            gathering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
