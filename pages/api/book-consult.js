import React, { useState } from "react";
import Head from "next/head";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export default function BookConsult() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    preferredDate: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/book-consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit consultation request.");
      }

      toast.success("Your consultation request has been sent!");
      setFormData({
        name: "",
        email: "",
        preferredDate: "",
        message: "",
      });
    } catch (error) {
      console.error("Error booking consultation:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Book a Consultation - Richard Hudson</title>
        <meta
          name="description"
          content="Book a consultation with Richard Hudson to discuss your revenue operations needs."
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
            Book a Consultation
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
              />
            </div>

            <div>
              <label htmlFor="preferredDate" className="form-label">
                Preferred Date
              </label>
              <input
                type="date"
                name="preferredDate"
                id="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                className="form-input"
                required
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
                placeholder="What would you like to discuss?"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn btn-primary w-full ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </button>
          </form>
        </motion.section>
      </main>
    </>
  );
}
