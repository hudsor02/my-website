import { DOCUMENT_CONFIG } from "./document-config";

// Helper function to generate section headers
export const generateSectionHeader = (doc, title) => {
  doc
    .fontSize(DOCUMENT_CONFIG.FONT_SIZES.SUBHEADER)
    .fillColor(DOCUMENT_CONFIG.COLORS.PRIMARY)
    .text(title, { underline: true, align: "left" })
    .moveDown(1);
};

// Helper function to generate formatted text content
export const generateText = (doc, text, options = {}) => {
  const { fontSize, color, align } = {
    fontSize: DOCUMENT_CONFIG.FONT_SIZES.TEXT,
    color: DOCUMENT_CONFIG.COLORS.TEXT,
    align: "justify", // Ensuring justified text for readability
    ...options,
  };

  doc.fontSize(fontSize).fillColor(color).text(text, { align }).moveDown(0.5); // Add space after the text for readability
};

// Helper function to generate smaller text (e.g., job dates)
export const generateSmallText = (doc, text) => {
  doc
    .fontSize(DOCUMENT_CONFIG.FONT_SIZES.SMALL_TEXT)
    .fillColor(DOCUMENT_CONFIG.COLORS.SECONDARY)
    .text(text)
    .moveDown(0.5);
};
