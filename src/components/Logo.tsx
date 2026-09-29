import Image from "next/image";
import Link from "next/link";
import { BRAND_NAME } from "@/lib/config";

// Current mark: the compass crop from the existing KLG logo file, beside a wordmark set the way
// the logo sets it (uppercase, tracked serif). Kept deliberately simple so the image can be
// swapped in one place when the logo is revised.
export function Logo({ dark = false, size = "md" }: { dark?: boolean; size?: "md" | "lg" }) {
  const px = size === "lg" ? 44 : 38;
  return (
    <Link
      href="/"
      aria-label={`${BRAND_NAME} home`}
      className={`inline-flex items-center gap-3 whitespace-nowrap font-display font-semibold uppercase ${
        size === "lg" ? "text-[15px] tracking-[0.22em]" : "text-[13px] tracking-[0.22em]"
      } ${dark ? "text-white" : "text-navy"}`}
    >
      <span
        className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ${
          dark ? "ring-white/30" : "ring-navy/20"
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
