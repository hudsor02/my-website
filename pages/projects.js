// pages/projects.js
import Head from "next/head";
import { Card } from "../components/ui";

const projects = [
  {
    title: "Revenue Growth Optimization",
    description:
      "Implemented data-driven strategies resulting in $1.1M+ annual revenue increase through operational optimization.",
    tags: ["Revenue Operations", "Data Analysis", "Process Optimization"],
  },
  {
    title: "Partner Network Expansion",
    description:
      "Led growth initiatives resulting in 2,200% partner network expansion and 432% transaction volume increase.",
    tags: ["Partnership Development", "Growth Strategy", "Network Expansion"],
  },
  {
    title: "Commission Management System",
    description:
      "Engineered automated system achieving 100% accuracy across thousands of monthly transactions.",
    tags: ["Automation", "System Design", "Process Improvement"],
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Head>
        <title>Projects - Richard Hudson</title>
        <meta
          name="description"
          content="Explore Richard Hudson's revenue operations and process optimization projects."
        />
      </Head>

      <main className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-bold text-neutral-900 dark:text-white">
          Projects
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Card key={index} className="p-6 transition-shadow hover:shadow-lg">
              <Card.Header>
                <Card.Title>{project.title}</Card.Title>
              </Card.Header>
              <Card.Content>
                <p className="mb-4 text-neutral-700 dark:text-neutral-300">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
