import React from "react";
import Navbar from "./Navbar";
import HomeSection from "./HomeSection";
// import StatsCards from "./StatsCards";
import AboutSection from "./AboutSection";
import Departments from "./Departments";
import HowItWorks from "./HowItWorks";
import ContactSection from "./ContactSection";

function DashboardPage() {
  return (
    <div>
      <Navbar />

      <main>
        <HomeSection />

        {/* <StatsCards /> */}

        <AboutSection />

        <Departments />

        <HowItWorks />

        <ContactSection />
      </main>
    </div>
  );
}

export default DashboardPage;