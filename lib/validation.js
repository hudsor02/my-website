import { z } from "zod";

/**
 * Zod schema for validating contact form data
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email must be less than 100 characters"),
  company: z.string().optional(), // Optional field for company name
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
  source: z.string().optional(), // Optional field for lead source
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy",
  }),
});

/**
 * Function to validate email addresses
 * @param {string} email - The email address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
  return emailRegex.test(email);
};

/**
 * Function to validate message content
 * Ensures message meets length requirements and contains no invalid characters.
 * @param {string} message - The message content to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const validateMessage = (message) => {
  if (!message || message.length < 10 || message.length > 1000) {
    return false; // Message must be within length constraints
  }
  const invalidChars = /[<>{}]/g; // Prevent malicious characters
  return !invalidChars.test(message);
};
