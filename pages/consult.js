import React, { useState } from "react";
import { NextSeo } from "next-seo";

const Consult = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          date: "",
          time: "",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <>
      <NextSeo
        title="Consult | Richard Hudson Portfolio"
        description="Schedule a consultation with Richard Hudson."
        openGraph={{
          title: "Consult | Richard Hudson Portfolio",
          description: "Schedule a consultation with Richard Hudson.",
          url: "https://www.richardwhudsonjr.com/consult",
          type: "website",
          locale: "en_US",
          site_name: "Richard Hudson Portfolio",
        }}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.richardwhudsonjr.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Consult",
              item: "https://www.richardwhudsonjr.com/consult",
            },
          ],
        }}
      />

      <div className="min-h-screen bg-white dark:bg-neutral-900">
        <div className="max-w-3xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
          <h1 className="mb-8 text-4xl font-bold text-center text-neutral-900 dark:text-white">
            Schedule a Consultation
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full mt-1 p-2.5 border rounded-md dark:bg-neutral-800 dark:border-neutral-700"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full mt-1 p-2.5 border rounded-md dark:bg-neutral-800 dark:border-neutral-700"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2.5 border rounded-md dark:bg-neutral-800 dark:border-neutral-700"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Preferred Time
                </label>
                <input
                  type="time"
                  name="time"
                  id="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2.5 border rounded-md dark:bg-neutral-800 dark:border-neutral-700"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                Message (Optional)
              </label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="block w-full mt-1 p-2.5 border rounded-md dark:bg-neutral-800 dark:border-neutral-700"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={status === "loading"}
                className={`w-full px-4 py-2 font-bold text-white bg-primary-600 rounded-md hover:bg-primary-700 disabled:opacity-50`}
              >
                {status === "loading" ? "Submitting..." : "Submit"}
              </button>
            </div>

            {status === "success" && (
              <p className="mt-4 text-sm text-green-600">
                Your request was submitted successfully!
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 text-sm text-red-600">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Consult;
