import type { Certification } from "@/types/certificate"
import type { FeaturedProject } from "@/types/project"

export const personal = {
  name: "Roshan Kumar Singh",
  mission:
    "My mission is to democratize technology access — building software people can actually use, without apps they can't install, forms they can't read, or interfaces that leave them behind.",
  email: "roshankumarsingh021@gmail.com",
  linkedin: "https://linkedin.com/in/roshan-kumar-singh-1205-dev",
  github: "https://github.com/roshan-1205",
  portfolioRepo: "https://github.com/roshan-1205/roshan-portfolio",
  leetcode: "https://leetcode.com/roshan-1205",
  portfolio: "https://roshan-portfolio-indol.vercel.app",
  location: "India",
  status:
    "Open to full-time roles, freelance, consulting, startup collaboration, speaking & strategic partnerships",
  cvUrl: "/Roshan-Kumar-Singh-CV.pdf",
  cvFileName: "Roshan-Kumar-Singh-CV.pdf",
  /** Set your profile photo URL here (Cloudinary, Imgur, etc.) */
  profileImageUrl:
    "https://res.cloudinary.com/dxwixlgfr/image/upload/v1781379718/Untitled_-_14_June_2026_at_01.08.12.jpg_em3ilq.jpg",
}

export const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/achievements", label: "Achievements" },
  { path: "/resume", label: "Resume" },
  { path: "/contact", label: "Contact" },
] as const

export const homeIntroduction = [
  "I fell in love with technology and programming, and I am trying to learn something new every day,",
  "I know...!!",
  "I am proficient in Node.js, Express, MongoDB, TypeScript, Python, AWS, and Git/GitHub.",
  "My fields of interest are Web Technologies, Artificial Intelligence, Cloud Computing, Full-Stack Development, and building innovative digital products.",
  "My true passion lies in Data Structures & Algorithms, Software Engineering, Problem Solving, and creating scalable solutions that make a real-world impact. 🚀",
] as const

export const stats = [
  { value: 3, suffix: "+", label: "Years of Experience" },
  { value: 4, suffix: "+", label: "Projects Completed" },
  { value: 2, suffix: "", label: "Happy Clients" },
  { value: 100, suffix: "%", label: "Commitment to Quality" },
]

export const aboutParagraphs = [
  personal.mission,
  "I focus on real-time systems, clean UI/UX, and production-ready architecture — shipping software that earns trust on first load and holds up under real-world scale.",
]

export const techPillars = [
  {
    icon: "🧠",
    stack: "OpenAI · Hugging Face · LangChain",
    focus: "Multi-language voice · intelligent routing",
  },
  {
    icon: "☁️",
    stack: "Docker · Kubernetes · Terraform",
    focus: "Multi-region · resilient by design",
  },
  {
    icon: "⚡",
    stack: "React · Next.js · FastAPI · Node",
    focus: "JWT · Socket.io · human-centered UI",
  },
]

export const skillCategories = [
  {
    icon: "🤖",
    title: "AI / ML",
    skills: [
      { name: "Python", level: 90 },
      { name: "TensorFlow", level: 82 },
      { name: "PyTorch", level: 80 },
      { name: "OpenAI", level: 88 },
      { name: "Hugging Face", level: 85 },
      { name: "LangChain", level: 84 },
    ],
  },
  {
    icon: "💻",
    title: "Development",
    skills: [
      { name: "React", level: 92 },
      { name: "Next.js", level: 88 },
      { name: "Node.js", level: 90 },
      { name: "Express", level: 85 },
      { name: "FastAPI", level: 86 },
      { name: "TypeScript", level: 88 },
    ],
  },
  {
    icon: "🗄️",
    title: "Data",
    skills: [
      { name: "MongoDB", level: 88 },
      { name: "PostgreSQL", level: 82 },
      { name: "Redis", level: 80 },
      { name: "DynamoDB", level: 75 },
      { name: "Pinecone", level: 78 },
    ],
  },
  {
    icon: "🚀",
    title: "Cloud / DevOps",
    skills: [
      { name: "AWS", level: 85 },
      { name: "Docker", level: 82 },
      { name: "Kubernetes", level: 75 },
      { name: "Terraform", level: 72 },
      { name: "Serverless", level: 80 },
      { name: "GitHub Actions", level: 78 },
    ],
  },
]

