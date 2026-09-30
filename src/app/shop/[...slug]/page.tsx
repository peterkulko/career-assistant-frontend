interface ShopPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function ShopPage({ params }: ShopPageProps) {
  const {
    slug: [category, product],
  } = await params;

  return (
    <div>
      <h1 className="text-2xl font-semibold">Shop Page</h1>
      <p className="mt-1 text-sm text-black/60 dark:text-white/60">
        Category: {category}, Product: {product}
      </p>
    </div>
  );
}
