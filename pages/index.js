import React, { useState } from "react";
import Head from "next/head";
import Navigation from "../components/navigation"; // Top Navigation Bar
import Footer from "../components/footer"; // Footer
import Hero from "../components/Hero"; // Hero Section
import SectionHeader from "../components/sectionheader"; // Section Header Component
import SideNavigation from "../components/sidenavigation"; // Collapsible Side Navigation
import { motion } from "framer-motion";
import { ChartBar as Chart, Users, Zap } from "lucide-react";

// Services data for "How I Can Help" section
const services = [
  {
    icon: Chart,
    title: "Revenue Optimization",
    description:
      "Data-driven strategies to maximize revenue growth and operational efficiency.",
    link: "/services#revenue-optimization",
  },
  {
    icon: Users,
    title: "Partnership Development",
    description:
      "Strategic partnership programs that drive sustainable business growth.",
    link: "/services#partnerships",
  },
  {
    icon: Zap,
    title: "Process Automation",
    description:
      "Streamlined workflows and automated systems for improved productivity.",
    link: "/services#automation",
  },
];

export default function HomePage() {
  const [isCollapsed, setIsCollapsed] = useState(false); // State to manage sidebar collapse

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  return (
    <>
      {/* Head Section */}
      <Head>
        <title>Richard Hudson - Revenue Operations Consultant</title>
        <meta
          name="description"
          content="Richard Hudson is a Revenue Operations Consultant specializing in data-driven optimization and strategic improvements."
        />
      </Head>

      {/* Top Navigation */}
      <Navigation />

      {/* Collapsible Side Navigation */}
      <SideNavigation isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <main
        className={`min-h-screen bg-white dark:bg-neutral-900 transition-all duration-300 ${
          isCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        {/* Hero Section */}
        <Hero />

        {/* Services Section */}
        <section className="py-16">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <SectionHeader title="How I Can Help" />
            <div className="grid gap-8 md:grid-cols-3">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.title}
                    className="h-full p-6 transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg dark:bg-neutral-800"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    aria-label={`Service: ${service.title}`}
                  >
                    <div className="flex items-center justify-center mb-4">
                      <Icon
                        className="w-12 h-12 text-primary-500"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-center text-neutral-900 dark:text-white">
                      {service.title}
                    </h3>
                    <p className="text-center text-neutral-600 dark:text-neutral-300">
                      {service.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <Footer />
    </>
  );
}
