/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Moon, 
  Sun, 
  Github, 
  Linkedin, 
  Instagram, 
  ExternalLink, 
  Download, 
  Mail, 
  MapPin, 
  Star, 
  ChevronRight,
  Menu,
  X,
  Award,
  BookOpen,
  Cpu
} from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

// --- Types ---
type ProjectCategory = 'All' | 'Web' | 'AI' | 'Academic';

interface Project {
  id: number;
  title: string;
  category: ProjectCategory;
  tags: string[];
  description: string;
  image: string;
  github: string;
  link: string;
}

interface Skill {
  name: string;
  level: number;
}

interface SkillGroup {
  title: string;
  skills: Skill[];
}

interface TimelineItem {
  title: string;
  organization: string;
  period: string;
  description: string;
}

interface Milestone {
  title: string;
  issuer: string;
  date: string;
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "PassSecure",
    category: "Web",
    tags: ["Flask", "JavaScript", "Security"],
    description: "A Flask-based password security assessment tool that analyzes password strength and resilience using modern validation techniques.",
    image: "https://raw.githubusercontent.com/adityarghh/Portfolio-Aditya/main/Apple%20Just%20Killed%20the%20Password%E2%80%94for%20Real%20This%20Time.jpg",
    github: "https://github.com/adityarghh/PassSecure.git",
    link: "https://github.com/adityarghh/PassSecure.git"
  },
  {
    id: 2,
    title: "Offroad-Semantic",
    category: "AI",
    tags: ["Python", "Machine Learning", "Semantic Search"],
    description: "A semantic analysis system focused on intelligent interpretation and contextual understanding.",
    image: "https://raw.githubusercontent.com/adityarghh/Portfolio-Aditya/main/sematic.jpg",
    github: "https://github.com/adityarghh/Offroad-Semantic.git",
    link: "https://github.com/adityarghh/Offroad-Semantic.git"
  },
  {
    id: 3,
    title: "DocuQuery",
    category: "AI",
    tags: ["Python", "NLP", "Retrieval"],
    description: "An AI-powered document querying system designed to extract insights from structured and unstructured text data.",
    image: "https://raw.githubusercontent.com/adityarghh/Portfolio-Aditya/main/docuquery.jpg",
    github: "https://github.com/adityarghh/DocuQuery.git",
    link: "https://github.com/adityarghh/DocuQuery.git"
  },
  {
    id: 4,
    title: "Distributed Chat System",
    category: "Academic",
    tags: ["Distributed Systems", "Networking", "Concurrency"],
    description: "A distributed communication system demonstrating networking concepts and concurrent architecture design.",
    image: "https://github.com/adityarghh/download-11.jpg",
    github: "https://github.com/adityarghh/Distributed-chat-system.git",
    link: "https://github.com/adityarghh/Distributed-chat-system.git"
  },
  {
    id: 5,
    title: "Bank Management Simulation",
    category: "Academic",
    tags: ["Java", "OOP", "Simulation"],
    description: "A simulation-based banking system showcasing object-oriented design and structured logic.",
    image: "/images/projects/bankmanagement.jpg",
    github: "https://github.com/adityarghh/Bank-Management-Simulation.git",
    link: "https://github.com/adityarghh/Bank-Management-Simulation.git"
  },
  {
    id: 6,
    title: "Library Management System",
    category: "Academic",
    tags: ["Java", "OOP", "Database"],
    description: "A structured library system application demonstrating database handling and modular design.",
    image: "https://raw.githubusercontent.com/adityarghh/Portfolio-Aditya/main/%23ikea%20%F0%9F%92%A1.jpg",
    github: "https://github.com/adityarghh/Library-Management-System.git",
    link: "https://github.com/adityarghh/Library-Management-System.git"
  }
];

