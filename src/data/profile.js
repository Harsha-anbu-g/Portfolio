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
      title: "Full-Stack Quiz Application",
      tech: ["React", "Spring Boot", "PostgreSQL", "REST APIs"],
      bullets: [
        "Built end-to-end quiz platform with React frontend and Spring Boot backend.",
        "Implemented CRUD operations with layered architecture and JPA.",
        "Designed service logic for randomized quiz generation and score calculation.",
        "Features question bank, quiz builder, and live scoring dashboard.",
      ],
      github: "https://github.com/Harsha-anbu-g/Frontend-and-Backend-Quiz-App",
      live: "https://quiz-studio.vercel.app/",
      image: "/Home page.png",
    },
    {
      title: "Face Recognition Application",
      tech: ["Python", "OpenCV", "Deep Learning", "Flask"],
      bullets: [
        "Built a real-time face recognition system using deep learning and OpenCV.",
        "Implemented face detection, encoding, and matching pipelines for accurate identification.",
        "Developed a Flask-based web interface for live camera feed and recognition results.",
        "Optimized model inference for low-latency recognition in real-world conditions.",
      ],
      github: "https://github.com/Harsha-anbu-g/Face-Recognition-Application",
      live: null,
      image: "/Harsha_Photo.jpg",
    },
    {
      title: "Distributed Book Review Analytics with MPI & Docker",
      tech: ["Python", "MPI", "Docker", "Pandas"],
      bullets: [
        "Built a parallel computing system to analyze ~3M book reviews across up to 10 Docker containers using MPI.",
        "Implemented master–worker architecture for distributing workload and merging partial results.",
        "Achieved near-linear speedup on row-level queries (148s → 79s with 10 processes).",
        "Designed four analytical queries using a map-reduce style approach with mpi4py.",
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
    { label: "Resume", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Coursework", href: "#coursework" },
    { label: "Beyond Code", href: "#beyond-code" },
    { label: "Contact", href: "#contact" },
  ],

  stats: [
    { label: "Projects Built", value: "3+" },
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
