module.exports = {
  siteUrl: "https://richardwhudsonjr.com", // Correct URL
  generateRobotsTxt: true, // Automatically generate robots.txt
  exclude: ["/server-sitemap.xml"], // Exclude any server-specific sitemap
  robotsTxtOptions: {
    additionalSitemaps: ["https://richardwhudsonjr.com/server-sitemap.xml"],
  },
};
