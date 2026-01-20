export const personalData = {
  name: "Jaskaran Joshi",
  roles: ["MCA Student", "Full-Stack Web Developer", "Cybersecurity Enthusiast"],
  contact: {
    email: "jashkaranjoshi@gmail.com",
    github: "https://github.com/Jashkaran-joshi",
    linkedin: "https://www.linkedin.com/in/jaskaran-joshi"
  },
  about: {
    title: "About",
    subtitle: "I’m an MCA student and Full-Stack Developer with a growing focus on cybersecurity. I don’t just build applications — I test them to understand where they can break and how to make them safer.",
    details: [
      { prompt: "$ whoami", text: "Jaskaran Joshi | Builder & Breaker" },
      { prompt: "$ mission", text: "Building secure, scalable apps & finding vulnerabilities." },
      { prompt: "$ focus", text: "React, Node.js, Cloud Security & Ethical Hacking." },
      { prompt: "$ status", text: "Analyzing code, testing defenses & learning daily." }
    ]
  },
  education: [
    {
      title: 'MCA – JECRC University',
      meta: 'July 2024 – May 2026',
      body: 'Master of Computer Applications (MCA) – Computer Science'
    },
    {
      title: 'BCA – Government Engineering College Bikaner',
      meta: 'July 2021 – April 2024',
      body: 'Bachelor of Computer Applications (BCA) – Computer Science'
    },
    {
      title: 'Senior Secondary – RSV Hr. Sec. School, Bikaner',
      meta: 'July 2020 – July 2021',
      body: 'Senior Secondary (Class XII) – Commerce (CBSE)'
    },
    {
      title: 'Secondary School – RSV Hr. Sec. School, Bikaner',
      meta: 'July 2018 – May 2019',
      body: 'Secondary School (Class X) – CBSE'
    }
  ],
  experience: [
    {
      title: "CodSoft – C++ Programming Intern",
      meta: "Aug 2024 – Sep 2024 • Remote",
      body: "During my internship at CodSoft, I worked with C++ and strengthened my understanding of object-oriented programming by applying it to real problems. I focused on writing cleaner, more structured code and enjoyed breaking down logic-heavy problems into simple solutions."
    }
  ],
  skills: [
    { title: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind'] },
    { title: 'Backend', items: ['Node.js', 'Express.js', 'Django', 'Flask'] },
    { title: 'Database', items: ['MongoDB', 'PostgreSQL'] },
    { title: 'Cybersecurity', items: ['Ethical Hacking', 'Penetration Testing', 'Network Security', 'Vulnerability Assessment'] },
    { title: 'Tools', items: ['Git', 'GitHub', 'Linux', 'VS Code', 'Burp Suite'] }
  ],
  skillProgress: [
    { label: "React + UI Engineering", value: 85 },
    { label: "Node/Express APIs", value: 80 },
    { label: "Secure Input Handling", value: 82 },
    { label: "Networking Fundamentals", value: 78 },
    { label: "Vulnerability Assessment", value: 72 },
    { label: "Pen-Testing Mindset", value: 70 },
    { label: "Git + Workflow", value: 86 },
    { label: "Linux", value: 76 }
  ],
  certifications: [
    {
      name: 'Certified Ethical Hacker (CEH) – Master',
      year: 'Issued Dec 2025 · Expires Jan 2027',
      issuer: 'EC-Council',
      skills: ['Credential ID: ECC4870126593', 'Advanced Ethical Hacking', 'Penetration Testing']
    },
    {
      name: 'Certified Ethical Hacker (CEH) – Practical',
      year: 'Issued Dec 2025 · Expires Jan 2027',
      issuer: 'EC-Council',
      skills: ['Credential ID: ECC7895124630', 'Vulnerability Assessment', 'Real-world Attack Simulations']
    },
    {
      name: 'Certified Ethical Hacker (CEH)',
      year: 'Issued May 2025 · Expires Jun 2026',
      issuer: 'EC-Council',
      skills: ['Credential ID: ECC1430598672', 'Threat Prevention', 'Core Hacking Knowledge']
    },
    {
      name: 'Certified Network Defender (CND)',
      year: 'Issued Dec 2024',
      issuer: 'EC-Council',
      skills: ['Credential ID: ECC7309568214', 'Network Security', 'Threat Detection']
    },
    {
      name: 'Crash Course on Python (Coursera)',
      year: 'Issued July 2025',
      issuer: 'Google',
      skills: ['Credential ID: VOCIVSWL4TMM', 'Programming Fundamentals', 'Problem Solving']
    },
    {
      name: 'Web Development with Python (Flask)',
      year: 'Issued April 2025',
      issuer: 'Coursera',
      skills: ['Credential ID: DOTX24NNZ7TY', 'Flask', 'Web Applications']
    },
    {
      name: 'Technology Job Simulation – Forage',
      year: 'Issued May 2025',
      issuer: 'Deloitte',
      skills: ['Credential ID: ixr7fdfwj55yLdTwf', 'Development Workflows', 'Coding']
    },
    {
      name: 'Solutions Architecture Job Simulation – Forage',
      year: 'Issued Nov 2024',
      issuer: 'Amazon Web Services',
      skills: ['Credential ID: 2DcZkSLXXdE6LCz5B', 'Cloud Architectures', 'Scalability']
    },
    {
      name: 'Cybersecurity Job Simulation – Forage',
      year: 'Issued Oct 2024',
      issuer: 'JPMorgan Chase & Co.',
      skills: ['Credential ID: k84Tn474BzSPrP6LS', 'Fraud Analysis', 'App Security']
    },
    {
      name: 'Cybersecurity Job Simulation – Forage',
      year: 'Issued Oct 2024',
      issuer: 'Mastercard',
      skills: ['Credential ID: 4jfFZT5h4Aqdbc4nu', 'Fraud Detection', 'Security Best Practices']
    },
    {
      name: 'Career Essentials in Cybersecurity',
      year: 'Issued Oct 2024',
      issuer: 'Microsoft',
      skills: ['Credential ID: bd494211...', 'Info Security', 'Threat Management']
    },
    {
      name: 'Software Engineering Job Simulation – Forage',
      year: 'Issued Aug 2024',
      issuer: 'Accenture',
      skills: ['Credential ID: DnX4MXkCgJ7fFHPsC', 'Software Development', 'Tech Consulting']
    }
  ],
  projects: [
    {
      id: "adoptnest",
      name: "AdoptNest – Secure Pet Adoption Platform",
      description: "Built to simplify pet adoption using a clean, user-friendly full-stack platform. Pet adoption still relies a lot on unorganized systems, and I wanted to build something that could make the process simpler and more accessible.",
      tech: ["React", "Node.js", "Express", "Tailwind"],
      live: "https://adoptnest.vercel.app/",
      github: "https://github.com/Jashkaran-joshi/AdoptNest"
    },
    {
      id: "snipsnap",
      name: "SnipSnap – Code Snippet Manager",
      description: "Created to solve my own problem of managing and reusing code snippets without relying on scattered files or old projects. I wanted a clean place to save, organize, and quickly reuse code without the mess.",
      tech: ["React", "Node.js", "Express", "Tailwind"],
      live: "#",
      github: "https://github.com/Jashkaran-joshi/SnipSnap"
    },
    {
      id: "titanax-labs",
      name: "TitanAx Labs – AI-Powered Code Generator",
      description: "An advanced AI development tool that generates production-ready frontend and backend code. Built with React.js and Express, designed to accelerate software development workflows.",
      tech: ["React", "Node.js", "Express", "AI Integration"],
      live: "https://titanax-labs.vercel.app",
      github: "https://github.com/Jashkaran-joshi/TitanAx-Labs"
    },
    {
      id: "preskool",
      name: "PreSkool – Learning Management System (LMS)",
      description: "Web-based LMS providing role-based access, progress tracking, interactive tools, and scalable course management for modern education environments institutions teachers students.",
      tech: ["React", "Node.js", "Express", "PostgreSQL"],
      live: "#",
      github: "https://github.com/Jashkaran-joshi/Learning-Management-System-LMS"
    },
    {
      id: "voyageur",
      name: "Voyageur – Tourism Information System (TIS)",
      description: "Travel application for exploring destinations, viewing deals, reading news, submitting feedback, and managing content through admin dashboards with analytics controls.",
      tech: ["Django", "PostgreSQL", "Bootstrap", "Python"],
      live: "#",
      github: "https://github.com/Jashkaran-joshi/Tourism-Information-System-TIS"
    },
    {
      id: "hangmaster",
      name: "HangMaster – Python Word Guessing Game",
      description: "Python Tkinter word-guessing game featuring dark mode, animations, score tracking, customizable word lists, and engaging gameplay for casual learners entertainment.",
      tech: ["Python", "Tkinter"],
      live: "#",
      github: "https://github.com/Jashkaran-joshi/Hangman-Game"
    }
  ]
};
