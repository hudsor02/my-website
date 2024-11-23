// components/Notifications/Toast.js
import { Toaster, toast } from "react-hot-toast";

export const ToastContainer = () => (
  <Toaster
    position="top-right"
    toastOptions={{
      duration: 5000,
      style: {
        background: "#333",
        color: "#fff",
      },
      success: {
        duration: 3000,
        iconTheme: {
          primary: "#4CAF50",
          secondary: "#fff",
        },
      },
      error: {
        duration: 4000,
        iconTheme: {
          primary: "#E57373",
          secondary: "#fff",
        },
      },
    }}
  />
);

export const notify = {
  success: (message) => toast.success(message),
  error: (message) => toast.error(message),
  loading: (message) => toast.loading(message),
  custom: (message, icon) => toast(message, { icon }),
};
