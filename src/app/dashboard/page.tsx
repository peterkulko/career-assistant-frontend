const stats = [
  { label: "Applications sent", value: 12 },
  { label: "Interviews scheduled", value: 3 },
  { label: "Offers received", value: 1 },
];

export default async function DashboardPage() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // throw new Error("Simulated error for testing error handling");

  return (
    <div>
      <h1 className="text-2xl font-semibold">Overview</h1>
      <p className="mt-1 text-sm text-black/60 dark:text-white/60">
        Welcome back! Here&apos;s a quick look at your job search progress.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map(({ label, value }) => (
          <div
            key={label}
            className="rounded-lg border border-black/10 p-4 dark:border-white/10"
          >
            <p className="text-2xl font-semibold">{value}</p>
            <p className="text-sm text-black/60 dark:text-white/60">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
