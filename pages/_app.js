import React from "react";
import { Analytics } from "@vercel/analytics/react";
import Layout from "../components/layout/layout";
import { ThemeProvider } from "../lib/ThemeContext";
import { ToastProvider } from "../components/Notifications/toastprovider";
import ErrorBoundary from "../components/errorboundary";
import "../styles/globals.css";

console.log("_app.js loaded");

export default function MyApp({ Component, pageProps }) {
  console.log("MyApp rendering");

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Analytics />
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
