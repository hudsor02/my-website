// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const setInitialTheme = `
    (function() {
      try {
        var mode = localStorage.getItem('darkMode');
        var prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (mode === 'true' || (!mode && prefersDarkMode)) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (e) {
        console.error('Failed to initialize theme:', e);
      }
    })();
  `;

  return (
    <Html lang="en">
      <Head>
        {/* Meta theme-color */}
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#0f172a"
          media="(prefers-color-scheme: dark)"
        />

        {/* Font optimization */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
          media="print"
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
        </noscript>
      </Head>
      <body className="bg-white dark:bg-neutral-900">
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
