"use client";

import { useState } from "react";

export default function DashboardTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [visits, setVisits] = useState(0);

  return (
    <div>
      <p className="mb-4 text-xs text-black/60 dark:text-white/60">
        Template render count: {visits} (resets to 0 on every navigation —
        compare with the search box in layout.tsx, which keeps its value)
        <button
          type="button"
          onClick={() => setVisits((v) => v + 1)}
          className="ml-2 rounded border border-black/10 px-2 py-0.5 dark:border-white/10"
        >
          +1
        </button>
      </p>
      {children}
    </div>
  );
}
