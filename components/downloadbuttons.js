import React, { useState } from "react";
import { FileText, Download } from "lucide-react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FORMATS = {
  PDF: "pdf",
  DOCX: "docx",
};

const DownloadButtons = () => {
  const [isLoading, setIsLoading] = useState({
    [FORMATS.PDF]: false,
    [FORMATS.DOCX]: false,
  });
  const [error, setError] = useState(null);

  const handleDownload = async (format) => {
    if (isLoading[format]) return;

    setIsLoading((prev) => ({ ...prev, [format]: true }));
    setError(null);

    try {
      const response = await fetch(`/api/generate-document`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ format }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const filename = `Richard_Hudson_Resume.${format}`;

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      Object.assign(link, {
        href: url,
        download: filename,
        style: { display: "none" },
      });

      document.body.appendChild(link);
      link.click();

      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);

      toast.success(`Resume ${format.toUpperCase()} downloaded successfully!`);
    } catch (error) {
      console.error(`Error during ${format} download:`, error);
      setError(error.message);
      toast.error(
        `Unable to download ${format.toUpperCase()}. Please try again.`
      );
    } finally {
      setIsLoading((prev) => ({ ...prev, [format]: false }));
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {error && (
        <div className="p-4 mb-4 text-red-500 bg-red-100 rounded-lg dark:bg-red-900/20">
          {error}
        </div>
      )}

      <div className="flex justify-center gap-4 mb-6">
        <Button
          onClick={() => handleDownload(FORMATS.PDF)}
          disabled={isLoading[FORMATS.PDF]}
          className={cn(
            "bg-primary-500 text-white hover:bg-primary-600",
            "flex items-center gap-2 px-6 py-3 rounded-lg",
            "transition-colors duration-200"
          )}
          loading={isLoading[FORMATS.PDF]}
        >
          <FileText className="w-5 h-5" aria-hidden="true" />
          <span>
            {isLoading[FORMATS.PDF]
              ? "Generating PDF..."
              : "Download Resume PDF"}
          </span>
        </Button>

        <Button
          onClick={() => handleDownload(FORMATS.DOCX)}
          disabled={isLoading[FORMATS.DOCX]}
          className={cn(
            "bg-neutral-200 dark:bg-neutral-700",
            "text-neutral-900 dark:text-white",
            "hover:bg-neutral-300 dark:hover:bg-neutral-600",
            "flex items-center gap-2 px-6 py-3 rounded-lg",
            "transition-colors duration-200"
          )}
          loading={isLoading[FORMATS.DOCX]}
        >
          <Download className="w-5 h-5" aria-hidden="true" />
          <span>
            {isLoading[FORMATS.DOCX]
              ? "Generating Word Doc..."
              : "Download Word Doc"}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default DownloadButtons;
