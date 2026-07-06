const profile = {
  name: "Harshavardhan Anbuchezhian Gowri",
  initials: "HG",
  photo: "/harsha-photo.webp",
  title: "Full-Stack Engineer",
  headline:
    "Full-Stack Engineer building reliable and scalable web applications.",
  subtext:
    "I specialize in React, Spring Boot, and secure backend systems, building production-ready applications with clean architecture, strong fundamentals, and an AI-accelerated workflow built on Claude Code.",
  about: [
    "Full-Stack Engineer and international student at Concordia University — building scalable web applications with Java, Spring Boot, and React.",
    "I don't just solve problems, I find them first. Focused on clean API design, secure authentication, and code that is maintainable and built to last.",
    "A deep worker by nature — slow is smooth, and smooth is fast. I contribute consistently across every stage of a project, not just where it's visible.",
    "I design AI-accelerated workflows with Claude Code — specialized sub-agents, custom MCP servers, and tailored Skills and plugins — alongside GitHub Copilot, automating scaffolding, testing, and code review to stay focused on what actually matters.",
  ],

  contact: {
    email: "agharsha.anbu@gmail.com",
    phone: "+1 438-535-5782",
    linkedin: "https://www.linkedin.com/in/harsha-anbu-gowri",
    github: "https://github.com/Harsha-anbu-g",
    instagram: "https://www.instagram.com/harsha._.ag",
  },

  skills: [
    {
      category: "AI & Tooling",
      items: [
        "Claude Code",
        "Claude Sub-Agents",
        "Model Context Protocol (MCP)",
        "Custom MCP Servers",
        "AI Skills & Plugins",
        "GitHub Copilot",
        "Prompt Engineering",
        "AI-Accelerated Development",
      ],
    },
    {
      category: "Languages",
      items: ["Java", "JavaScript", "TypeScript", "Python", "C++"],
    },
    {
      category: "Backend",
      items: [
        "Spring Boot",
        "Spring MVC",
        "Spring Data JPA",
        "Hibernate",
        "RESTful APIs",
        "WebSocket",
        "Maven",
      ],
    },
    {
      category: "Frontend",
      items: ["React", "HTML", "CSS"],
    },
    {
      category: "Databases & Messaging",
      items: ["PostgreSQL", "MySQL", "Redis", "Apache Kafka", "Flyway", "JDBC"],
    },
    {
      category: "Cloud & DevOps",
      items: [
        "AWS (EC2, S3, IAM)",
        "Linux",
        "Docker",
        "Kubernetes",
        "CI/CD Pipelines",
        "GitHub Actions",
        "Git/GitHub",
      ],
    },
    {
      category: "Security",
      items: [
        "OWASP Top 10",
        "OAuth2",
        "OpenID Connect (OIDC)",
        "Spring Security",
        "JWT",
        "RBAC",
        "SonarQube",
        "Snyk",
        "Secure Coding",
      ],
    },
    {
      category: "Practices",
      items: [
        "Agile/Scrum",
        "SDLC",
        "OOP Design",
        "Unit Testing (JUnit)",
        "Event-Driven Architecture",
      ],
    },
    {
      category: "Tools & Analytics",
      items: ["Figma", "Power BI", "Alteryx"],
    },
  ],

  experience: [
    {
      role: "Backend Developer (Internship)",
      company: "Vosyn AI",
      location: "Canada (Remote)",
      period: "May 2026 – Aug 2026",
      bullets: [
        "Building backend services for AI-driven products in a fast-moving startup environment.",
        "Developing and maintaining RESTful APIs and data workflows that support the platform's AI features.",
        "Collaborating with cross-functional teams in Agile sprints to ship scalable, production-ready features.",
      ],
    },
    {
      role: "Data Analyst (Internship)",
      company: "Ernst & Young (S. R. Batliboi & Associates LLP)",
      location: "Chennai, India",
      period: "Dec 2023 – May 2024",
      bullets: [
        "Improved financial assessment accuracy by extracting and analyzing large datasets using SQL, directly supporting audit decisions made by senior Chartered Accountants at a Big Four firm.",
        "Cut manual reporting effort by streamlining audit workflows with Alteryx, Helix, and Excel, delivering audit data reports for 2–3 client companies per day across concurrent engagements.",
        "Conducted sentiment analysis to support strategic audit insights.",
      ],
    },
    {
      role: "Full-Stack Developer",
      company: "Coimbatore Institute of Technology",
      location: "India",
      period: "Sep 2022 – Aug 2023",
      bullets: [
        "Improved platform reliability by delivering scalable full-stack features using Java, Spring Boot, React, and TypeScript, directly enhancing usability for faculty and students across the institution.",
        "Reduced security vulnerabilities by implementing RBAC authentication across MySQL and PostgreSQL, protecting sensitive institutional data from unauthorized access.",
        "Designed RESTful APIs and optimized MySQL/PostgreSQL databases for scalable institutional workloads.",
        "Accelerated sprint delivery by gathering requirements directly from faculty stakeholders and translating business needs into working features within each Agile/Scrum cycle.",
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
      title: "ToWin — Trust-Based Social Platform",
      tech: ["React 19", "Spring Boot", "Apache Kafka", "PostgreSQL", "Redis", "JWT", "WebSocket", "Docker", "Claude Code", "MCP"],
      bullets: [
        "Built ToWin — a social platform connecting elderly people with younger helpers through a progressive trust journey that gradually unlocks messaging, phone, and in-person meeting as users earn each other's confidence.",
        "Engineered a trust-level state machine where both parties confirm before advancing; reaching PHONE_CALL unlocks contact reveal, backed by a 0–100 trust score from ID/phone verification, completed services, reviews, and reports.",
        "Implemented real-time messaging over WebSocket, need posting with helper applications, daily streaks, and an emergency SOS flow with inactivity checks and Twilio SMS escalation.",
        "Architected an event-driven backend in Java 21 and Spring Boot with Apache Kafka producers and consumers for connection and trust-progression events, owning every architectural decision end-to-end.",
        "Designed a custom AI-accelerated workflow using Claude Code with specialized sub-agents, custom MCP servers, and tailored Skills and plugins for Spring Boot scaffolding, JPA mapping, and JUnit generation — shipping features 4x faster.",
        "Automated JUnit and Mockito test generation, AI-driven code review, and refactoring through sub-agents, then hardened the pipeline with SonarQube static analysis and Snyk dependency scanning against OWASP Top 10 risks.",
        "Built supporting infra with Redis caching for Haversine geospatial discovery, AWS S3 for media and ID documents, PostgreSQL + Flyway migrations, Spring Security with OAuth2/OpenID Connect and JWT, RBAC, and Docker Compose; deployed on Railway and Vercel.",
      ],
      github: "https://github.com/Harsha-anbu-g/Towin",
      live: "https://towin.vercel.app",
      image: "/towin.webp",
    },
    {
      title: "Quiz Studio — Role-Based Quiz Platform",
      tech: ["React", "Spring Boot", "Spring Security", "JWT", "PostgreSQL", "REST APIs"],
      bullets: [
        "Built Quiz Studio — a production-ready quiz platform with role-based access for Teachers and Students, using a React + Vite frontend and Spring Boot 3 backend, deployed live on Vercel and Railway.",
        "Secured all API endpoints with Spring Security and JWT, implementing a custom JwtAuthFilter, role-based access control (RBAC), and a guest login flow that issues scoped tokens without credentials.",
        "Designed a normalized PostgreSQL schema with a Many-to-Many quiz–question relationship and REST APIs for question CRUD and quiz management; a QuestionWrapper DTO strips correct answers from responses during exams.",
        "Implemented category and difficulty filtering for quiz generation with randomized question selection from PostgreSQL via Spring Data JPA.",
        "Covered backend with JUnit 5 and Mockito tests, enforced quality with a CI/CD pipeline via GitHub Actions, and configured environment-variable-driven DB connection for seamless local and production deployments.",
      ],
      github: "https://github.com/Harsha-anbu-g/Frontend-and-Backend-Quiz-App",
      live: "https://quiz-studio.vercel.app/",
      image: "/quiz.webp",
    },
    {
      title: "Face Recognition Application",
      tech: ["Python", "OpenCV", "Deep Learning", "Flask"],
      bullets: [
        "Built FaceVault — a real-time face recognition web app with dual AI model support: a custom CNN and InsightFace (ArcFace embeddings), switchable at runtime without restarting.",
        "Delivered live MJPEG camera feed with bounding boxes, confidence scores, and multi-frame consensus to reduce false positives.",
        "Implemented in-app face enrollment; InsightFace embedding index rebuilds automatically in the background with a live training status banner.",
        "Added SQLite-backed activity logging, CSV export, blur detection, and alignment guidance for production-quality reliability.",
      ],
      github: "https://github.com/Harsha-anbu-g/Face-Recognition-Application",
      live: null,
      image: "/facevault.webp",
    },
    {
      title: "Distributed Book Review Analytics with MPI & Docker",
      tech: ["Python", "MPI", "Docker", "Pandas"],
      bullets: [
        "Built a parallel analytics system to process ~3M book reviews across up to 10 Docker containers communicating over SSH via mpi4py.",
        "Implemented master–worker architecture: master splits row ranges and merges partial results; workers each read only their assigned CSV slice and compute local aggregates.",
        "Designed four map-reduce queries — count filtering, user analytics, and top-K ranking — with near-linear speedup on row-level queries (Q4: 148s → 79s with 10 processes).",
        "Orchestrated the cluster with Docker Compose using a shared volume; identified I/O bottlenecks as the limiting factor for vectorized Pandas queries.",
      ],
      github: "https://github.com/Harsha-anbu-g/docker-mpi",
      live: null,
      image: "/docker.webp",
    },
  ],

  education: [
    {
      degree: "Master's in Applied Computer Science",
      school: "Concordia University",
      location: "Montreal, Canada",
      period: "2025 – 2026",
      detail: "Completed 40/45 credits",
    },
    {
      degree: "Bachelor's in Information Technology",
      school: "Coimbatore Institute of Technology",
      location: "India",
      period: "2020 – 2024",
      detail: "GPA: 8.51/10",
    },
  ],

  navLinks: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Coursework", href: "#coursework" },
    { label: "Beyond Code", href: "#beyond-code" },
    { label: "Contact", href: "#contact" },
  ],

  stats: [
    { label: "Projects Built", value: "4+" },
    { label: "Years Experience", value: "2+" },
    { label: "Technologies", value: "25+" },
    { label: "Education", value: "Master's" },
  ],

  currentStatus: "Currently pursuing Master's in Applied Computer Science at Concordia University, Montreal",

  coursework: [
    {
      semester: "Winter 2025",
      courses: [
        { name: "Program & Problem Solving", code: "COMP 6481" },
        { name: "Advanced Programming Practices", code: "SOEN 6441" },
        { name: "Software Project Management", code: "SOEN 6841" },
      ],
    },
    {
      semester: "Summer 2025",
      courses: [
        { name: "Algorithm Design Techniques", code: "COMP 6651" },
      ],
    },
    {
      semester: "Fall 2025",
      courses: [
        { name: "Distributed System Design", code: "COMP 6231" },
        { name: "Computer Networks & Protocols", code: "COMP 6461" },
        { name: "Software Comprehension & Maintenance", code: "SOEN 6431" },
      ],
    },
    {
      semester: "Winter 2026",
      courses: [
        { name: "Immersive Technology", code: "COMP 475" },
        { name: "Applied Artificial Intelligence", code: "COMP 6721" },
        { name: "Human Computer Interaction", code: "SOEN 6751" },
      ],
    },
    {
      semester: "Summer 2026",
      current: true,
      courses: [
        { name: "Comparative Study of Programming Languages", code: "COMP 6411" },
        { name: "Ethics & Professionalism", code: "ENCS 6201" },
      ],
    },
  ],

  beyondCode: {
    reading: {
      intro:
        "I'm deeply interested in personal growth, focus, and systems thinking.",
      books: [
        { title: "Atomic Habits", author: "James Clear" },
        { title: "Deep Work", author: "Cal Newport" },
        { title: "The Psychology of Money", author: "Morgan Housel" },
        {
          title: "How to Build a Billion Dollar App",
          author: "George Berkowski",
        },
        {
          title: "Bhagavad Gita As It Is",
          author: "A.C. Bhaktivedanta Swami Prabhupada",
        },
        { title: "Siddhartha", author: "Hermann Hesse" },
        { title: "Thirukkural", author: "Thiruvalluvar" },
      ],
      note: "These books influence how I approach discipline, consistency, long-term thinking, and building scalable systems.",
    },
    travel: {
      intro: "I enjoy travelling and exploring new cultures and environments.",
      places: {
        Canada: ["Vancouver", "Ottawa", "Toronto", "Quebec", "Montreal"],
        India: [
          "Kerala",
          "Delhi",
          "Manali",
          "Andaman and Nicobar Islands",
          "Tamil Nadu",
          "Karnataka",
        ],
      },
    },
    fitness: {
      intro: "I prioritize physical and mental fitness.",
      activities: [
        "Meditation",
        "Kirtan",
        "Yoga",
        "Stretching",
        "Jogging",
        "Strength training (gym)",
      ],
      note: "I believe physical discipline directly supports mental clarity and professional performance.",
    },
    sports: {
      items: ["Badminton", "Chess"],
      chessLink: "https://www.chess.com/member/Harsha_ag",
    },
    journaling: {
      note: "I regularly journal and track habits to stay consistent and self-aware.",
      images: ["/journal-tracker.webp"],
    },
    languages: [
      { name: "English", level: "Fluent" },
      { name: "Tamil", level: "Fluent" },
      { name: "Telugu", level: "Moderate" },
      { name: "Hindi", level: "Moderate" },
      { name: "French", level: "Learning" },
    ],
    funDetail: "Black coffee. Always.",
    contentCreation:
      "I also enjoy social media content creation — sharing travel, fitness, and student life along the way.",
  },

  certifications: [
    { name: "Google Project Management Professional", status: "completed" },
    { name: "Google Data Analytics", status: "completed" },
    { name: "Google Cybersecurity Professional", status: "completed" },
    { name: "AWS Certified Developer – Associate", status: "in-progress" },
  ],
};

export default profile;
