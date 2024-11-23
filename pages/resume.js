import React, { useState } from "react";
import Head from "next/head";
import { Card } from "../components/ui";
import DownloadButtons from "../components/downloadbuttons";
import { resumeData } from "../lib/resumeData";
import SectionHeader from "../components/sectionheader";

export default function Resume() {
  const [expandedSections, setExpandedSections] = useState({
    experience: true,
    skills: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const HighlightsSection = () => (
    <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4">
      {resumeData.highlights.map(({ metric, description }, index) => (
        <Card key={index} className="p-4 text-center">
          <div className="mb-1 text-2xl font-bold text-primary-500 dark:text-primary-400">
            {metric}
          </div>
          <div className="text-sm text-neutral-700 dark:text-neutral-200">
            {description}
          </div>
        </Card>
      ))}
    </div>
  );

  const ProfessionalSummarySection = () => (
    <section className="mb-6">
      <SectionHeader title="PROFESSIONAL SUMMARY" />
      <Card className="p-6">
        <p className="text-base leading-relaxed text-neutral-900 dark:text-neutral-100">
          {resumeData.summary}
        </p>
      </Card>
    </section>
  );

  const ProfessionalExperienceSection = () => (
    <section className="mb-6">
      <SectionHeader
        title="PROFESSIONAL EXPERIENCE"
        toggleable
        section="experience"
        onToggle={toggleSection}
        expandedSections={expandedSections}
      />
      {expandedSections.experience &&
        resumeData.experience.map(
          ({ position, company, location, dates, achievements }, index) => (
            <Card key={index} className="p-6 mb-4">
              <Card.Header className="flex flex-col items-start justify-between mb-3 md:flex-row md:items-center">
                <div>
                  <Card.Title>{position}</Card.Title>
                  <div className="text-base text-neutral-700 dark:text-neutral-200">
                    {company} -- {location}
                  </div>
                </div>
                <div className="mt-1 font-medium text-primary-600 dark:text-primary-400 md:mt-0">
                  {dates}
                </div>
              </Card.Header>
              <Card.Content>
                <ul className="space-y-2">
                  {achievements.map((achievement, i) => (
                    <li
                      key={i}
                      className="text-neutral-800 dark:text-neutral-100 pl-4 relative text-base before:content-['•'] before:absolute before:left-0 before:text-primary-500"
                    >
                      {achievement}
                    </li>
                  ))}
                </ul>
              </Card.Content>
            </Card>
          )
        )}
    </section>
  );

  const TechnicalExpertiseSection = () => (
    <section className="mb-6">
      <SectionHeader
        title="TECHNICAL EXPERTISE"
        toggleable
        section="skills"
        onToggle={toggleSection}
        expandedSections={expandedSections}
      />
      {expandedSections.skills && (
        <div className="grid gap-4 md:grid-cols-3">
          {resumeData.technicalExpertise.columns.map(
            ({ title, items }, index) => (
              <Card key={index} className="p-6">
                <h3 className="mb-4 text-lg font-bold text-center text-neutral-900 dark:text-neutral-100">
                  {title}
                </h3>
                <ul className="space-y-2">
                  {items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-neutral-800 dark:text-neutral-100 pl-4 relative text-base before:content-['•'] before:absolute before:left-0 before:text-primary-500"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            )
          )}
        </div>
      )}
    </section>
  );

  const EducationSection = () => (
    <section className="mb-4">
      <SectionHeader title="EDUCATION" />
      <Card className="p-6">
        <div className="text-center">
          <div className="mb-1 text-lg font-bold text-neutral-900 dark:text-neutral-100">
            {resumeData.educationAndCertifications.education.degree}
          </div>
          <div className="text-base text-neutral-700 dark:text-neutral-200">
            {resumeData.educationAndCertifications.education.school} --{" "}
            {resumeData.educationAndCertifications.education.location}
          </div>
        </div>
      </Card>
      <div className="mt-4">
        <SectionHeader title="CERTIFICATIONS" />
        <ul className="space-y-2 list-disc list-inside text-neutral-700 dark:text-neutral-200">
          {resumeData.educationAndCertifications.certifications.map(
            (certification, index) => (
              <li key={index}>{certification}</li>
            )
          )}
        </ul>
      </div>
    </section>
  );

  return (
    <>
      <Head>
        <title>Resume - Richard Hudson</title>
        <meta
          name="description"
          content="Professional resume of Richard Hudson, Revenue Operations Professional"
        />
      </Head>

      <div className="max-w-4xl px-6 py-4 mx-auto">
        <DownloadButtons />
      </div>

      <main className="max-w-4xl px-6 pt-4 mx-auto">
        <HighlightsSection />
        <ProfessionalSummarySection />
        <ProfessionalExperienceSection />
        <TechnicalExpertiseSection />
        <EducationSection />
      </main>
    </>
  );
}
