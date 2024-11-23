// lib/validations/contact.js
import { z } from "zod";
import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from "../contact-config";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email cannot exceed 100 characters"),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(100, "Subject cannot exceed 100 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message cannot exceed 1000 characters"),
  company: z.string().optional(),
  attachments: z
    .array(
      z.object({
        file: z.any(),
        size: z.number().max(MAX_FILE_SIZE, "File size must be less than 5MB"),
        type: z
          .string()
          .refine(
            (type) => ALLOWED_FILE_TYPES.includes(type),
            "Invalid file type"
          ),
      })
    )
    .optional(),
});
