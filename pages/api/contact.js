import nodemailer from "nodemailer";
import { validateEmail, validateMessage } from "@/lib/validation";

const EMAIL_TEMPLATES = {
  contact: {
    subject: (name) => `New Contact Form Submission from ${name}`,
    template: ({ name, email, message, company }) => ({
      text: `
Name: ${name}
Email: ${email}
${company ? `Company: ${company}\n` : ""}
Message:
${message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h3 style="color: #333;">New Contact Form Submission</h3>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
  <p><strong>Message:</strong></p>
  <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
    ${message.replace(/\n/g, "<br>")}
  </div>
</div>
      `,
    }),
  },
  consult: {
    subject: (name) => `New Consultation Request from ${name}`,
    template: ({ name, email, projectDetails }) => ({
      text: `
Consultation Request:
Name: ${name}
Email: ${email}
Project Details:
${projectDetails}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h3 style="color: #333;">New Consultation Request</h3>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Project Details:</strong></p>
  <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
    ${projectDetails.replace(/\n/g, "<br>")}
  </div>
</div>
      `,
    }),
  },
};

let transporter = null;

async function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT, 10),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  return transporter;
}

async function sendEmail(template, data) {
  const emailTemplate = EMAIL_TEMPLATES[template];
  if (!emailTemplate) throw new Error(`Invalid email template: ${template}`);

  const transporter = await getTransporter();
  const { text, html } = emailTemplate.template(data);

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: emailTemplate.subject(data.name),
    text,
    html,
  });
}

async function validateFormData(data) {
  const { name, email, message } = data;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    throw new Error("Missing required fields");
  }

  if (!validateEmail(email)) {
    throw new Error("Invalid email format");
  }

  if (!validateMessage(message)) {
    throw new Error("Message is too short or contains invalid characters");
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const { type = "contact" } = req.query;

    // Validate the form data
    await validateFormData(req.body);

    // Send the email
    await sendEmail(type, req.body);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Form submission error:", error);

    const statusCode =
      error.message.includes("required") || error.message.includes("Invalid")
        ? 400
        : 500;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to send message",
    });
  }
}
