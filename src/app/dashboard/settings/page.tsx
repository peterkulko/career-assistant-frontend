const settingsSections = [
  {
    title: "Profile",
    description: "Update your name, email, and public details.",
  },
  {
    title: "Notifications",
    description: "Choose which updates you want to be emailed about.",
  },
  {
    title: "Password",
    description: "Change your password or enable two-factor authentication.",
  },
];

export default function DashboardSettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Settings</h1>
      <p className="mt-1 text-sm text-black/60 dark:text-white/60">
        Manage your account preferences.
      </p>

      <div className="mt-6 flex flex-col divide-y divide-black/10 dark:divide-white/10">
        {settingsSections.map(({ title, description }) => (
          <div
            key={title}
            className="flex items-center justify-between gap-4 py-4"
          >
            <div>
              <p className="font-medium">{title}</p>
              <p className="text-sm text-black/60 dark:text-white/60">
                {description}
              </p>
            </div>
            <button
              type="button"
              className="shrink-0 rounded-md border border-black/10 px-3 py-1.5 text-sm font-medium hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
