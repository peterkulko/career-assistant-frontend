import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">404 - Page Not Found</h1>
      <p className="mt-1 text-sm text-black/60 dark:text-white/60">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
    </div>
  );
}
