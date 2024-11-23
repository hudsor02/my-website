// lib/tracking.js
export const trackUserBehavior = {
  // Page engagement
  startTime: Date.now(),
  scrollDepth: 0,
  interactions: 0,

  init() {
    this.trackScroll();
    this.trackInteractions();
    this.trackTimeOnPage();
  },

  trackScroll() {
    let maxScroll = 0;
    document.addEventListener("scroll", () => {
      const scrollPercent =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if (maxScroll % 25 === 0) {
          // Track at 25%, 50%, 75%, 100%
          trackEvent("scroll_depth", { depth: maxScroll });
        }
      }
    });
  },

  trackInteractions() {
    document.addEventListener("click", (e) => {
      const target = e.target.closest('a, button, [role="button"]');
      if (target) {
        trackEvent("interaction", {
          type: "click",
          element: target.tagName,
          text: target.textContent,
          path: target.getAttribute("href") || null,
        });
      }
    });
  },

  trackTimeOnPage() {
    const interval = setInterval(() => {
      const timeSpent = Math.floor((Date.now() - this.startTime) / 1000);
      if (timeSpent % 30 === 0) {
        // Track every 30 seconds
        trackEvent("time_on_page", { seconds: timeSpent });
      }
    }, 1000);

    window.addEventListener("beforeunload", () => {
      clearInterval(interval);
      const finalTime = Math.floor((Date.now() - this.startTime) / 1000);
      trackEvent("page_exit", { timeSpent: finalTime });
    });
  },
};
