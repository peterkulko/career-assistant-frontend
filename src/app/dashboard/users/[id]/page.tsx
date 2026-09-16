interface UserPageProps {
  params: Promise<{ id: string }>;
}

export default async function UserPage({ params }: UserPageProps) {
  const { id } = await params;
  return (
    <div>
      <h1 className="text-2xl font-semibold">User Page</h1>
      <p className="mt-1 text-sm text-black/60 dark:text-white/60">
        User ID: {id}
      </p>
    </div>
  );
}
