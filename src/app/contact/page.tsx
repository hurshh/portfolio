import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact", description: "Get in touch about a project or collaboration." };

export default function ContactPage() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@example.com";
  return (
    <section className="contact-page shell">
      <p className="eyebrow">Contact / Start a conversation</p>
      <h1>Let&apos;s Connect</h1>
      <ul className="contact-list">
        <li><a href={`mailto:${email}`}>Email ↗</a></li>
        <li><a href="https://github.com/hurshh" rel="noreferrer" target="_blank">GitHub ↗</a></li>
        <li><a href="https://www.linkedin.com/in/hurshrao" rel="noreferrer" target="_blank">LinkedIn ↗</a></li>
        <li><a href="https://dev.to/hurshrao" rel="noreferrer" target="_blank">DEV Community ↗</a></li>
      </ul>
    </section>
  );
}
