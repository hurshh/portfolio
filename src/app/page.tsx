import Image from "next/image";

export default function HomePage() {
  return (
    <section className="home-intro shell">
      <div className="home-intro-copy">
        <p className="home-greeting">Hi! I&apos;m</p>
        <h1>Harsh Rao</h1>
        <div className="home-description">
          <p>I&apos;m a software engineer and learner passionate about AI &amp; distributed systems</p>
          <p>learning through Hackathons and Opensource contributions.</p>
        </div>
      </div>

      <div className="home-photo">
        <Image
          alt="Harsh Rao"
          className="home-photo-image"
          fill
          priority
          sizes="(max-width: 900px) 90vw, 34vw"
          src="/assets/avatar.jpg"
        />
      </div>
    </section>
  );
}
