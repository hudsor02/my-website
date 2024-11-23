// lib/validations/document.js
import { z } from "zod";
import { DOCUMENT_CONFIG } from "../document-config";

export const documentGenerationSchema = z.object({
  format: z.enum([DOCUMENT_CONFIG.FORMATS.PDF, DOCUMENT_CONFIG.FORMATS.DOCX], {
    required_error: "Document format is required",
    invalid_type_error: "Format must be either 'pdf' or 'docx'",
  }),
  data: z.object({
    header: z.object({
      name: z.string(),
      email: z.string().email(),
      phone: z.string(),
      website: z.string().url().optional(),
      linkedin: z.string(),
    }),
    highlights: z.array(
      z.object({
        metric: z.string(),
        description: z.string(),
      })
    ),
    summary: z.string(),
    experience: z.array(
      z.object({
        company: z.string(),
        location: z.string(),
        position: z.string(),
        dates: z.string(),
        achievements: z.array(z.string()),
      })
    ),
    technicalExpertise: z.object({
      columns: z.array(
        z.object({
          title: z.string(),
          items: z.array(z.string()),
        })
      ),
    }),
    education: z.object({
      degree: z.string(),
      school: z.string(),
      location: z.string(),
    }),
  }),
});
