import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer shell">
      <div>
        <p className="eyebrow">Have a thoughtful project?</p>
        <Link className="footer-cta" href="/contact">Let&apos;s make it real ↗</Link>
      </div>
    </footer>
  );
}
