// components/SEO/DefaultSeo.js
import { NextSeo } from "next-seo";

const config = {
  title: "Richard Hudson - Revenue Operations Professional",
  description:
    "Revenue Operations Professional specializing in data-driven strategies, process optimization, and digital solutions",
  canonical: "https://richardwhudsonjr.com",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://richardwhudsonjr.com",
    siteName: "Richard Hudson",
    title: "Richard Hudson - Revenue Operations Professional",
    description:
      "Revenue Operations Professional specializing in data-driven strategies",
    images: [
      {
        url: "https://richardwhudsonjr.com/og-image.jpg", // You'll need to create this
        width: 1200,
        height: 630,
        alt: "Richard Hudson",
      },
    ],
  },
  twitter: {
    handle: "@dickswayze",
    site: "@dickswayze",
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      property: "keywords",
      content:
        "revenue operations, sales operations, process optimization, data analytics, partner management, automation",
    },
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
  ],
};

const DefaultSeo = () => <NextSeo {...config} />;

export default DefaultSeo;
