// lib/services/document.js
import { DOCUMENT_CONFIG } from "../document-config";
import { trackEvent } from "../analytics";

export async function generateDocument(format, data) {
  // Validate format
  const normalizedFormat = format.toLowerCase();
  if (!Object.values(DOCUMENT_CONFIG.FORMATS).includes(normalizedFormat)) {
    throw new Error(`Invalid format: ${format}`);
  }

  try {
    const startTime = performance.now();

    // Make API request to correct endpoint based on format
    const response = await fetch(`/api/generate-${normalizedFormat}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorMessage = `HTTP error! status: ${response.status}`;
      trackEvent("document_generation_error", {
        format: normalizedFormat,
        error: errorMessage,
        timestamp: new Date().toISOString(),
      });
      throw new Error(errorMessage);
    }

    const blob = await response.blob();
    const filename = `Richard_Hudson_Resume.${normalizedFormat}`;
    const duration = performance.now() - startTime;

    // Track successful generation
    trackEvent("document_generation_success", {
      format: normalizedFormat,
      fileSize: blob.size,
      generationTime: Math.round(duration),
      timestamp: new Date().toISOString(),
    });

    return { blob, filename };
  } catch (error) {
    // Track generation error
    trackEvent("document_generation_error", {
      format: normalizedFormat,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
    throw error;
  }
}
