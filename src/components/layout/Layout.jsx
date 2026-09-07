import Navbar from "./Navbar";

import AnimatedBackground from "../background/AnimatedBackground";

import Hero from "../hero/Hero";

import WhySafeRoute from "../sections/WhySafeRoute";
import JourneySection from "../sections/JourneySection";
import Statistics from "../sections/Statistics";

import MiniMap from "../map/MiniMap";

import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-white">

      {/* Global Background */}
      <AnimatedBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">

        {/* Hero */}
        <Hero />

        {/* Why SafeRoute */}
        <WhySafeRoute />

        {/* Journey Story */}
        <JourneySection />

        {/* Expandable Map Preview */}
        <MiniMap />

        {/* Community Statistics */}
        <Statistics />

        {/* Footer */}
        <Footer />

       

      </main>

    </div>
  );
}