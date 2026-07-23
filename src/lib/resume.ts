export type Experience = {
  period: string;
  role: string;
  organization: string;
  summary: string;
  focus: string[];
};

export type Education = {
  period: string;
  qualification: string;
  institution: string;
  field: string;
};

export const experiences: Experience[] = [
  {
    period: "Sep 2025 – Present",
    role: "Research Assistant",
    organization: "Santa Clara University",
    summary:
      "Built scalable ETL pipelines, data preprocessing workflows, and RAG-based systems for data analytics.",
    focus: ["ETL pipelines", "RAG", "Data analytics"],
  },
  {
    period: "Jan 2024 – Jul 2024",
    role: "Software Developer Intern",
    organization: "Creatosaurus",
    summary:
      "Developed AI-powered AR applications using computer vision.",
    focus: ["Artificial intelligence", "Augmented reality", "Computer vision"],
  },
  {
    period: "Jul 2023 – Jan 2024",
    role: "Student Researcher",
    organization: "Indian Institute of Information Technology",
    summary:
      "Optimized Graph Neural Network training and experimented on molecular diffusion models.",
    focus: ["Graph neural networks", "Model optimization", "Diffusion models"],
  },
  {
    period: "Apr 2023 – Jul 2023",
    role: "Software Engineering Intern",
    organization: "Jio",
    summary:
      "Built backend infrastructure for CI/CD observability and monitoring.",
    focus: ["Backend infrastructure", "CI/CD", "Observability"],
  },
];

export const education: Education[] = [
  {
    period: "Master's",
    qualification: "Master's degree",
    institution: "Santa Clara University",
    field: "Computer Science and Engineering",
  },
  {
    period: "Bachelor's",
    qualification: "Bachelor of Technology (B.Tech)",
    institution: "Indian Institute of Information Technology Surat",
    field: "Computer Science and Engineering",
  },
];
