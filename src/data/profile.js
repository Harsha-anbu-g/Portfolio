const profile = {
  name: "Harshavardhan Anbuchezhian Gowri",
  initials: "HG",
  photo: "/Harsha_Photo.jpg",
  title: "Full-Stack Engineer",
  headline:
    "Full-Stack Engineer building reliable and scalable web applications.",
  subtext:
    "I specialize in React, Spring Boot, and secure backend systems, building production-ready applications with clean architecture and strong fundamentals.",
  about: [
    "Full-Stack Engineer and international student at Concordia University — building scalable web applications with Java, Spring Boot, and React.",
    "I don't just solve problems, I find them first. Focused on clean API design, secure authentication, and code that is maintainable and built to last.",
    "A deep worker by nature — slow is smooth, and smooth is fast. I contribute consistently across every stage of a project, not just where it's visible.",
    "I leverage AI tools like Claude Code and GitHub Copilot to automate repetitive work, speed up development, and stay focused on what actually matters.",
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
      title: "ToWin — Trust-Based Social Platform",
      tech: ["React 19", "Spring Boot", "PostgreSQL", "JWT", "WebSocket", "Docker"],
      bullets: [
        "Built ToWin — a social platform connecting elderly people with younger helpers through a progressive trust journey that gradually unlocks messaging, phone, and in-person meeting as users earn each other's confidence.",
        "Engineered a trust-level state machine where both parties confirm before advancing; reaching PHONE_CALL unlocks contact reveal, backed by a 0–100 trust score from ID/phone verification, completed services, reviews, and reports.",
        "Implemented real-time messaging over WebSocket, need posting with helper applications, daily streaks, and an emergency SOS flow with inactivity checks and Twilio SMS escalation.",
        "Backend in Java 21 / Spring Boot 3.2 with Spring Security (JWT), JPA, Flyway, AWS S3 uploads, and optional Redis/Kafka behind feature flags; deployed on Railway (backend + Postgres) and Vercel (React 19 SPA).",
      ],
      github: "https://github.com/Harsha-anbu-g/Towin",
      live: "https://towin.vercel.app",
      image: "/towin.png",
    },
    {
      title: "Full-Stack Quiz Application",
      tech: ["React", "Spring Boot", "PostgreSQL", "REST APIs"],
      bullets: [
        "Built end-to-end quiz platform with React + Vite frontend and Spring Boot 3 backend, deployed live on Vercel and Railway.",
        "Designed REST APIs for question CRUD and quiz management; used a DTO (QuestionWrapper) to hide correct answers from users during exams.",
        "Implemented category and difficulty filtering for quiz generation with randomized question selection from PostgreSQL via Spring Data JPA.",
        "Covered backend with JUnit 5 and Mockito tests; configured environment-variable-driven DB connection for seamless local and production deployments.",
      ],
      github: "https://github.com/Harsha-anbu-g/Frontend-and-Backend-Quiz-App",
      live: "https://quiz-studio.vercel.app/",
      image: "/quiz.png",
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
      image: "/Harsha - InsightFace.png",
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
      image: "/docker.png",
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
    { label: "Technologies", value: "15+" },
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
        ],
      },
    },
    fitness: {
      intro: "I prioritize physical and mental fitness.",
      activities: [
        "Meditation",
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
      images: ["/journal-tracker.jpg"],
    },
    languages: [
      { name: "English", level: "Fluent" },
      { name: "Tamil", level: "Fluent" },
      { name: "Telugu", level: "Moderate" },
      { name: "Hindi", level: "Moderate" },
      { name: "French", level: "Learning" },
    ],
    funDetail: "Black coffee. Always.",
  },

  certifications: [
    { name: "Google Project Management Professional", status: "completed" },
    { name: "Google Data Analytics", status: "completed" },
    { name: "Google Cybersecurity Professional", status: "completed" },
    { name: "AWS Certified Developer – Associate", status: "in-progress" },
  ],
};

export default profile;
