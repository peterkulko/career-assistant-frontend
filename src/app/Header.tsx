import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="flex items-center justify-between border-b p-4">
      <Link href="/">
        <Image src="/logo.svg" alt="Logo" width={100} height={100} />
      </Link>

      <div className="flex gap-2">
        <Button
          variant="secondary"
          nativeButton={false}
          render={<Link href="/login" />}
        >
          Sign In
        </Button>
        <Button nativeButton={false} render={<Link href="/register" />}>
          Sign Out
        </Button>
      </div>
    </header>
  );
}
