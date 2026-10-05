import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b p-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image src="/logo.svg" alt="Logo" width={140} height={50} />
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
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
