import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="mt-auto border-t p-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image src="/logo.svg" alt="Logo" width={140} height={50} />
          </Link>
          <div>© 2026 Career Assistant</div>
        </div>
      </div>
    </footer>
  );
}
