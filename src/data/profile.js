const profile = {
  name: "Harshavardhan Anbuchezhian Gowri",
  initials: "HG",
  title: "Full-Stack Engineer",
  headline:
    "Full-Stack Engineer building reliable and scalable web applications.",
  subtext:
    "I specialize in React, Spring Boot, and secure backend systems, building production-ready applications with clean architecture and strong fundamentals.",
  about:
    "Harshavardhan is a Full-Stack Engineer with experience in designing and developing scalable web applications using React and Spring Boot. He focuses on clean API design, secure authentication systems, optimized database architecture, and maintainable code. With experience in Agile environments and strong fundamentals in object-oriented design and system thinking, he builds applications that are both user-focused and technically robust.",

  contact: {
    email: "agharsha.anbu@gmail.com",
    phone: "+1 438-535-5782",
    linkedin: "https://www.linkedin.com/in/harsha-anbu-gowri",
    github: "https://github.com/Harsha-anbu-g",
  },

  skills: [
    {
      category: "Frontend",
      items: ["React", "JavaScript", "TypeScript"],
    },
    {
      category: "Backend",
      items: [
        "Java",
        "Spring Boot",
        "Spring MVC",
        "RESTful APIs",
        "JWT Authentication",
      ],
    },
    {
      category: "Databases",
      items: ["MySQL", "PostgreSQL", "Hibernate", "JDBC"],
    },
    {
      category: "Cloud & DevOps",
      items: ["AWS (EC2, S3, IAM)", "Docker", "CI/CD", "Git/GitHub"],
    },
    {
      category: "Practices",
      items: ["Agile/Scrum", "JUnit Testing", "Secure Coding", "OOP Design"],
    },
  ],

  experience: [
    {
      role: "Data Assurance Analyst",
      company: "Ernst & Young (S. R. Batliboi & Associates LLP)",
      location: "Chennai, India",
      period: "Dec 2023 – Feb 2024",
      bullets: [
        "Performed SQL-based extraction and analysis on large financial datasets.",
        "Conducted sentiment analysis to support strategic audit insights.",
        "Worked with Chartered Accountants to deliver data-driven assessments.",
        "Used Alteryx, Helix, and Excel for reporting automation.",
      ],
    },
    {
      role: "Full-Stack Developer (Part-Time)",
      company: "Coimbatore Institute of Technology",
      location: "India",
      period: "Sep 2022 – Aug 2023",
      bullets: [
        "Built scalable features using Java, Spring Boot, React, and TypeScript.",
        "Designed RESTful APIs with role-based access control (RBAC).",
        "Optimized MySQL/PostgreSQL databases.",
        "Contributed in Agile sprint cycles.",
      ],
    },
    {
      role: "UI/UX Developer",
      company: "CODA Technology Solution",
      location: "Chennai, India",
      period: "May 2022 – Aug 2022",
      bullets: [
        "Developed prototypes using Figma.",
        "Improved project efficiency by 13%.",
        "Applied Power BI for visual analytics dashboards.",
      ],
    },
  ],

  projects: [
    {
      title: "Spring Boot Quiz Application",
      tech: ["Spring Boot", "PostgreSQL", "JPA", "REST APIs"],
      bullets: [
        "Developed RESTful backend for managing and evaluating quizzes.",
        "Implemented CRUD operations with layered architecture.",
        "Designed service logic for randomized quiz generation and score calculation.",
        "Tested APIs using Postman.",
      ],
      github: null,
      live: null,
    },
    {
      title: "Risk Game Project",
      tech: ["Java", "JUnit", "OOP"],
      bullets: [
        "Developed a turn-based strategy game using graph-based territory logic.",
        "Applied State, Command, and Observer design patterns.",
        "Implemented probabilistic battle simulations.",
        "Ensured reliability using JUnit testing.",
      ],
      github: null,
      live: null,
    },
  ],

  education: [
    {
      degree: "Master's in Applied Computer Science",
      school: "Concordia University",
      location: "Montreal, Canada",
      period: "2025 – 2026",
    },
    {
      degree: "Bachelor's in Information Technology",
      school: "Coimbatore Institute of Technology",
      location: "India",
      period: "2020 – 2024",
    },
  ],

  navLinks: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ],
};

export default profile;
