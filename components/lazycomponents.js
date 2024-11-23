import dynamic from "next/dynamic";

const ErrorFallback = ({ error }) => {
  console.error("Dynamic import failed:", error);
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <p className="text-lg text-red-500">Failed to load component</p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 mt-4 text-white rounded-lg bg-primary-500 hover:bg-primary-600"
      >
        Retry
      </button>
    </div>
  );
};
ErrorFallback.displayName = "ErrorFallback";

const LoadingPlaceholder = () => (
  <div className="animate-pulse min-h-[calc(100vh-4rem)] bg-neutral-100 dark:bg-neutral-800 rounded-lg" />
);
LoadingPlaceholder.displayName = "LoadingPlaceholder";

const ButtonsLoadingPlaceholder = () => (
  <div className="flex justify-center gap-4 animate-pulse">
    <div className="w-32 h-10 rounded-lg bg-neutral-200 dark:bg-neutral-700" />
    <div className="w-32 h-10 rounded-lg bg-neutral-200 dark:bg-neutral-700" />
  </div>
);
ButtonsLoadingPlaceholder.displayName = "ButtonsLoadingPlaceholder";

// Dynamically load Hero component
function createDynamicHero() {
  const Component = dynamic(
    () =>
      import("./Hero").catch((error) => () => <ErrorFallback error={error} />),
    {
      loading: LoadingPlaceholder,
      ssr: true,
    }
  );
  Component.displayName = "DynamicHero";
  return Component;
}
export const DynamicHero = createDynamicHero();

// Dynamically load DownloadButtons component
function createDynamicDownloadButtons() {
  const Component = dynamic(
    () =>
      import("./downloadbuttons").catch((error) => () => (
        <ErrorFallback error={error} />
      )),
    {
      loading: ButtonsLoadingPlaceholder,
      ssr: false,
    }
  );
  Component.displayName = "DynamicDownloadButtons";
  return Component;
}
export const DynamicDownloadButtons = createDynamicDownloadButtons();

// Dynamically load SocialLinks component
function createDynamicSocialLinks() {
  const Component = dynamic(
    () =>
      import("./sociallinks").catch((error) => () => (
        <ErrorFallback error={error} />
      )),
    {
      loading: LoadingPlaceholder,
      ssr: false,
    }
  );
  Component.displayName = "DynamicSocialLinks";
  return Component;
}
export const DynamicSocialLinks = createDynamicSocialLinks();
