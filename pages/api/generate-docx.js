import { Document, Packer, Paragraph, TextRun } from "docx";

/**
 * Generates a DOCX file for the user's resume.
 * @param {Object} resumeData - The resume data object.
 * @returns {Blob} - A Blob object containing the generated DOCX file.
 */
export async function generateDOCX(resumeData) {
  try {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            // Title
            new Paragraph({
              children: [
                new TextRun({
                  text: resumeData.title || "Richard Hudson Resume",
                  bold: true,
                  size: 32,
                  color: "007ACC",
                }),
              ],
              spacing: { after: 200 },
            }),

            // Professional Summary
            new Paragraph({
              children: [
                new TextRun({
                  text: "Professional Summary:",
                  bold: true,
                  size: 24,
                }),
              ],
              spacing: { after: 100 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: resumeData.summary || "No summary available.",
                  size: 22,
                }),
              ],
            }),

            // Professional Experience
            new Paragraph({
              children: [
                new TextRun({
                  text: "Professional Experience:",
                  bold: true,
                  size: 24,
                }),
              ],
              spacing: { before: 200, after: 100 },
            }),
            ...resumeData.experience.map(
              (job) =>
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `${job.position} at ${job.company} (${job.dates})`,
                      bold: true,
                      size: 22,
                    }),
                    new TextRun({
                      text: `\n${job.location}`,
                      size: 20,
                      italics: true,
                    }),
                    ...job.achievements.map(
                      (achievement) =>
                        new TextRun({
                          text: `\n- ${achievement}`,
                          size: 20,
                        })
                    ),
                  ],
                  spacing: { after: 200 },
                })
            ),

            // Technical Expertise
            new Paragraph({
              children: [
                new TextRun({
                  text: "Technical Expertise:",
                  bold: true,
                  size: 24,
                }),
              ],
              spacing: { before: 200, after: 100 },
            }),
            ...resumeData.technicalExpertise.columns.map(
              (column) =>
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `${column.title}: `,
                      bold: true,
                      size: 22,
                    }),
                    ...column.items.map(
                      (item) =>
                        new TextRun({
                          text: `${item}, `,
                          size: 20,
                        })
                    ),
                  ],
                })
            ),

            // Education
            new Paragraph({
              children: [
                new TextRun({
                  text: "Education:",
                  bold: true,
                  size: 24,
                }),
              ],
              spacing: { before: 200, after: 100 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `${resumeData.education.degree} from ${resumeData.education.school}`,
                  size: 22,
                }),
                new TextRun({
                  text: `\nLocation: ${resumeData.education.location}`,
                  size: 20,
                  italics: true,
                }),
              ],
            }),
          ],
        },
      ],
    });

    // Generate the DOCX file as a Blob
    const buffer = await Packer.toBlob(doc);
    return buffer;
  } catch (error) {
    console.error("Error generating DOCX:", error);
    throw new Error("Failed to generate DOCX.");
  }
}
