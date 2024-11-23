import Head from "next/head";
import { DynamicSocialLinks } from "../components/lazycomponents";

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Head>
        <title>About - Richard Hudson</title>
        <meta
          name="description"
          content="Learn more about Richard Hudson, a Revenue Operations Consultant specializing in data-driven solutions."
        />
      </Head>

      <main className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <section className="prose dark:prose-invert max-w-none">
          <h1 className="mb-8 text-4xl font-bold text-neutral-900 dark:text-white">
            About Me
          </h1>

          <p className="text-lg text-neutral-700 dark:text-neutral-300">
            As a Revenue Operations Consultant, I specialize in helping
            businesses optimize their revenue processes through data-driven
            insights and strategic operational improvements. With a proven track
            record of driving significant growth and implementing scalable
            solutions, I focus on aligning sales operations with business
            objectives.
          </p>

          <div className="mt-8">
            <h2 className="mb-4 text-2xl font-bold text-neutral-900 dark:text-white">
              My Approach
            </h2>
            <ul className="pl-6 list-disc text-neutral-700 dark:text-neutral-300">
              <li>Data-driven decision-making</li>
              <li>Process optimization and automation</li>
              <li>Cross-functional collaboration</li>
              <li>Strategic planning and implementation</li>
              <li>Continuous improvement methodology</li>
            </ul>
          </div>

          <div className="mt-12">
            <h2 className="mb-4 text-2xl font-bold text-neutral-900 dark:text-white">
              Connect With Me
            </h2>
            <DynamicSocialLinks />
          </div>
        </section>
      </main>
    </div>
  );
}
