import CallToAction from "@/components/general/Calltoaction";
import Features from "@/components/general/Features";
import Footer from "@/components/general/Footer";
import Hero from "@/components/general/Hero";
import HowItWorks from "@/components/general/Howitworks";
import Showcase from "@/components/general/Showcase";

export default function Home() {
  return (
    <div>
      {" "}
      <Hero />
      <Features />
      <HowItWorks />
      <Showcase />
      <CallToAction />
      <Footer />
    </div>
  );
}