const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Programming",
    skills: [
      { name: "Java", level: 90 },
      { name: "Python", level: 85 },
      { name: "C++", level: 80 },
      { name: "JavaScript", level: 85 }
    ]
  },
  {
    title: "Web Development",
    skills: [
      { name: "React", level: 80 },
      { name: "TailwindCSS", level: 90 },
      { name: "Flask", level: 75 }
    ]
  },
  {
    title: "AI/ML",
    skills: [
      { name: "Machine Learning", level: 75 },
      { name: "NumPy/Pandas", level: 80 },
      { name: "Scikit-learn", level: 72 }
    ]
  },
  {
    title: "Tools",
    skills: [
      { name: "Git/GitHub", level: 85 },
      { name: "VS Code", level: 90 },
      { name: "Figma", level: 70 }
    ]
  },
  {
    title: "Leadership & Communication",
    skills: [
      { name: "Public Speaking & Anchoring", level: 85 },
      { name: "Event Coordination", level: 80 },
      { name: "Crowd Management", level: 78 },
      { name: "Team Collaboration", level: 88 },
      { name: "Presentation Skills", level: 82 }
    ]
  }
];

const TIMELINE: TimelineItem[] = [
  {
    title: "Core Member",
    organization: "Bit By Bit Club",
    period: "December 2025 – Present",
    description: "Contributing to technical initiatives and collaborative innovation projects within the club ecosystem."
  },
  {
    title: "Design & Content Creator",
    organization: "PranSpanda Club",
    period: "November 2025 – December 2025",
    description: "Led design and content creation efforts, focusing on visual storytelling and audience engagement."
  },
  {
    title: "Event Anchor & Coordinator",
    organization: "School & Junior College",
    period: "2023–2024",
    description: "Hosted and anchored multiple school and college-level events, managing live audiences and coordinating with organising teams. Built a strong stage presence and the ability to communicate clearly under pressure — skills directly transferable to hackathon demos and product presentations."
  }
];

const MILESTONES: Milestone[] = [
  { title: "National-Level Quiz Participant", issuer: "NISM–SEBI National Financial Literacy Quiz 2026", date: "2026" },
  { title: "Hackathon Competitor", issuer: "Dawn of Code — MERN Stack Club, VIT", date: "Sep 2025" },
  { title: "International Academic Engagement", issuer: "VLU Global Talk — Van Lang University", date: "Aug 2025" },
  { title: "Cyber Risk & Compliance Masterclass", issuer: "Risk & Compliance — University of San Diego", date: "Aug 2025" },
  { title: "Machine Learning Foundations", issuer: "Intro to ML Concepts — Completion", date: "Jul 2025" },
  { title: "AWS Industry Workshop", issuer: "Amazon Q in Code & Play — AWS Cloud Club, VIT", date: "Aug 2025" },
  { title: "Deloitte Australia Data Analytics Job Simulation",issuer: "Forage — Tableau & Excel Analytics",date: "Feb 2026"},
  {title: "Deloitte Australia Cyber Security Job Simulation",issuer: "Forage — Log Analysis & Threat Detection",date: "Feb 2026"},
];

// --- Components ---

const Typewriter = ({ texts }: { texts: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === texts[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1500);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, texts]);

  return (
    <span className="text-accent font-semibold border-r-2 border-accent pr-1 inline-block min-w-[1ch]">
      {texts[index].substring(0, subIndex)}
    </span>
  );
};

const Floating3DElement = ({ className, delay = 0 }: { className?: string, delay?: number }) => (
  <motion.div
    className={`absolute pointer-events-none opacity-20 dark:opacity-10 ${className}`}
    animate={{
      y: [0, -20, 0],
      rotateX: [0, 10, 0],
      rotateY: [0, 15, 0],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
      delay
    }}
  >
    <div className="w-32 h-32 border border-slate-900 dark:border-white rounded-3xl transform rotate-45" />
  </motion.div>
);

