/* Concordia calendar pages — each course deep-links to its entry via anchor id */
const GRAD_CSSE_COURSES =
  "https://www.concordia.ca/academics/graduate/calendar/current/gina-cody-school-of-engineering-and-computer-science-courses/computer-science-and-software-engineering-master-s-and-phd-courses.html";
const GRAD_ENCS_COURSES =
  "https://www.concordia.ca/academics/graduate/calendar/current/gina-cody-school-of-engineering-and-computer-science-courses/engineering-and-computer-science-courses.html";

/* Towinly's public surfaces. Declared once so the work-history entry and the
   project entry can never drift apart. The Instagram and LinkedIn URLs match
   the links in the product's own site footer. */
const TOWINLY_SITE = "https://www.towinly.com/";
const TOWINLY_INSTAGRAM = "https://www.instagram.com/towinly.trust/";
const TOWINLY_LINKEDIN = "https://www.linkedin.com/company/towinly/";

const profile = {
  name: "Harshavardhan Anbuchezhian Gowri",
  initials: "HG",
  photo: "/harsha-photo.webp",
  /* Rendered as the hero role line. The page <title> is set separately in index.html. */
  title: "Full-Stack Engineer · Founder of Towinly",
  headline:
    "Full-Stack Engineer building reliable and scalable web applications.",
  subtext:
    "I specialize in React, Spring Boot, and secure backend systems, building production-ready applications with clean architecture, strong fundamentals, and an AI-accelerated workflow built on Claude Code.",
  about: [
    "Software developer with four years of work experience building web apps and cloud services end to end, from features to test automation and DevOps. I hold a Master's in Applied Computer Science from Concordia University, Montreal, and work mainly in Java, Spring Boot, and React.",
    "Creator of Towinly, a trust-based platform that connects elderly people with younger helpers nearby. I built it end to end: a Java 21 and Spring Boot backend with 129 REST endpoints and 1,006 tests, a React 19 web app, and a React Native iOS app in TestFlight. It runs WebSocket chat, push notifications, family accounts, and an emergency SOS flow with Twilio SMS on PostgreSQL, Redis, and Docker, and I deploy it on Railway and Vercel.",
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
      category: "Backend",
      items: [
        "Spring Boot",
        "Spring MVC",
        "Spring Data JPA",
        "Hibernate",
        "RESTful APIs",
        "GraphQL",
        "Microservices",
        "WebSocket",
        "Maven",
      ],
    },
    {
      category: "Databases & Messaging",
      items: [
        "PostgreSQL",
        "MySQL",
        "SQL Server",
        "Oracle",
        "Redis",
        "Apache Kafka",
        "Flyway",
        "JDBC",
      ],
    },
    {
      category: "Frontend",
      items: ["React", "React Native", "HTML", "CSS"],
    },
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
      category: "Cloud & DevOps",
      items: [
        "AWS (EC2, S3, IAM)",
        "GCP (Cloud Run)",
        "Azure",
        "Linux",
        "Docker",
        "Kubernetes",
        "Jenkins",
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
        "Design Patterns",
        "OOP Design",
        "Requirements Gathering",
        "Code Review",
        "Technical Documentation",
        "Production Troubleshooting",
        "Unit Testing (JUnit)",
        "Event-Driven Architecture",
      ],
    },
    {
      category: "Tools & Analytics",
      items: ["Figma", "Power BI", "Alteryx"],
    },
    {
      category: "Languages",
      items: [
        "Java",
        "Go",
        "Kotlin",
        "C#",
        "JavaScript",
        "TypeScript",
        "SQL",
        "Shell Scripting",
      ],
    },
  ],

  experience: [
    {
      role: "Founder and Full Stack Developer",
      company: "Towinly",
      website: TOWINLY_SITE,
      instagram: TOWINLY_INSTAGRAM,
      linkedin: TOWINLY_LINKEDIN,
      location: "Montreal, Canada",
      period: "Mar 2026 \u2013 Present",
      bullets: [
        "Built and deployed a full stack platform for older adults and nearby helpers, solo, measured by 129 OpenAPI-documented REST endpoints, 59 Flyway migrations, and 43 indexes over 879 commits, by owning every design call in Java 21, Spring Boot 3.5, and PostgreSQL.",
        "Kept personal details like phone numbers hidden until both people agree, measured by a 7-stage mutual-consent Trust Ladder where each stage unlocks only on confirmation from both sides, by designing the trust scoring system behind it.",
        "Closed real holes in my own authentication before launch, measured by account lockout bypasses, user enumeration leaks, and gaps between demo accounts and real users all found and fixed, by securing the API with Spring Security, JWT, Google OAuth 2.0, and role-based access control.",
        "Kept a solo build safe to refactor, measured by 1,006 JUnit 5 and Mockito tests gating every push alongside SonarQube and Snyk scans in GitHub Actions, by generating tests through AI sub-agents and reviewing each one.",
        "Cleared the dependency backlog without breaking the build, measured by 90 vulnerable dependency paths cut to 0 (6 critical, 46 high), by upgrading Spring Boot, the AWS SDK, and Twilio with no breaking changes.",
        "Put one backend behind two clients, measured by a React Native and Expo iOS app shipped to TestFlight next to a React 19 and TypeScript web client on Vercel, by reusing the Spring Boot API unchanged and deploying it on Railway.",
      ],
    },
    {
      role: "Backend Developer",
      company: "Vosyn",
      location: "Canada",
      period: "Apr 2026 – Sep 2026",
      bullets: [
        "Owned an ad decision microservice's caching from requirement to production, measured by ad decisions kept off a database round trip and a 60-second staleness ceiling, by designing dual-invalidation cache-aside Redis caches in Java and Spring Boot on GCP Cloud Run.",
        "Hardened a real-time watch-party feature before release, measured by 8 defects closed and a 126/126 suite restored from 6 never-failing tests, by verifying an untested Java branch at three privilege levels and closing an unguarded HTTP PUT method.",
        "Verified the merged release branch safe to ship, measured by a 383-test Java backend suite green, 30 more live checks at 0 failures, and 0 commits lost, by tracing two release-blocking startup failures to root cause, one a dropped import failing 68 tests, and fixing both.",
      ],
    },
    {
      role: "Data Assurance Analyst",
      company: "Ernst & Young (EY)",
      website: "https://www.ey.com/en_in",
      location: "Chennai, India",
      period: "Dec 2023 – Feb 2024",
      bullets: [
        "Flagged weekend postings, round amounts, and manual entries for audit review, measured by client datasets of 10 million rows or more at banks and financial-services firms, by writing and optimizing SQL Server queries over journal entries and general ledger rows.",
      ],
    },
    {
      role: "Full Stack Application Developer",
      company: "Ideal Corporate Services",
      location: "Chennai, India",
      period: "Jan 2021 – Aug 2023",
      bullets: [
        "Turned client requirements into REST APIs that outside teams called, measured by 5–10 production sites over MySQL, PostgreSQL, and Oracle with callers kept working through every change, by documenting each API contract in Java and Spring Boot.",
        "Stopped a live client site from stalling under load, measured by garbage-collection pauses of over 5 seconds cleared on a WebLogic application serving over 10,000 requests a day, by profiling the running JVM to find the objects being retained and fixing them in the middle layer.",
        "Released client changes on a controlled cadence, measured by 2–4 releases a month, each QA-tested, signed off, and rolled back when one broke, by running Jenkins test jobs before deploys to Linux, Azure, and Kubernetes and writing a runbook.",
      ],
    },
  ],

  projects: [
    {
      title: "Towinly: Trust-Based Social Platform",
      tech: ["React 19", "React Native", "Expo", "Spring Boot", "Apache Kafka", "PostgreSQL", "Redis", "JWT", "WebSocket", "Docker", "Claude Code", "MCP"],
      bullets: [
        "Built Towinly, a platform that connects elderly people with younger helpers nearby. Trust grows in seven stages, and each stage unlocks more contact: messages first, then phone and video calls, then meeting in person.",
        "Both people confirm every step up the seven-stage Trust Ladder. An elder sees a helper's Trust Score, built per friendship from ladder stages, reviews, and profile completeness, before saying yes.",
        "Built WebSocket chat, push notifications for messages and help activity, daily check-ins that family can see, server-side blocking in both directions, and an emergency SOS flow with inactivity checks and Twilio SMS.",
        "Architected a Java 21 and Spring Boot backend with Apache Kafka events for connections and trust progress: 129 OpenAPI-documented REST endpoints, 26 JPA entities, 59 Flyway migrations, and 43 indexes on PostgreSQL, with Redis caching, AWS S3 storage, and OAuth2 and JWT security.",
        "Designed an AI-accelerated workflow with Claude Code: specialized sub-agents, custom MCP servers, and tailored Skills and plugins that scaffold Spring Boot code, map JPA entities, and generate JUnit tests.",
        "Automated 1,006 JUnit 5 and Mockito backend tests and 1,396 Jest tests for the iOS app, with Snyk and SonarQube scanning every push to main and AES-GCM encryption on the sealed letter box.",
        "Hardened the API against my own mistakes: found and fixed account lockout bypasses, user enumeration leaks, and gaps between demo accounts and real users, behind Spring Security with JWT, Google OAuth 2.0, and role-based access control.",
        "Cut 90 vulnerable dependency paths to 0, including 6 critical and 46 high, by upgrading Spring Boot, the AWS SDK, and Twilio with no breaking changes.",
        "Shipped a React Native and Expo iOS app to TestFlight: 54 screens on the same Spring Boot backend, delivered as signed EAS builds under my Apple Developer account.",
      ],
      // Synced 2026-10-08 with the base resume (career-ops/base/baseresume.tex),
      // which measures the Towinly web repo and the ToWin-App repo.
      metrics: [
        { label: "Commits (Web + iOS)", value: "1,276" },
        { label: "REST Endpoints", value: "129" },
        { label: "Automated Tests", value: "2,402" },
        { label: "iOS Screens", value: "54" },
        { label: "Flyway Migrations", value: "59" },
        { label: "Database Indexes", value: "43" },
      ],
      metricsNote: "Built end to end: 879 commits on the web platform and 397 on the iOS app, April to September 2026.",
      github: "https://github.com/Harsha-anbu-g/Towin",
      appGithub: "https://github.com/Harsha-anbu-g/ToWin-App",
      live: TOWINLY_SITE,
      instagram: TOWINLY_INSTAGRAM,
      linkedin: TOWINLY_LINKEDIN,
      video: "https://www.linkedin.com/posts/harsha-anbu-gowri_fullstackdeveloper-springboot-java-ugcPost-7481541368083918848-WYBQ/",
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
      website: "https://www.concordia.ca",
      location: "Montreal, Canada",
      period: "Jan 2025 – Aug 2026",
      detail: "Completed · 45/45 credits",
    },
    {
      degree: "Bachelor's in Information Technology",
      school: "Coimbatore Institute of Technology",
      website: "https://www.cit.edu.in",
      location: "India",
      detail: "GPA: 8.51/10",
    },
    {
      degree: "Higher Secondary — Maths & Computer Science",
      school: "Maharishi International Residential School",
      website: "https://www.maharishiirschennai.com/",
      location: "Kanchipuram, India",
      detail: "CBSE · FIITJEE-integrated program",
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
    { label: "Technologies", value: "25+" },
    { label: "Education", value: "Master's" },
  ],

  currentStatus: "Master's in Applied Computer Science, Concordia University, Montreal — completed 2026",

  coursework: [
    {
      semester: "Winter 2025",
      courses: [
        {
          name: "Program & Problem Solving",
          code: "COMP 6481",
          link: `${GRAD_CSSE_COURSES}#18726`,
          description:
            "Overview of programming, problem solving, widely-used data structures and the design of fundamental and advanced algorithms using object oriented programming: arrays, lists and iterators; sorting and searching; software testing; complexity analysis; recursion; trees, maps and hash tables; graphs and graph-based algorithms.",
        },
        {
          name: "Advanced Programming Practices",
          code: "SOEN 6441",
          link: `${GRAD_CSSE_COURSES}#16286`,
          description:
            "Problems of writing and managing code. Managing code complexity and quality through a programming process. Self-documenting code and documentation generation. Software configuration management. Best practices for writing unit tests. Advanced practices such as multi-threading concurrency, code reuse, and fault tolerance. A project is required.",
        },
        {
          name: "Software Project Management",
          code: "SOEN 6841",
          link: `${GRAD_CSSE_COURSES}#16295`,
          description:
            "Fundamental concepts of management activities and how they support software engineering: software development processes; quality considerations; activity planning; risk management; monitoring and control; maintenance and evolution; professional ethics and legal issues. A project is required.",
        },
      ],
    },
    {
      semester: "Summer 2025",
      courses: [
        {
          name: "Algorithm Design Techniques",
          code: "COMP 6651",
          link: `${GRAD_CSSE_COURSES}#16036`,
          description:
            "Empirical and theoretical measures of algorithm efficiency; optimization and combinatorial techniques including greedy algorithms, dynamic programming, branch-and-bound and graph network algorithms; amortized complexity analysis; string matching; NP-complete problems and approximate solutions; probabilistic algorithms. A project is required.",
        },
      ],
    },
    {
      semester: "Fall 2025",
      courses: [
        {
          name: "Distributed System Design",
          code: "COMP 6231",
          link: `${GRAD_CSSE_COURSES}#16018`,
          description:
            "Principles of distributed computing: scalability, transparency, concurrency, consistency, fault tolerance. Client-server interaction technologies: sockets, RPC, remote method invocation, web services. Distributed server design: process replication, high availability through active replication, coordination and agreement, transactions and concurrency control.",
        },
        {
          name: "Computer Networks & Protocols",
          code: "COMP 6461",
          link: `${GRAD_CSSE_COURSES}#16030`,
          description:
            "Direct link networks: encoding, framing, error detection, flow control. Packet switching and forwarding: bridges, switches. Internetworking: Internet Protocol, routing, addressing, IPv6, multicasting, mobile IP. End-to-end protocols: UDP, TCP. Network security concepts. Application-level protocols.",
        },
        {
          name: "Software Comprehension & Maintenance",
          code: "SOEN 6431",
          link: `${GRAD_CSSE_COURSES}#16285`,
          description:
            "Technical and managerial views of software comprehension and maintenance: cognitive models, software visualization, CASE tools, reverse engineering, static and dynamic source code analysis, software configuration management, and current research topics in software maintenance and program comprehension. A project is required.",
        },
      ],
    },
    {
      semester: "Winter 2026",
      courses: [
        {
          name: "Immersive Technologies",
          code: "COMP 6371",
          link: `${GRAD_CSSE_COURSES}#16026`,
          description:
            "Fundamentals of immersive technologies: history, case studies of interactive experiences, and the main challenges of the current state of the art. Basic principles of 3D graphics for creating virtual assets and environments, and concepts and technologies for interaction. A project provides hands-on experience designing immersive interactive experiences.",
        },
        {
          name: "Applied Artificial Intelligence",
          code: "COMP 6721",
          link: `${GRAD_CSSE_COURSES}#16039`,
          description:
            "Heuristic and adversarial searches for concrete applications. Automated reasoning, advanced knowledge representation and dealing with uncertainty for Artificial Intelligence applications. Autoencoders, recurrent neural networks and sequence-to-sequence models. A project is required.",
        },
        {
          name: "Human Computer Interaction",
          code: "SOEN 6751",
          link: `${GRAD_CSSE_COURSES}#16293`,
          description:
            "Introduction to human computer interaction. User-centered design process. User modelling. Task analysis. User interface design knowledge (principles, guidelines and patterns). User interface prototyping. User interface evaluation. A project is required.",
        },
      ],
    },
    {
      semester: "Summer 2026",
      courses: [
        {
          name: "Comparative Study of Programming Languages",
          code: "COMP 6411",
          link: `${GRAD_CSSE_COURSES}#16028`,
          description:
            "Comparison of several high-level programming languages with respect to application areas, design, efficiency, and ease of use. Programming paradigms such as functional, logical, and scripting. Static and dynamic typing. Compilation and interpretation. Advanced implementation techniques. A project is required.",
        },
        {
          name: "Ethics & Professionalism",
          code: "ENCS 6201",
          link: `${GRAD_ENCS_COURSES}#42066`,
          description:
            "The wide spectrum of roles and responsibilities that guide the professional practice of engineers: professionalism, the engineering code and ethical practice with special reference to Quebec and Canada, plus legal aspects such as intellectual property, occupational health and safety, contracts, and liability.",
        },
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
    {
      name: "AWS Certified Developer – Associate",
      status: "completed",
      badge: "/aws-developer-associate.png",
    },
    { name: "Google Project Management Professional", status: "completed" },
    { name: "Google Data Analytics", status: "completed" },
    { name: "Google Cybersecurity Professional", status: "completed" },
  ],
};

export default profile;
