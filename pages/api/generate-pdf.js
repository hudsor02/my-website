import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function generatePDF(resumeData) {
  try {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    // Add a new page to the document
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 dimensions in points
    const { width, height } = page.getSize();
    const fontSize = 12;

    // Title
    page.drawText(resumeData.title || "Richard Hudson Resume", {
      x: 50,
      y: height - 50,
      size: 24,
      font: timesRomanFont,
      color: rgb(0, 0.53, 0.71),
    });

    // Professional Summary
    page.drawText("Professional Summary:", {
      x: 50,
      y: height - 100,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });
    page.drawText(resumeData.summary || "No summary available.", {
      x: 50,
      y: height - 120,
      size: fontSize - 1,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
      maxWidth: 500,
      lineHeight: 14,
    });

    // Generate Professional Experience
    let yPosition = height - 180;
    page.drawText("Professional Experience:", {
      x: 50,
      y: yPosition,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    yPosition -= 20;

    resumeData.experience.forEach((job) => {
      if (yPosition < 50) {
        page.addPage();
        yPosition = height - 50;
      }

      page.drawText(`${job.position} at ${job.company} (${job.dates})`, {
        x: 50,
        y: yPosition,
        size: fontSize - 1,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      yPosition -= 20;
      job.achievements.forEach((achievement) => {
        if (yPosition < 50) {
          page.addPage();
          yPosition = height - 50;
        }

        page.drawText(`- ${achievement}`, {
          x: 70,
          y: yPosition,
          size: fontSize - 2,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });

        yPosition -= 14;
      });

      yPosition -= 10;
    });

    // Serialize the PDF document to bytes
    const pdfBytes = await pdfDoc.save();

    // Create a blob and return it for download
    return new Blob([pdfBytes], { type: "application/pdf" });
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate PDF.");
  }
}
