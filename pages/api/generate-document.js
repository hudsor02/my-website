import { generatePDF } from "./generate-pdf";
import { generateDOCX } from "./generate-docx";

/**
 * Generates a document (PDF or DOCX) based on the selected type.
 * @param {string} type - The document type ('pdf' or 'docx').
 * @param {Object} resumeData - The data used to generate the document.
 * @returns {Blob} - A Blob object containing the generated document.
 */
export async function generateDocument(type, resumeData) {
  try {
    if (!resumeData) {
      throw new Error("Resume data is required.");
    }

    switch (type.toLowerCase()) {
      case "pdf":
        return await generatePDF(resumeData);
      case "docx":
        return await generateDOCX(resumeData);
      default:
        throw new Error("Invalid document type. Supported types: pdf, docx.");
    }
  } catch (error) {
    console.error("Error generating document:", error);
    throw new Error("Failed to generate document. Please try again.");
  }
}
