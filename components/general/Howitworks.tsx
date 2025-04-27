import React from "react";

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Create a Queue",
      description:
        "Start by creating a new queue for your event, gathering, or just a casual hangout.",
    },
    {
      number: "02",
      title: "Invite Your Group",
      description:
        "Share a unique link with friends, who can join instantly without downloading anything.",
    },
    {
      number: "03",
      title: "Add Songs",
      description:
        "Everyone can search and add their favorite tracks to the collective queue.",
    },
    {
      number: "04",
      title: "Vote & Listen",
      description:
        "Upvote songs you love, and watch as the most popular ones move up in the queue.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Getting started is quick and simple. No downloads required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center px-4 relative">
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold mx-auto">
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-indigo-200 -z-10 transform -translate-x-8"></div>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
