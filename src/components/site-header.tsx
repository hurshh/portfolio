import Link from "next/link";

const links = [
  ["Home", "/"],
  ["Projects", "/projects"],
  ["Blog", "/blog"],
  ["Resume", "/resume"],
  ["Contact", "/contact"],
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <nav aria-label="Main navigation">
        {links.map(([label, href]) => (
          <Link href={href} key={href}>{label}</Link>
        ))}
      </nav>
    </header>
  );
}
