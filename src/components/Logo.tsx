import Image from "next/image";
import Link from "next/link";
import { BRAND_NAME } from "@/lib/config";

// Current mark: the compass crop from the existing KLG logo file, beside a text wordmark.
// Kept deliberately simple so the image can be swapped in one place when the logo is revised.
export function Logo({ dark = false, size = "md" }: { dark?: boolean; size?: "md" | "lg" }) {
  const px = size === "lg" ? 44 : 36;
  return (
    <Link
      href="/"
      aria-label={`${BRAND_NAME} home`}
      className={`inline-flex items-center gap-2.5 whitespace-nowrap font-display font-semibold ${
        size === "lg" ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
      } ${dark ? "text-white" : "text-navy"}`}
    >
      <span
        className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 ${
          dark ? "bg-white ring-white/30" : "bg-white ring-vellum"
        }`}
        style={{ width: px, height: px }}
        aria-hidden
      >
        <Image src="/brand/klg-mark.png" alt="" width={px} height={px} className="h-full w-full object-cover" />
      </span>
      {BRAND_NAME}
    </Link>
  );
}
