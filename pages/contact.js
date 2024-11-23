import React, { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import { validateEmail } from "@/lib/validation";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // Tracks 'loading', 'success', 'error'
  const [success, setSuccess] = useState(false);

  // Update form state on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate the form fields before submission
  const isFormValid = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      return false;
    }
    return validateEmail(formData.email);
  };

  // Submit the form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setStatus("validation-error");
      return;
    }
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setSuccess(true); // Show success message
        setFormData({ name: "", email: "", subject: "", message: "" }); // Reset form
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setStatus("error");
    }
  };

  // Success Page
  if (success) {
    return (
      <>
        <Head>
          <title>Message Sent - Richard Hudson</title>
          <meta
            name="description"
            content="Your message has been successfully sent to Richard Hudson."
          />
        </Head>

        <main className="flex items-center justify-center min-h-screen bg-white dark:bg-neutral-900">
          <motion.div
            className="p-8 text-center rounded-lg shadow-md bg-neutral-100 dark:bg-neutral-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-4 text-3xl font-bold text-neutral-900 dark:text-white">
              Message Sent!
            </h1>
            <p className="mb-6 text-neutral-700 dark:text-neutral-300">
              Thank you for reaching out. I’ll get back to you as soon as
              possible.
            </p>
            <Link href="/">
              <a className="btn btn-primary">Back to Home</a>
            </Link>
          </motion.div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Contact - Richard Hudson</title>
        <meta
          name="description"
          content="Get in touch with Richard Hudson for consultations, inquiries, and more."
        />
      </Head>

      <main className="min-h-screen bg-white dark:bg-neutral-900">
        <motion.section
          className="max-w-3xl px-4 py-16 mx-auto sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-8 text-4xl font-bold text-center text-neutral-900 dark:text-white">
            Contact Richard Hudson
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Your Full Name"
                required
                aria-required="true"
                aria-label="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="you@example.com"
                required
                aria-required="true"
                aria-label="Enter your email address"
              />
              {status === "validation-error" &&
                !validateEmail(formData.email) && (
                  <p className="mt-1 text-sm text-red-600">
                    Please enter a valid email address.
                  </p>
                )}
            </div>

            <div>
              <label htmlFor="subject" className="form-label">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                className="form-input"
                placeholder="Brief Subject"
                required
                aria-required="true"
                aria-label="Enter a brief subject"
              />
            </div>

            <div>
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className="form-textarea"
                placeholder="Your message here..."
                required
                aria-required="true"
                aria-label="Enter your message"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className={`btn btn-primary w-full ${
                status === "loading" ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {status === "loading" ? "Submitting..." : "Send Message"}
            </button>

            {/* Error Message */}
            {status === "error" && (
              <p className="mt-4 text-sm text-red-600">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </motion.section>
      </main>
    </>
  );
}