export const featuredProjects: FeaturedProject[] = [
  {
    id: "aks-beauty-hut",
    number: "01",
    category: "E-COMMERCE · FULL STACK · 2026",
    title: "AKS Beauty Hut — E-Commerce Website",
    description:
      "Modern beauty products e-commerce website built for a local retail business — featuring a responsive product catalog, smooth shopping experience, and a full-stack MERN architecture.",
    techStack: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "Tailwind CSS",
      "JWT Auth",
    ],
    features: [
      "Responsive product catalog with category browsing",
      "Shopping cart & checkout flow",
      "User authentication & order management",
      "Admin panel for product & inventory management",
      "Mobile-first design for retail customers",
      "Full-stack MERN deployment",
    ],
    liveUrl: "https://aksbeautyhut.vercel.app/",
    githubUrl: "https://github.com/roshan-1205/AKS-Beauty-Hut",
    imageUrl:
      "https://res.cloudinary.com/dxwixlgfr/image/upload/v1781376839/Beige_Minimalist_Mockup_Instagram_Post_q7p5rc.jpg",


    
  },
  {
    id: "vibely",
    number: "02",
    category: "SOCIAL MEDIA · REAL-TIME · 2026",
    title: "Vibely — Modern Social Platform",
    description:
      "I built Vibely as a production-grade social platform — real-time messaging, media posts, dual authentication, and a UI polished enough to earn trust on first load.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Socket.IO",
      "shadcn/ui",
      "Framer Motion",
    ],
    features: [
      "Real-time messaging via Socket.io with typing indicators",
      "Media posts with image & video upload",
      "Dual authentication — Google OAuth + JWT",
      "shadcn/ui components with Framer Motion animations",
      "Professional email notifications via Nodemailer",
      "Deployed on Vercel (frontend) + Render (backend)",
    ],
    liveUrl: "https://vibely-frontend-orpin.vercel.app",
    githubUrl: "https://github.com/roshan-1205/VIBELY",
    imageUrl:
      "https://res.cloudinary.com/dxwixlgfr/image/upload/v1781378512/Brown_Modern_Webdesign_Portfolio_Tablet_Mockup_Facebook_Post_p5dtwx.jpg",
  },
  {
    id: "pharmily",
    number: "03",
    category: "HEALTHCARE · FULL STACK · 2026",
    title: "PHARMILY — Healthcare Management System",
    description:
      "Enterprise-grade healthcare platform with real-time emergency SOS, intelligent appointment scheduling, and seamless hospital coordination. Production-ready MERN stack with Socket.IO for live alerts across patient, doctor, and admin portals.",
    techStack: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "Socket.IO",
      "Tailwind CSS",
      "JWT Auth",
      "Firebase",
    ],
    features: [
      "Anonymous emergency SOS with geolocation & nearest hospital routing",
      "Real-time admin alerts via Socket.IO with transfer workflow",
      "Appointment booking, medical records & bed reservation",
      "Role-based access for patients, doctors & hospital admins",
      "Hospital search with live bed availability",
      "Deployed on Firebase Hosting + Render + MongoDB Atlas",
    ],
    liveUrl: "https://pharmily-pm.web.app",
    githubUrl: "https://github.com/roshan-1205/PHARMILY",
    imageUrl:
      "https://res.cloudinary.com/dxwixlgfr/image/upload/v1780878560/portfolio-projects/pharmily.png",
  },
  {
    id: "fleetwatch",
    number: "04",
    category: "AI · ML · HACKATHON · 2026",
    title: "FleetWatch — AI Fleet Fraud Detection",
    description:
      "Reinforcement learning environment training LLMs to detect coordinated multi-agent fleet fraud — from GPS tampering to 3-agent financial collusion, built for the Meta PyTorch OpenEnv Hackathon.",
    techStack: [
      "Python",
      "FastAPI",
      "Llama-3",
      "LoRA",
      "REINFORCE",
      "Docker",
      "HuggingFace",
    ],
    features: [
      "5 progressive fraud detection tasks (T1–T5) with curriculum learning",
      "7-signal anti-gaming reward system for evidence-based reasoning",
      "Llama-3-8B + LoRA fine-tuning (~30 min on T4 GPU)",
      "11× mean reward improvement over baseline model",
      "RESTful API with real-time fraud scoring & breakdown",
      "Deployed on HuggingFace Spaces with Docker",
    ],
    liveUrl: "https://shiva0999-fleet-watch.hf.space",
    githubUrl: "https://github.com/roshan-1205/FleetWatch",
    imageUrl:
      "https://res.cloudinary.com/dxwixlgfr/image/upload/v1780878537/portfolio-projects/fleetwatch.png",
  },
  {
    id: "vaani",
    number: "05",
    category: "AI · VOICE · CIVIC TECH · 2026",
    title: "VAANI — AI-Powered Civic Engagement",
    description:
      "I built VAANI so underserved communities could reach government services through phone calls and WhatsApp voice — in local languages, on low bandwidth, with no apps or forms required.",
    techStack: [
      "React",
      "Node.js",
      "FastAPI",
      "AWS Bedrock",
      "LangChain",
      "Firebase",
      "Python",
    ],
    features: [
      "Voice AI with multilingual support (Hindi, English, Hinglish)",
      "Geolocation mapping for civic issue routing",
      "Smart notifications & real-time issue tracking",
      "Admin analytics dashboard with interactive charts",
      "JWT security & Firebase authentication",
      "Deployed on Firebase with AWS Amplify integration",
    ],
    liveUrl: "https://vaani-ai-assistant-419de.web.app",
    githubUrl: "https://github.com/roshan-1205/VAANI",
    imageUrl:
      "https://res.cloudinary.com/dxwixlgfr/image/upload/v1781377765/Mockup_Page_xfzh1w.jpg",
  },
]

