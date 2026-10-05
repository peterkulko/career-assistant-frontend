import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="mt-auto flex items-center justify-between border-t p-4">
      <Link href="/">
        <Image src="/logo.svg" alt="Logo" width={100} height={100} />
      </Link>
      <div>© 2026 Career Assistant</div>
    </footer>
  );
}
