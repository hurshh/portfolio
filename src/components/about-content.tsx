import Link from "next/link";

export function AboutContent({
  showCapabilities = true,
  showLabel = true,
}: {
  showCapabilities?: boolean;
  showLabel?: boolean;
}) {
  return (
    <section className={`page-shell shell about-page${showCapabilities ? "" : " about-page-compact"}`}>
      <header className="about-hero">
        {showLabel && <p className="eyebrow">About / A little context</p>}
        <h1>I care about making<br /><em>complex things feel clear.</em></h1>
      </header>
      <div className="about-grid">
        <div className="portrait-placeholder"><span>H</span><i>Designer<br />Developer<br />Curious human</i></div>
        <div className="about-copy">
          <p className="lead">I&apos;m Harsh, a designer and developer drawn to thoughtful products, expressive interfaces, and systems that hold up over time.</p>
          <p>My work lives between design and engineering. That means I can shape an idea, find its visual language, build the real interaction, and stay close to all the small decisions that give it character.</p>
          <p>I&apos;m especially interested in developer tools, knowledge products, creative technology, and collaborations where curiosity is treated as part of the process.</p>
          <Link className="text-link" href="/contact">Let&apos;s work together ↗</Link>
        </div>
      </div>
      {showCapabilities && (
        <div className="capabilities">
          <p className="eyebrow">Capabilities</p>
          <div><span>01</span><h3>Product thinking</h3><p>Turning uncertain ideas into a clear direction and a focused first release.</p></div>
          <div><span>02</span><h3>Interface design</h3><p>Editorial visual systems, flows, prototypes, and responsive product experiences.</p></div>
          <div><span>03</span><h3>Frontend craft</h3><p>Accessible, performant interfaces built with modern web technology.</p></div>
        </div>
      )}
    </section>
  );
}
