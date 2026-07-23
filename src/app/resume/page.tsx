import type { Metadata } from "next";
import { education, experiences } from "@/lib/resume";

export const metadata: Metadata = {
  title: "Resume",
  description: "A summary of Harsh Rao's experience, interests, and ongoing work.",
};

export default function ResumePage() {
  return (
    <section className="resume-page page-shell shell">
      <header className="resume-hero">
        <p className="eyebrow">Resume / Experience</p>
        <h1>A little about me.</h1>
        <div className="resume-summary">
          <p className="lead">Hi, I&apos;m Harsh Rao.</p>
          <p>
            I&apos;m a software developer and lifelong learner passionate about distributed
            systems, AI, and LLMs. I enjoy understanding how complex systems work under
            the hood and learning by building, experimenting, and contributing to
            open-source projects.
          </p>
          <p>
            Outside of development, you&apos;ll often find me solving problems on Codeforces
            and LeetCode or competing in Kaggle competitions.
          </p>
          <a
            className="resume-download"
            download="Harsh_Rao_Resume.pdf"
            href="/assets/Harsh_Rao_Resume.pdf"
          >
            Download resume <span aria-hidden="true">↓</span>
          </a>
        </div>
      </header>

      <section className="experience-section" aria-labelledby="experience-heading">
        <div className="experience-title">
          <p className="eyebrow">01 / Timeline</p>
          <h2 id="experience-heading">Work experience</h2>
        </div>

        <ol className="experience-timeline">
          {experiences.map((experience, index) => (
            <li className="experience-item" key={`${experience.role}-${experience.period}`}>
              <div className="timeline-marker" aria-hidden="true">
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="experience-period">{experience.period}</div>
              <div className="experience-copy">
                <p className="experience-organization">{experience.role}</p>
                <h3>{experience.organization}</h3>
                <p>{experience.summary}</p>
                <div className="tag-row">
                  {experience.focus.map((item) => <span key={item}>{item}</span>)}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="experience-section education-section" aria-labelledby="education-heading">
        <div className="experience-title">
          <p className="eyebrow">02 / Education</p>
          <h2 id="education-heading">Education</h2>
        </div>

        <ol className="experience-timeline">
          {education.map((item, index) => (
            <li className="experience-item" key={`${item.institution}-${item.qualification}`}>
              <div className="timeline-marker" aria-hidden="true">
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="experience-period">{item.period}</div>
              <div className="experience-copy">
                <p className="experience-organization">{item.institution}</p>
                <h3>{item.qualification}</h3>
                <p className="education-field">{item.field}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </section>
  );
}
