import { ButtonLink } from "@/components/Buttons";
import { FREE_REPORT_URL } from "@/lib/config";

// Below the `sm` breakpoint, SiteHeader hides its CTA behind the hamburger menu (there isn't
// room for logo + button + menu icon on a phone-width screen), so a visitor scrolling on a phone
// can go a long way without seeing any call to action at all. This bar is the fix: pinned to the
// bottom of the viewport, thumb-reachable, visible regardless of scroll position — the mobile
// equivalent of the header CTA it replaces at this width. Hidden at `sm` and up, where the header
// button already does this job.
export function MobileStickyCta() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-navy/15 bg-cream/95 px-4 pt-3 shadow-[0_-4px_16px_rgba(15,32,56,0.08)] backdrop-blur sm:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <ButtonLink href={FREE_REPORT_URL} className="w-full justify-center">
        See your AI visibility score
      </ButtonLink>
    </div>
  );
}
