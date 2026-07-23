import Link from "next/link";

export default function NotFound() {
  return <section className="not-found shell"><p className="eyebrow">404 / Off the map</p><h1>This page has<br /><em>left the studio.</em></h1><Link className="button dark" href="/">Return home</Link></section>;
}