const TiltCard = ({ children, className }: { children: React.ReactNode, className?: string, key?: any }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className={`perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="preserve-3d w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};

const SkillBar = ({ skill }: { skill: Skill; key?: string | number }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-accent">{skill.name}</span>
        <span className="text-xs opacity-60 text-accent">{skill.level}%</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: false }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          className="h-full bg-accent rounded-full"
        />
      </div>
    </div>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * 10;
    const rotateYValue = ((centerX - x) / centerX) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        rotateX: rotateX,
        rotateY: rotateY,
      }}
      className="group bg-[#0f0f0f] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-white/5"
    >
      <div className="aspect-video overflow-hidden relative">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-4 translate-z-10">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white text-slate-900 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
              <Github size={20} />
            </a>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white text-slate-900 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
      </div>
      <div className="p-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 bg-white/5 rounded-md opacity-60">
              {tag}
            </span>
          ))}
        </div>
        <h4 className="text-2xl font-display font-bold mb-3">{project.title}</h4>
        <p className="opacity-70 text-sm leading-relaxed mb-6">{project.description}</p>
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold group/link">
          View Project <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
};

const MouseGlow = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setOpacity(1);
    };
    const handleMouseLeave = () => setOpacity(0);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      className="mouse-glow hidden md:block" 
      style={{ 
        left: `${mousePos.x}px`, 
        top: `${mousePos.y}px`,
        opacity: opacity
      }} 
    />
  );
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [formState, handleSubmit] = useForm("xdalpkpz");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Mark body as ready for animations
    document.body.classList.add('animate-ready');
    // Force dark mode class
    document.documentElement.classList.add('dark');

    return () => observer.disconnect();
  }, []);

  // Scroll Progress and Nav Blur
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return PROJECTS;
    return PROJECTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div ref={bodyRef} className="min-h-screen selection:bg-accent selection:text-slate-900">
      <MouseGlow />
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-accent z-[100] transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#" className="text-2xl font-display font-bold tracking-tighter text-accent">AR</a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-sm font-medium text-accent hover:opacity-60 transition-opacity"
              >
                {item}
              </a>
            ))}
            <a 
              href="#resume" 
              className="px-5 py-2 border border-accent text-xs font-semibold rounded-full hover:bg-accent hover:text-slate-900 transition-all text-accent"
            >
              Resume
            </a>
          </div>

          {/* Mobile Nav Toggle */}
          <button className="md:hidden" onClick={() => setIsNavOpen(!isNavOpen)}>
            {isNavOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isNavOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-beige-50 dark:bg-[#0f0f0f] border-b border-beige-200 dark:border-white/10 p-6 md:hidden flex flex-col space-y-4"
            >
              {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setIsNavOpen(false)}
                  className="text-lg font-medium"
                >
                  {item}
                </a>
              ))}
              <a 
                href="#resume" 
                onClick={() => setIsNavOpen(false)}
                className="w-full py-3 bg-slate-900 text-beige-50 dark:bg-beige-100 dark:text-slate-900 text-center rounded-xl font-semibold"
              >
                Resume
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col justify-center section-padding relative overflow-hidden">
        {/* 3D Background Elements */}
        <Floating3DElement className="top-1/4 -left-16" delay={0} />
        <Floating3DElement className="bottom-1/4 -right-16" delay={1} />
        <Floating3DElement className="top-1/3 right-1/4 scale-50" delay={2} />

        <div className="max-w-4xl relative z-10">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg md:text-xl font-medium mb-4 opacity-80"
          >
            Hi, I'm <span className="font-display italic">Aditya Raj</span>
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight leading-tight mb-6"
          >
            BTech Student · Developer · <br />
            <Typewriter texts={["AI & ML Enthusiast", "UI/UX Builder", "Product Thinker"]} />
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg md:text-xl max-w-2xl mb-10 opacity-70 leading-relaxed"
          >
            Designing and developing clean, minimal, and user-centric digital experiences with a focus on elegance and functionality.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#projects" className="px-8 py-4 bg-slate-900 text-beige-50 dark:bg-beige-100 dark:text-slate-900 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg shadow-slate-900/10 dark:shadow-none">
              View Projects
            </a>
            <a href="#resume" className="px-8 py-4 border border-slate-900 dark:border-beige-100 rounded-full font-semibold hover:bg-slate-900 hover:text-beige-50 dark:hover:bg-beige-100 dark:hover:text-slate-900 transition-all flex items-center gap-2">
              <Download size={18} /> Download Resume
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <motion.section 
        id="about" 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-slate-800 section-padding"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative fade-in">
            <div className="absolute -top-4 -left-4 w-full h-full border border-slate-900/10 dark:border-white/10 rounded-2xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl group">
              <img 
                src="https://github.com/adityarghh/Aditya.jpg" 
                alt="Aditya Raj" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="fade-in stagger-1">
            <h2 className="text-sm uppercase tracking-widest mb-4 opacity-60">About Me</h2>
            <p className="text-xl md:text-2xl font-display mb-8 leading-relaxed">
              I'm a BTech student in Artificial Intelligence at VIT, passionate about building interactive digital systems at the intersection of AI, design, and product thinking.
            </p>
            <p className="mb-8 opacity-70 leading-relaxed">
              Beyond code, I bring hands-on experience in event anchoring, crowd management, and public communication — skills that shape how I lead teams, present ideas, and engage audiences. I'm working toward building products that are both technically rigorous and human-centered, with entrepreneurship as a long-term goal.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
              <div className="flex gap-4">
                <div className="mt-1"><BookOpen size={20} className="opacity-60" /></div>
                <div>
                  <h4 className="font-semibold mb-1">BTech in AI — VIT</h4>
                  <p className="text-sm opacity-60">2025–2029</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1"><Cpu size={20} className="opacity-60" /></div>
                <div>
                  <h4 className="font-semibold mb-1">Product-minded</h4>
                  <p className="text-sm opacity-60">Builder & Communicator</p>
                </div>
              </div>
            </div>

            <div className="flex gap-12 border-t border-slate-900/10 dark:border-white/10 pt-8">
              <div>
                <span className="block text-3xl font-display font-bold">3+</span>
                <span className="text-xs uppercase tracking-widest opacity-60">Projects</span>
              </div>
              <div>
                <span className="block text-3xl font-display font-bold">2</span>
                <span className="text-xs uppercase tracking-widest opacity-60">Clubs</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section 
        id="skills" 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="section-padding"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 fade-in">
            <h2 className="text-sm uppercase tracking-widest mb-4 opacity-60">Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold">Skills & *Capabilities*</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-x-20 gap-y-12">
            {SKILL_GROUPS.map((group, idx) => (
              <div key={group.title} className={`fade-in stagger-${(idx % 4) + 1}`}>
                <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <div className="w-8 h-px bg-slate-900/20 dark:bg-white/20" />
                  {group.title}
                </h4>
                <div>
                  {group.skills.map((skill) => (
                    <SkillBar key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        id="projects" 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-slate-800 section-padding"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 fade-in">
            <div>
              <h2 className="text-sm uppercase tracking-widest mb-4 opacity-60">Portfolio</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold">Selected *Works*</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {(['All', 'Web', 'AI', 'Academic'] as ProjectCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? 'bg-slate-900 text-beige-50 dark:bg-beige-100 dark:text-slate-900' : 'bg-beige-200 dark:bg-white/5 hover:bg-beige-300 dark:hover:bg-white/10'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <TiltCard key={project.id}>
                  <motion.div
                    layout
                    data-cat={project.category}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="group bg-beige-50 dark:bg-[#0f0f0f] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-900/5 dark:border-white/5 h-full"
                  >
                    <div className="aspect-video overflow-hidden relative">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/60 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <a href={project.github} className="w-12 h-12 bg-beige-50 text-slate-900 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                            <Github size={20} />
                          </a>
                          <a href={project.link} className="w-12 h-12 bg-beige-50 text-slate-900 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                            <ExternalLink size={20} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 bg-beige-100 dark:bg-white/10 rounded-md opacity-60">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h4 className="text-2xl font-display font-bold mb-3">{project.title}</h4>
                      <p className="opacity-70 text-sm leading-relaxed mb-6">{project.description}</p>
                      <a href={project.link} className="inline-flex items-center gap-2 text-sm font-semibold group/link">
                        View Project <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </motion.div>
                </TiltCard>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section 
        id="experience" 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="section-padding overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 fade-in">
            <h2 className="text-sm uppercase tracking-widest mb-4 opacity-60">Journey</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold">Experience & *Timeline*</h3>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="timeline-line hidden md:block" />

            <div className="space-y-12 md:space-y-0">
              {TIMELINE.map((item, idx) => (
                <div key={idx} className={`relative md:grid md:grid-cols-[1fr_3rem_1fr] items-center fade-in stagger-${(idx % 3) + 1}`}>
                  {/* Left Side */}
<div className="hidden md:block md:order-1 md:text-right">
                    {idx % 2 === 0 && (
                      <div className="md:pr-14">
                        <span className="text-xs font-bold uppercase tracking-widest opacity-40 mb-2 block">{item.period}</span>
                        <h4 className="text-2xl font-display font-bold mb-1">{item.title}</h4>
                        <p className="text-sm font-semibold opacity-60 mb-4">{item.organization}</p>
                        <p className="text-sm opacity-70 leading-relaxed">{item.description}</p>
                      </div>
                    )}
                  </div>

                  {/* Center Dot */}
                  <div className="hidden md:flex justify-center md:order-2 z-10">
                    <div className="w-4 h-4 rounded-full bg-slate-900 dark:bg-beige-100 border-4 border-beige-50 dark:border-[#0f0f0f]" />
                  </div>

                  {/* Right Side */}
                 <div className="hidden md:block md:order-3 md:text-left">
                    {idx % 2 !== 0 && (
                      <div className="md:pl-14">
                        <span className="text-xs font-bold uppercase tracking-widest opacity-40 mb-2 block">{item.period}</span>
                        <h4 className="text-2xl font-display font-bold mb-1">{item.title}</h4>
                        <p className="text-sm font-semibold opacity-60 mb-4">{item.organization}</p>
                        <p className="text-sm opacity-70 leading-relaxed">{item.description}</p>
                      </div>
                    )}
                  </div>

                  {/* Mobile Layout Adjustment */}
                  <div className="md:hidden pl-8 border-l border-slate-900/20 dark:border-white/20 ml-2">
                    <span className="text-xs font-bold uppercase tracking-widest opacity-40 mb-2 block">{item.period}</span>
                    <h4 className="text-xl font-display font-bold mb-1">{item.title}</h4>
                    <p className="text-sm font-semibold opacity-60 mb-4">{item.organization}</p>
                    <p className="text-sm opacity-70 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Milestones Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-slate-800 section-padding"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 fade-in">
            <h2 className="text-sm uppercase tracking-widest mb-4 opacity-60">Milestones</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold">Recognition & *Credentials*</h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MILESTONES.map((milestone, idx) => (
              <div key={idx} className={`bg-beige-50 dark:bg-[#0f0f0f] p-8 rounded-2xl border border-transparent hover:border-[#c9a84c]/30 transition-all duration-500 group fade-in stagger-${(idx % 4) + 1}`}>
                <div className="w-12 h-12 rounded-xl border-2 border-[#c9a84c] flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(201,168,76,0.1)] group-hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all">
                  <Award size={24} className="text-[#c9a84c]" />
                </div>
                <h4 className="text-lg font-bold mb-2 leading-tight">{milestone.title}</h4>
                <p className="text-xs opacity-60 mb-4">{milestone.issuer}</p>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold opacity-40">
                  <Star size={10} /> {milestone.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Resume Section */}
      <motion.section 
        id="resume" 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="section-padding"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="fade-in">
            <h2 className="text-sm uppercase tracking-widest mb-4 opacity-60">Curriculum Vitae</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold mb-8">My *Resume*</h3>
            <p className="opacity-70 leading-relaxed mb-10">
              I'm constantly learning and evolving. My resume reflects my academic journey, technical skills, and the leadership experiences that define my professional approach.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-white/5 p-6 rounded-2xl">
                <span className="block text-2xl font-display font-bold">1st</span>
                <span className="text-xs uppercase tracking-widest opacity-60">Year Student</span>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl">
                <span className="block text-2xl font-display font-bold">AI & ML</span>
                <span className="text-xs uppercase tracking-widest opacity-60">Specialisation</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a 
  href="/Aditya_Raj_Resume.pdf"
  download
  className="px-8 py-4 bg-beige-100 text-slate-900 rounded-full font-semibold flex items-center gap-2 hover:scale-105 transition-transform"
>
                <Download size={18} /> Download PDF
              </a>
              <a 
  href="/Aditya_Raj_Resume.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="px-8 py-4 border border-beige-100 rounded-full font-semibold hover:bg-beige-100 hover:text-slate-900 transition-all"
>
                View Online
              </a>
            </div>
          </div>
          
          <div className="relative fade-in stagger-2">
            <div className="aspect-[3/4] rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
  <iframe
    src="/Aditya_Raj_Resume.pdf"
    className="w-full h-full"
    title="Resume Preview"
  />
</div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#c9a84c]/10 rounded-full blur-3xl" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact" 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-[#141414] section-padding"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-16 fade-in">
            <h2 className="text-sm uppercase tracking-widest mb-4 opacity-60">Get In Touch</h2>
            <h3 className="text-4xl md:text-6xl font-display font-bold mb-6">Start a  conversation</h3>
            <p className="opacity-70 max-w-xl mx-auto leading-relaxed">
              I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
          </div>

          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-12 items-start text-left">
            <div className="fade-in stagger-1">
              <form onSubmit={handleSubmit} className="space-y-4">
  <input 
    type="text" 
    name="name"
    placeholder="Name" 
    required
    className="w-full px-6 py-4 bg-[#1e1e1e] border border-transparent focus:border-white/20 outline-none rounded-xl transition-all"
  />

  <input 
    type="email" 
    name="email"
    placeholder="Email" 
    required
    className="w-full px-6 py-4 bg-[#1e1e1e] border border-transparent focus:border-white/20 outline-none rounded-xl transition-all"
  />

  <ValidationError 
    prefix="Email" 
    field="email"
    errors={formState.errors}
  />

  <textarea 
    name="message"
    placeholder="Message" 
    rows={4}
    required
    className="w-full px-6 py-4 bg-[#1e1e1e] border border-transparent focus:border-white/20 outline-none rounded-xl transition-all resize-none"
  />

  <ValidationError 
    prefix="Message" 
    field="message"
    errors={formState.errors}
  />

  <button 
    type="submit" 
    disabled={formState.submitting}
    className="w-full py-4 bg-beige-100 text-slate-900 rounded-xl font-semibold hover:opacity-90 transition-opacity"
  >
    {formState.submitting ? "Sending..." : "Send Message"}
  </button>

  {formState.succeeded && (
    <p className="text-[#c9a84c] text-sm mt-4">
      Thanks for reaching out. I’ll get back to you shortly.
    </p>
  )}
</form>
            </div>

            <div className="hidden md:block w-px h-full bg-white/10" />

            <div className="space-y-10 fade-in stagger-2">
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold opacity-40 mb-4">Contact Details</h4>
                <div className="space-y-4">
                  <a href="mailto:adiwildinn@gmail.com" className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-[#1e1e1e] flex items-center justify-center group-hover:bg-beige-100 group-hover:text-slate-900 transition-all">
                      <Mail size={18} />
                    </div>
                    <span className="font-medium">adiwildinn@gmail.com</span>
                  </a>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#1e1e1e] flex items-center justify-center">
                      <MapPin size={18} />
                    </div>
                    <span className="font-medium">Bengaluru, Karnataka, India</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold opacity-40 mb-4">Socials</h4>
                <div className="flex gap-4">
                  {[
                    { icon: <Github size={20} />, href: "https://github.com/adityarghh" },
                    { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/aditya-raj-79a53b314" },
                    { icon: <Instagram size={20} />, href: "#" }
                  ].map((social, idx) => (
                    <a 
                      key={idx} 
                      href={social.href} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-[#1e1e1e] flex items-center justify-center hover:bg-beige-100 hover:text-slate-900 transition-all"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-display font-bold mb-4">Aditya Raj</h2>
          <p className="text-sm opacity-50">Designed with elegance © 2026</p>
        </div>
      </footer>
    </div>
  );
}
