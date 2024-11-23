import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Badge } from "../components/ui/badge";
import DownloadButtons from "../components/downloadbuttons"; // Import DownloadButtons component

const animationVariants = {
  initial: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 },
  },
};

const highlights = [
  { value: "$1.1M+", label: "Revenue Growth" },
  { value: "2,200%", label: "Partner Network" },
  { value: "432%", label: "Transaction Volume" },
  { value: "100%", label: "Process Efficiency" },
];

const technologies = [
  "Salesforce",
  "Power BI",
  "PartnerStack",
  "Python",
  "Revenue Ops",
];

export default function Hero() {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-white dark:bg-neutral-900">
      <div
        className="absolute inset-0 bg-gradient-to-b from-primary-50/80 to-transparent dark:from-primary-950/30 dark:to-transparent"
        aria-hidden="true"
      />

      <AnimatePresence mode="wait">
        <div className="relative z-10 max-w-5xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <motion.div
            key="hero-content"
            initial="initial"
            animate="visible"
            exit="exit"
            variants={animationVariants}
          >
            <h1 className="mb-6 text-5xl font-extrabold sm:text-6xl md:text-7xl text-neutral-900 dark:text-white">
              <span className="block">Richard Hudson</span>
              <span className="block mt-2 text-primary-600 dark:text-primary-500">
                Revenue Operations Consultant
              </span>
            </h1>

            <p className="max-w-3xl mx-auto mt-6 text-xl sm:text-2xl text-neutral-600 dark:text-neutral-300">
              Driving revenue growth through data-driven insights, process
              optimization, and strategic operational improvements.
            </p>

            <div className="grid max-w-4xl grid-cols-2 gap-4 mx-auto mt-12 md:grid-cols-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  variants={animationVariants}
                  initial="initial"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border rounded-lg bg-white/5 backdrop-blur-sm border-neutral-200 dark:border-neutral-800"
                  aria-label={`Highlight: ${item.label}, Value: ${item.value}`}
                >
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {item.value}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 mt-10 sm:flex-row">
              <DownloadButtons />
            </div>

            <div className="flex flex-wrap justify-center gap-2 mt-12">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech}
                  variants={animationVariants}
                  initial="initial"
                  animate="visible"
                  transition={{ delay: 0.5 + index * 0.1 }}
                  aria-label={`Technology: ${tech}`}
                >
                  <Badge variant="secondary" className="text-sm">
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </AnimatePresence>

      <motion.button
        onClick={scrollToContent}
        className="absolute transition-colors -translate-x-1/2 bottom-8 left-1/2 text-neutral-500 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-label="Scroll to the main content"
      >
        <ChevronDown className="w-8 h-8 animate-bounce" aria-hidden="true" />
      </motion.button>
    </div>
  );
}
