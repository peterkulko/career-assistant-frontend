export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Auth Layout</h1>
      <p className="mt-1 text-sm text-black/60 dark:text-white/60">
        This is the layout for authentication pages.
      </p>
      {children}
    </div>
  );
}