export const timeline = [
  {
    year: "2023",
    label: "Started the Journey",
    title: "Enrolled in B.Tech Computer Science",
    organization: "Computer Science, India",
    description:
      "Began formal education in Computer Science with a focus on programming fundamentals, data structures, and software engineering principles.",
  },
  {
    year: "2024",
    label: "First Real Project",
    title: "Built & Deployed First Full Stack Application",
    organization: "Personal / Freelance",
    description:
      "Successfully designed, developed, and deployed a full stack web application independently — marking the beginning of a professional development journey.",
  },
  {
    year: "2025",
    label: "Freelance Career Begins",
    title: "Completed First Paid Freelance Project",
    organization: "Independent Freelancer",
    description:
      "Delivered a complete e-commerce website for a local business client, receiving outstanding feedback and establishing a foundation for ongoing freelance work.",
  },
  {
    year: "2026",
    label: "Growing Portfolio",
    title: "2 Clients Served as Full Stack Freelancer",
    organization: "Freelance / Remote",
    description:
      "Reached the milestone of serving 10+ satisfied clients across industries including retail, education, and hospitality — building production-grade web applications.",
  },
]

export const certifications: Certification[] = [
  {
    id: "web-development",
    title: "Web Development",
    issuer: "AKS University",
    instructor: "Mr. Anurag Garg",
    year: "2024",
    credential: "UC-XXXXXXXXXX",
    skills: ["HTML", "CSS", "JavaScript", "React.js", "MongoDB"],
    imageUrl:
      "https://res.cloudinary.com/dxwixlgfr/image/upload/v1780871989/portfolio-projects/web-development.jpg",
  },
  {
    id: "software-developer-it-ites",
    title: "Software Developer (IT-ITES Sector)",
    issuer: "Skill India Mission (PMKVY)",
    instructor: "Sindhu Gangadharan",
    year: "2025",
    credential: "UC-XXXXXXXXXX",
    skills: ["Software Development"],
    imageUrl:
      "https://res.cloudinary.com/dxwixlgfr/image/upload/v1780877189/portfolio-projects/software-developer-it-ites.jpg",
  },
]

export const marqueeText = [
  "ROSHAN KUMAR SINGH",
  "TECHNOLOGY STRATEGIST",
  "AI INNOVATION LEADER",
  "ENTERPRISE SYSTEMS ARCHITECT",
  "OPEN TO WORK",
]
