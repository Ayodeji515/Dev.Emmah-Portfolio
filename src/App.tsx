import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Menu, X, Github, Linkedin, Mail, Code, Rocket, Compass, Star, Send, ExternalLink, Copy, Check, FileText, Briefcase, ChevronRight, Sun, Moon, AlertCircle, ChevronUp } from "lucide-react";
import { cn } from "./utils";

// --- Components ---

const CVModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const cvRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const experience = [
    {
      company: "Google Developer Group (GDG) FUOYE",
      role: "Frontend Lead",
      period: "Full-time",
      description: [
        "Led the frontend community at Google Developer Group on Campus, FUOYE, fostering collaboration and learning.",
        "Guided developers in utilizing modern frontend tools and best practices to enhance their skills.",
        "Organized hands-on learning opportunities and community projects to support technical and professional growth."
      ]
    },
    {
      company: "CoilSkin",
      role: "Software Developer & CTO",
      period: "Present",
      url: "https://coilskin.vercel.app/",
      description: [
        "Developed React website for CoilSkin to showcase skincare and haircare solutions.",
        "Managed technical development team and overall team strategy.",
        "Leading the development of the CoilSkin E-commerce web app.",
        "CoilSkin leverages tech to make skincare products and consultations readily available."
      ]
    },
    {
      company: "Hospiyou",
      role: "Frontend Developer",
      period: "Present",
      url: "https://www.hospiyou.com/",
      description: [
        "Building user interfaces and responsive designs for an AI-Data Powered Tele-Medical Corporation.",
        "Ensuring quality healthcare is accessible to everyone through intuitive digital experiences."
      ]
    },
    {
      company: "GrundPay",
      role: "Product Manager",
      period: "Present",
      url: "http://www.grundpay.com",
      description: [
        "Managing product strategy and roadmap for a real estate technology company.",
        "Bridging the gap between business requirements and technical implementation."
      ]
    },
    {
      company: "LearnByte",
      role: "Founder & Team Lead",
      period: "Present",
      url: "https://learnbytee.netlify.app/",
      description: [
        "Founded an EdTech startup focused on practical, hands-on tech education.",
        "Breaking down complex tech concepts into bite-sized, community-driven lessons.",
        "Leading a team to help aspiring professionals level up their skills through real-world projects."
      ]
    },
    {
      company: "Kate Marketing Agency",
      role: "CMS Website Developer",
      period: "Present",
      description: [
        "Developing professional websites using WordPress, Snapps, and other CMS platforms.",
        "Tailoring digital solutions for diverse marketing agency clients."
      ]
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl print:bg-white print:p-0"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-surface border border-border-subtle w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[40px] p-8 md:p-12 relative shadow-2xl print:max-h-none print:overflow-visible print:shadow-none print:border-none print:rounded-none print:bg-white print:text-black"
      >
        <div className="flex justify-end gap-4 mb-4 print:hidden">
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-text-main/10 transition-colors text-text-main"
          >
            <X size={24} />
          </button>
        </div>

        <div id="cv-printable-content" className="bg-surface">
          <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
            <div className="w-24 h-24 rounded-3xl bg-brand-primary/20 flex items-center justify-center text-brand-primary shrink-0 print:bg-brand-primary/10">
              <FileText size={48} />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-2">Emmanuel <span className="text-brand-primary">Ayodeji</span></h2>
              <p className="text-text-muted text-lg print:text-gray-600">CMS & Frontend Developer | Product Manager | Tech4All Specialist</p>
            </div>
          </div>

          <div className="space-y-12">
            <section>
              <div className="flex items-center gap-3 mb-6 text-brand-secondary">
                <Briefcase size={24} />
                <h3 className="text-2xl font-bold">Professional Experience</h3>
              </div>
              <div className="space-y-8">
                {experience.map((exp, i) => (
                  <div key={i} className="relative pl-8 border-l border-border-subtle print:border-gray-200">
                    <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-brand-primary" />
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2 gap-2">
                      <h4 className="text-xl font-bold text-text-main print:text-black">{exp.company}</h4>
                      <span className="text-xs font-mono text-brand-primary uppercase tracking-widest bg-brand-primary/10 px-3 py-1 rounded-full">{exp.period}</span>
                    </div>
                    <p className="text-brand-secondary font-medium mb-4">{exp.role}</p>
                    <ul className="space-y-2">
                      {exp.description.map((item, j) => (
                        <li key={j} className="text-text-muted text-sm flex gap-2 print:text-gray-700">
                          <span className="text-brand-primary mt-1.5 shrink-0 w-1 h-1 rounded-full bg-brand-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    {exp.url && (
                      <a href={exp.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs text-brand-primary mt-4 hover:underline print:hidden">
                        Visit Website <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Navbar = ({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Tech4All", href: "#tech4all" },
    { name: "Projects", href: "#projects" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4",
      scrolled ? "bg-surface/80 backdrop-blur-md border-b border-border-subtle py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.a 
          href="#" 
          className="flex items-center gap-2 group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-black font-bold text-xl shadow-lg shadow-brand-primary/20 group-hover:rotate-6 transition-transform">
            E
          </div>
          <span className="text-2xl font-display font-bold text-gradient">EMMANUEL.</span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a 
              key={link.name} 
              href={link.href} 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-medium hover:text-brand-primary transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full" />
            </motion.a>
          ))}
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full glass hover:bg-text-main/10 transition-colors"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <motion.a 
            href="mailto:emmanuelayodeji515@gmail.com" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 rounded-full bg-brand-primary text-black font-semibold text-sm hover:bg-text-main hover:text-surface transition-colors"
          >
            Hire Me
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <motion.a 
            href="mailto:emmanuelayodeji515@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-1.5 rounded-full bg-brand-primary text-black font-bold text-xs"
          >
            Hire Me
          </motion.a>
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full glass text-text-main"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="text-text-main" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="absolute top-full left-0 w-full bg-surface border-b border-border-subtle p-6 flex flex-col gap-4 md:hidden overflow-hidden"
        >
          {navLinks.map((link, i) => (
            <motion.a 
              key={link.name} 
              href={link.href} 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium hover:text-brand-primary"
            >
              {link.name}
            </motion.a>
          ))}
          <motion.a 
            href="mailto:emmanuelayodeji515@gmail.com"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: navLinks.length * 0.1 }}
            onClick={() => setIsOpen(false)}
            className="w-full py-4 rounded-2xl bg-brand-primary text-black font-bold text-center"
          >
            Hire Me
          </motion.a>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut" as const 
      } 
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Parallax Elements */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-1/4 -left-20 w-64 h-64 md:w-96 md:h-96 bg-brand-primary/10 rounded-full blur-[80px] md:blur-[120px]"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-1/4 -right-20 w-64 h-64 md:w-96 md:h-96 bg-brand-secondary/10 rounded-full blur-[80px] md:blur-[120px]"
      />
      <motion.div 
        style={{ y: y3, rotate }}
        className="absolute top-1/3 right-1/4 w-64 h-64 border border-brand-primary/5 rounded-[60px] blur-[2px] hidden md:block"
      />
      <motion.div 
        style={{ y: y1, rotate: -rotate }}
        className="absolute bottom-1/3 left-1/4 w-48 h-48 border border-brand-secondary/5 rounded-full blur-[1px] hidden md:block"
      />

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          style={{ 
            y: useTransform(scrollYProgress, [0, 1], [0, Math.random() * 400 - 200]),
            x: Math.random() * 100 - 50
          }}
          className="absolute w-1 h-1 bg-text-main/10 rounded-full"
          initial={{ 
            top: `${Math.random() * 100}%`, 
            left: `${Math.random() * 100}%` 
          }}
        />
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span 
            variants={itemVariants}
            className="inline-block px-4 py-1.5 rounded-full glass text-xs font-mono uppercase tracking-widest text-brand-primary mb-6"
          >
            CMS & Frontend Developer • Product Manager • Tech4All Specialist
          </motion.span>
          <motion.h1 
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-8xl font-display font-bold mb-8 leading-[1.1]"
          >
            Crafting <span className="text-gradient italic">Digital</span> Multiverses.
          </motion.h1>
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-12"
          >
            <div className="glass p-6 rounded-3xl border-l-4 border-brand-primary">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Rocket className="text-brand-primary" size={20} /> Product Management
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Spearheaded product roadmaps for startups like GrundPay, achieving a 30% increase in user engagement through data-driven UI optimizations and agile leadership.
              </p>
            </div>
            <div className="glass p-6 rounded-3xl border-l-4 border-brand-secondary">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Compass className="text-brand-secondary" size={20} /> Tech4All Onboarding
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Successfully oriented over 500+ non-tech individuals into the ecosystem, simplifying complex concepts and fostering a inclusive learning environment at LearnByte.
              </p>
            </div>
          </motion.div>
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a 
              href="#projects" 
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-text-main text-surface font-bold hover:bg-brand-primary hover:text-black transition-all transform hover:scale-105"
            >
              View Projects
            </a>
            <a 
              href="#tech4all" 
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-surface border border-border-subtle text-text-main font-bold hover:border-brand-primary transition-all"
            >
              Tech Orientation
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Icons */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-1/3 left-10 md:left-40 p-4 glass rounded-2xl hidden lg:block"
      >
        <Code className="text-brand-primary" size={32} />
      </motion.div>
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute bottom-1/3 right-10 md:right-40 p-4 glass rounded-2xl hidden lg:block"
      >
        <Rocket className="text-brand-secondary" size={32} />
      </motion.div>
    </section>
  );
};

const AboutMe = ({ onOpenCV }: { onOpenCV: () => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Who is <span className="text-gradient">Emmanuel?</span></h2>
            <div className="space-y-6 text-text-muted text-lg leading-relaxed">
              <p>
                As a hybrid professional, I operate at the intersection of CMS & Frontend Development, Product Management, and Tech4All Onboarding. My career is driven by a commitment to delivering digital solutions that are technically robust, strategically aligned, and universally accessible.
              </p>
              
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-6"
                >
                  <p>
                    In my development practice, I focus on building high-performance frontends and seamless CMS integrations. As a Product Manager, I have successfully increased user engagement by 30% for key projects by bridging the gap between technical execution and user-centric strategy.
                  </p>
                  <p>
                    Beyond technical delivery, I am deeply committed to the Tech4All initiative. I have personally oriented and mentored over 500 individuals, helping aspiring professionals navigate the digital landscape and identify their unique career paths through simplified education and structured onboarding.
                  </p>
                </motion.div>
              )}

              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-2 text-brand-primary font-bold hover:text-text-main transition-colors"
                >
                  {isExpanded ? "Read Less" : "Read More"} <ChevronRight className={cn("transition-transform", isExpanded && "rotate-90")} size={20} />
                </button>
                <button 
                  onClick={onOpenCV}
                  className="flex items-center gap-2 px-6 py-2 rounded-full bg-brand-primary text-black hover:bg-text-main hover:text-surface transition-all font-bold shadow-lg shadow-brand-primary/20"
                >
                  View My CV <FileText size={18} />
                </button>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-[40px] overflow-hidden glass p-2">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" 
                alt="Emmanuel Ayodeji" 
                className="w-full h-full object-cover rounded-[32px]"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://picsum.photos/seed/emmanuel-professional/800/800";
                }}
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-primary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-secondary/20 rounded-full blur-2xl" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass p-8 rounded-3xl"
          >
            <Code className="text-brand-primary mb-6" size={40} />
            <h3 className="text-2xl font-bold mb-4">CMS & Frontend</h3>
            <p className="text-text-muted">Building performant, scalable, and beautiful web interfaces using modern frameworks and headless CMS solutions.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass p-8 rounded-3xl"
          >
            <Rocket className="text-brand-secondary mb-6" size={40} />
            <h3 className="text-2xl font-bold mb-4">Product Management</h3>
            <p className="text-text-muted">Bridging business goals with technical execution. Strategy, roadmap, and user-centric product development.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass p-8 rounded-3xl"
          >
            <Compass className="text-brand-primary mb-6" size={40} />
            <h3 className="text-2xl font-bold mb-4">Tech4All Onboarding</h3>
            <p className="text-text-muted">Empowering non-techies to find their path. Orientation, mentorship, and simplified tech education.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TechPathFinder = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleFindPath = () => {
    if (!input.trim()) return;
    
    const lowerInput = input.toLowerCase();
    let advice: any = null;

    if (lowerInput.includes("design") || lowerInput.includes("beautiful") || lowerInput.includes("art")) {
      advice = {
        title: "UI/UX Design",
        description: "Your appreciation for aesthetics and user experience makes you a perfect fit for Design. You have a natural eye for how products should look and feel.",
        steps: "Start by mastering design tools like Figma and studying fundamental design principles such as typography, color theory, and layout.",
        learnByte: {
          course: "Product Design",
          description: "Join my Product Design class at LearnByte for hands-on mentorship and real-world projects."
        },
        resources: [
          { name: "Google UX Design Professional Certificate", url: "https://www.coursera.org/professional-certificates/google-ux-design" },
          { name: "Figma for Beginners", url: "https://www.youtube.com/results?search_query=figma+for+beginners" },
          { name: "Laws of UX", url: "https://lawsofux.com/" }
        ]
      };
    } else if (lowerInput.includes("code") || lowerInput.includes("build") || lowerInput.includes("logic")) {
      advice = {
        title: "Frontend Development",
        description: "Your interest in building functional systems and logical problem-solving aligns perfectly with Frontend Development.",
        steps: "Focus on mastering the core pillars of the web: HTML for structure, CSS for styling, and JavaScript for interactivity.",
        learnByte: {
          course: "Frontend Development",
          description: "Learn Frontend Development with me at LearnByte, where we build practical projects together."
        },
        resources: [
          { name: "FreeCodeCamp Responsive Web Design", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/" },
          { name: "MDN Web Docs", url: "https://developer.mozilla.org/" },
          { name: "JavaScript.info", url: "https://javascript.info/" }
        ]
      };
    } else if (lowerInput.includes("manage") || lowerInput.includes("team") || lowerInput.includes("strategy")) {
      advice = {
        title: "Product Management",
        description: "Your natural leadership qualities and strategic thinking are ideal for a career in Product Management.",
        steps: "Begin by exploring Agile methodologies, user research techniques, and how to define product roadmaps that align with business goals.",
        learnByte: {
          course: "Product Management",
          description: "Master Product Management at LearnByte with a curriculum focused on strategy and leadership."
        },
        resources: [
          { name: "Product School Resources", url: "https://productschool.com/resources" },
          { name: "Agile Manifesto", url: "https://agilemanifesto.org/" },
          { name: "Inspired by Marty Cagan", url: "https://www.svpg.com/books/inspired-how-to-create-tech-products-customers-love/" }
        ]
      };
    } else if (lowerInput.includes("wordpress") || lowerInput.includes("cms") || lowerInput.includes("website")) {
      advice = {
        title: "CMS & Website Development",
        description: "If you want to build professional websites quickly and efficiently, CMS development is the way to go.",
        steps: "Start by learning WordPress fundamentals, theme customization, and how to use modern CMS platforms like Snapps.",
        learnByte: {
          course: "Website Development with Wordpress",
          description: "I offer specialized classes at LearnByte on building professional websites using WordPress and other CMS tools."
        },
        resources: [
          { name: "WordPress.org Documentation", url: "https://wordpress.org/support/" },
          { name: "WPBeginner", url: "https://www.wpbeginner.com/" }
        ]
      };
    } else if (lowerInput.includes("data") || lowerInput.includes("analysis")) {
      advice = {
        title: "Data Analysis",
        description: "Your interest in data and patterns makes you a great candidate for Data Analysis.",
        steps: "Focus on learning Excel, SQL, and data visualization tools like Tableau or Power BI.",
        learnByte: {
          course: "Data Analysis",
          description: "Join our Data Analysis track at LearnByte to learn how to turn raw data into actionable insights."
        },
        resources: [
          { name: "Google Data Analytics Certificate", url: "https://www.coursera.org/professional-certificates/google-data-analytics" },
          { name: "Kaggle Learn", url: "https://www.kaggle.com/learn" }
        ]
      };
    } else if (lowerInput.includes("backend") || lowerInput.includes("server")) {
      advice = {
        title: "Backend Development",
        description: "If you enjoy working behind the scenes and managing data flow, Backend Development is for you.",
        steps: "Start by learning a server-side language like Node.js, Python, or PHP, and understand how databases work.",
        learnByte: {
          course: "Backend Development",
          description: "Learn the core of web applications in our Backend Development class at LearnByte."
        },
        resources: [
          { name: "Node.js Documentation", url: "https://nodejs.org/en/docs/" },
          { name: "MDN: Express/Node introduction", url: "https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs" }
        ]
      };
    } else if (lowerInput.includes("marketing") || lowerInput.includes("digital")) {
      advice = {
        title: "Digital Marketing",
        description: "Your interest in growth and online presence aligns with Digital Marketing.",
        steps: "Focus on SEO, Content Marketing, Social Media Strategy, and Analytics.",
        learnByte: {
          course: "Digital Marketing",
          description: "Master the art of online growth in our Digital Marketing classes at LearnByte."
        },
        resources: [
          { name: "HubSpot Academy", url: "https://academy.hubspot.com/" },
          { name: "Google Digital Garage", url: "https://learndigital.withgoogle.com/digitalgarage" }
        ]
      };
    } else {
      advice = {
        title: "Technology Exploration",
        description: "The technology landscape is vast and full of opportunities. Whether it's Data Science, Backend Engineering, or Cloud Computing, there is a place for your unique skills.",
        steps: "I recommend a personalized 1-on-1 orientation session to help identify which specific area of tech resonates most with your interests.",
        learnByte: {
          course: "General Tech Orientation",
          description: "At LearnByte, we offer classes in Product Design, Web Development, Data Analysis, and more. Let's find your fit."
        },
        resources: [
          { name: "Roadmap.sh", url: "https://roadmap.sh/" },
          { name: "CS50: Introduction to Computer Science", url: "https://pll.harvard.edu/course/cs50-introduction-computer-science" }
        ]
      };
    }

    setResult(advice);
  };

  return (
    <section id="tech4all" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Tech4All <span className="text-brand-primary">Onboarding</span></h2>
          <p className="text-text-muted text-lg">Lost in the tech multiverse? Share your interests, and I will help you navigate your professional journey.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass p-8 rounded-3xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Compass size={120} />
          </div>
          
          <div className="relative z-10">
            <motion.label 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="block text-sm font-mono text-brand-primary uppercase tracking-widest mb-4"
            >
              What are your interests? (e.g., design, logic, data, managing teams)
            </motion.label>
            <div className="flex flex-col md:flex-row gap-4">
              <motion.input 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="I enjoy solving complex problems and creating intuitive designs..."
                className="flex-1 bg-surface border border-border-subtle rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-colors text-text-main"
              />
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                onClick={handleFindPath}
                className="px-8 py-4 rounded-2xl bg-brand-primary text-black font-bold hover:bg-text-main hover:text-surface transition-all"
              >
                Find My Path
              </motion.button>
            </div>

            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 p-8 rounded-2xl bg-surface border border-border-subtle text-text-main"
              >
                <h3 className="text-2xl font-bold mb-4 text-brand-primary">Recommended Path: {result.title}</h3>
                <p className="text-lg mb-6 leading-relaxed">{result.description}</p>
                <div className="mb-8 p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <Rocket size={18} className="text-brand-secondary" /> Next Steps
                  </h4>
                  <p className="text-text-muted text-sm">{result.steps}</p>
                </div>

                {result.learnByte && (
                  <div className="mb-8 p-6 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                      <Star size={60} className="text-brand-primary" />
                    </div>
                    <h4 className="font-bold mb-2 flex items-center gap-2 text-brand-primary">
                      <Star size={18} /> Learn with me at LearnByte
                    </h4>
                    <p className="text-text-main font-medium mb-2">Course: {result.learnByte.course}</p>
                    <p className="text-text-muted text-sm mb-4">{result.learnByte.description}</p>
                    <a 
                      href="https://learnbytee.netlify.app/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary hover:underline"
                    >
                      Enroll at LearnByte <ExternalLink size={14} />
                    </a>
                  </div>
                )}
                
                <div>
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <Star size={18} className="text-brand-primary" /> Other Learning Resources
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {result.resources.map((res: any, i: number) => (
                      <a 
                        key={i}
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-xl bg-surface border border-border-subtle hover:border-brand-primary transition-all group"
                      >
                        <span className="text-sm font-medium">{res.name}</span>
                        <ExternalLink size={14} className="text-text-muted group-hover:text-brand-primary transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Toolbox = () => {
  const categories = [
    {
      title: "Product Management",
      tools: [
        { name: "Trello", slug: "trello" },
        { name: "Linear", slug: "linear" },
        { name: "Wrike", slug: "wrike" },
        { name: "Jira", slug: "jira" },
        { name: "Slack", slug: "slack" },
        { name: "Discord", slug: "discord" }
      ],
      color: "text-brand-secondary"
    },
    {
      title: "CMS Development",
      tools: [
        { name: "WordPress", slug: "wordpress" },
        { name: "Wix", slug: "wix" },
        { name: "Snapps", slug: "webflow" }, 
        { name: "GoDaddy", slug: "godaddy" },
        { name: "Framer", slug: "framer" },
        { name: "Figma", slug: "figma" }
      ],
      color: "text-brand-primary"
    },
    {
      title: "Frontend Development",
      tools: [
        { name: "HTML", slug: "html5" },
        { name: "CSS3", slug: "CSS3" },
        { name: "JavaScript", slug: "javascript" },
        { name: "ES6", slug: "javascript" },
        { name: "React", slug: "react" },
        { name: "TypeScript", slug: "typescript" },
        { name: "Next.js", slug: "nextdotjs" },
        { name: "Supabase", slug: "supabase" },
        { name: "Firebase", slug: "firebase" },
        { name: "Tailwind", slug: "tailwindcss" },
        { name: "Git", slug: "git" },
        { name: "GitHub", slug: "github" }
      ],
      color: "text-text-main"
    }
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">My <span className="text-gradient">Toolbox</span></h2>
          <p className="text-text-muted text-lg">The languages and platforms I use to bring multiverses to life.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-8 rounded-3xl"
            >
              <h3 className={cn("text-xl font-bold mb-6", cat.color)}>{cat.title}</h3>
              <div className="flex flex-wrap gap-3">
                {cat.tools.map((tool, tIdx) => (
                  <motion.div 
                    key={tIdx}
                    whileHover={{ 
                      scale: 1.1, 
                      backgroundColor: "rgba(255,255,255,0.15)",
                      boxShadow: "0 0 20px rgba(0,255,148,0.2)"
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface border border-border-subtle transition-all cursor-default group"
                  >
                    <div className="w-4 h-4 flex items-center justify-center group-hover:rotate-12 transition-transform">
                      <img 
                        src={`https://cdn.simpleicons.org/${tool.slug}`} 
                        alt={tool.name}
                        className="w-full h-full object-contain dark:invert"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            const icon = document.createElement('div');
                            icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20"/><path d="M2 12h20"/></svg>';
                            icon.className = "text-text-muted";
                            parent.appendChild(icon);
                          }
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium group-hover:text-brand-primary transition-colors">{tool.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectModal = ({ project, isOpen, onClose }: { project: any; isOpen: boolean; onClose: () => void }) => {
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="glass w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[40px] relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 rounded-full bg-surface/50 hover:bg-surface text-text-main transition-colors z-10"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-12">
            <div className="space-y-6">
              <div className="aspect-video rounded-3xl overflow-hidden border border-white/10">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-surface border border-border-subtle text-text-muted text-[10px] font-bold uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-mono text-brand-primary uppercase tracking-widest mb-2 block">
                {project.category}
              </span>
              <h3 id="modal-title" className="text-3xl font-bold mb-6">{project.title}</h3>
              <div className="space-y-4 text-text-muted leading-relaxed mb-8">
                <p>{project.description}</p>
                {project.longDescription && <p>{project.longDescription}</p>}
              </div>

              <div className="mt-auto flex flex-wrap gap-4">
                {project.liveUrl && project.liveUrl !== "#" && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 rounded-full bg-brand-primary text-black font-bold flex items-center gap-2 hover:bg-text-main hover:text-surface transition-all"
                  >
                    Live Preview <ExternalLink size={18} />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 rounded-full bg-surface border border-border-subtle text-text-main font-bold hover:border-brand-primary transition-all flex items-center gap-2"
                  >
                    GitHub Repo <Github size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const categories = ["All", "Frontend development", "CMS", "Product Management", "Community building"];

  const projects = [
    {
      title: "CoilSkin E-commerce",
      category: "Frontend development",
      image: "https://picsum.photos/seed/skincare/800/600",
      description: "A comprehensive skincare and haircare organization platform. I developed the React-based web presence and am currently leading the engineering of their full-scale e-commerce solution.",
      longDescription: "CoilSkin is a dedicated platform designed to simplify skincare and haircare routines. I spearheaded the frontend development using React and am currently overseeing the transition into a full-scale e-commerce solution, focusing on performance, scalability, and an intuitive user experience.",
      tags: ["React", "E-commerce", "Team Management"],
      liveUrl: "https://coilskin.vercel.app/",
      githubUrl: "https://github.com/emmahdev"
    },
    {
      title: "LearnByte EdTech",
      category: "Community building",
      image: "https://picsum.photos/seed/education/800/600",
      description: "Founder and Technical Lead of LearnByte, an educational initiative dedicated to simplifying technical concepts through practical, community-driven project work.",
      longDescription: "LearnByte is a community-first initiative aimed at bridging the gap between theoretical knowledge and practical application. As the founder, I lead a team of passionate developers and designers to create real-world projects that empower students to build professional-grade portfolios.",
      tags: ["EdTech", "Leadership", "Community"],
      liveUrl: "https://learnbytee.netlify.app/",
      githubUrl: "https://github.com/emmahdev"
    },
    {
      title: "Hospiyou Tele-Medicine",
      category: "Frontend development",
      image: "https://picsum.photos/seed/medical/800/600",
      description: "Developing responsive user interfaces for an AI-powered tele-medical corporation focused on expanding access to quality healthcare.",
      longDescription: "Hospiyou is at the forefront of tele-medicine, utilizing data and AI to provide accessible healthcare. My role involves crafting highly responsive and accessible user interfaces that ensure patients can seamlessly navigate medical consultations and health data.",
      tags: ["React", "UI/UX", "Tele-Health"],
      liveUrl: "https://www.hospiyou.com/",
      githubUrl: "https://github.com/emmahdev"
    },
    {
      title: "GrundPay Real Estate",
      category: "Product Management",
      image: "https://picsum.photos/seed/realestate/800/600",
      description: "Product Manager at GrundPay, where I lead product strategy and define the roadmap for innovative real estate technology solutions.",
      longDescription: "At GrundPay, I manage the end-to-end product lifecycle, from initial ideation to market launch. I collaborate closely with stakeholders to define core requirements, prioritize feature development, and ensure our real estate solutions effectively address market demands.",
      tags: ["Product Strategy", "Real Estate", "Agile"],
      liveUrl: "http://www.grundpay.com"
    },
    {
      title: "GDG FUOYE Community",
      category: "Community building",
      image: "https://picsum.photos/seed/google/800/600",
      description: "Frontend Lead for Google Developer Group FUOYE, where I mentor developers and foster technical growth through collaborative projects.",
      longDescription: "As the Frontend Lead for GDG FUOYE, I provide mentorship to aspiring developers and facilitate workshops on modern web technologies. I am dedicated to building a collaborative environment where community members can enhance their technical expertise through shared learning and development.",
      tags: ["Mentorship", "Frontend", "Google Devs"],
      liveUrl: "https://gdg.community.dev/"
    },
    {
      title: "Kate Marketing CMS",
      category: "CMS",
      image: "https://picsum.photos/seed/marketing/800/600",
      description: "Specializing in the development of high-performance marketing websites using WordPress, Snapps, and other leading CMS platforms.",
      longDescription: "I focus on engineering high-converting marketing websites tailored for agency needs. By utilizing versatile CMS platforms like WordPress and Snapps, I deliver scalable, manageable solutions that help businesses establish a powerful and professional online presence.",
      tags: ["WordPress", "Snapps", "CMS"],
      liveUrl: "#"
    }
  ];

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 px-6 bg-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Recent <span className="text-brand-secondary">Works</span></h2>
            <p className="text-text-muted text-lg max-w-md">A selection of projects where I've blended code, strategy, and empathy.</p>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                aria-pressed={filter === cat}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border",
                  filter === cat 
                    ? "bg-brand-primary text-black border-brand-primary" 
                    : "bg-transparent text-white/60 border-white/10 hover:border-white/30"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, idx) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={project.title}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedProject(project)}
              className="group glass rounded-3xl overflow-hidden flex flex-col cursor-pointer"
            >
              <div className="aspect-video overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <span className="text-white font-bold text-sm uppercase tracking-widest">View Details</span>
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-6 py-2 rounded-full bg-brand-primary text-black font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform"
                      >
                        Live Demo <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <span className="text-xs font-mono text-brand-primary uppercase tracking-widest mb-2 block">{project.category}</span>
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-text-muted text-sm mb-6 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-surface border border-border-subtle text-text-muted text-[10px] font-bold uppercase tracking-wider">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};

const Reviews = () => {
  const reviews = [
    {
      name: "Sarah Jenkins",
      role: "CEO, TechStart",
      text: "Emmanuel didn't just build our site; he built our strategy. His dual role as PM and Developer is a superpower.",
      avatar: "https://i.pravatar.cc/150?u=sarah"
    },
    {
      name: "David Chen",
      role: "Newbie Graduate",
      text: "The Tech4All orientation changed my life. I went from lost to a Junior Frontend Dev in 6 months thanks to his guidance.",
      avatar: "https://i.pravatar.cc/150?u=david"
    },
    {
      name: "Elena Rodriguez",
      role: "Product Lead",
      text: "Incredible eye for detail and a deep understanding of user needs. A rare find in the tech world.",
      avatar: "https://i.pravatar.cc/150?u=elena"
    }
  ];

  return (
    <section id="reviews" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Multiverse <span className="text-brand-primary">Voices</span></h2>
          <p className="text-text-muted text-lg">What people say about our collaborations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="glass p-8 rounded-3xl relative bg-surface border-border-subtle">
              <div className="absolute -top-4 -left-4 text-brand-primary opacity-20">
                <Star size={64} fill="currentColor" />
              </div>
              <p className="text-lg italic mb-8 relative z-10 text-text-main">"{review.text}"</p>
              <div className="flex items-center gap-4">
                <img 
                  src={review.avatar} 
                  alt={review.name} 
                  className="w-12 h-12 rounded-full border-2 border-brand-primary" 
                  loading="lazy"
                  referrerPolicy="no-referrer" 
                />
                <div>
                  <h4 className="font-bold text-text-main">{review.name}</h4>
                  <p className="text-xs text-text-muted">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const email = "emmanuelayodeji515@gmail.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: "POST",
        body: formData,
      });
      
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setError("Something went wrong. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-brand-secondary/5">
      <div className="max-w-5xl mx-auto glass p-8 md:p-12 rounded-[40px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-[100px] -mr-32 -mt-32" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's <span className="text-gradient">Connect</span></h2>
            <p className="text-text-muted text-lg mb-10">Ready to start your next project or need tech orientation? Drop a message in the multiverse.</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 group cursor-pointer" onClick={copyToClipboard}>
                <div className="p-3 rounded-xl bg-surface border border-border-subtle text-brand-primary group-hover:bg-brand-primary group-hover:text-black transition-all">
                  <Mail size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-base md:text-lg font-medium break-all text-text-main">{email}</span>
                  <span className="text-xs text-text-muted flex items-center gap-1">
                    {copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Click to copy</>}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <a href="https://github.com/Ayodeji515" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-brand-primary transition-colors"><Github size={28} /></a>
                <a href="https://www.linkedin.com/in/ayodeji-emmanuel-b39756250/" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-brand-primary transition-colors"><Linkedin size={28} /></a>
                <a href="https://x.com/emmahdev?s=21" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-brand-primary transition-colors">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="relative min-h-[400px]">
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-surface rounded-3xl border border-border-subtle"
              >
                <div className="w-20 h-20 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary mb-6">
                  <Check size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-text-main">Message Received!</h3>
                <p className="text-text-muted mb-8">Thank you for reaching out. I'll get back to you as soon as possible in the multiverse.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="px-8 py-3 rounded-xl bg-brand-primary/10 hover:bg-brand-primary/20 text-text-main transition-colors font-bold"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form 
                className="space-y-4" 
                onSubmit={handleSubmit}
              >
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-3"
                  >
                    <AlertCircle size={18} />
                    {error}
                  </motion.div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" name="name" required placeholder="Name" className="w-full bg-surface border border-border-subtle rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-colors text-text-main" />
                  <input type="email" name="email" required placeholder="Email" className="w-full bg-surface border border-border-subtle rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-colors text-text-main" />
                </div>
                <input type="text" name="subject" placeholder="Subject" className="w-full bg-surface border border-border-subtle rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-colors text-text-main" />
                <textarea name="message" required placeholder="Message" rows={4} className="w-full bg-surface border border-border-subtle rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-colors resize-none text-text-main"></textarea>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-brand-primary text-black font-bold hover:bg-text-main hover:text-surface transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"} <Send size={20} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-16 px-6 border-t border-border-subtle">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        <div className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-black font-bold text-lg shadow-lg shadow-brand-primary/20">
            E
          </div>
          <span className="text-xl font-display font-bold text-gradient">EMMANUEL.</span>
        </div>
        <div className="flex items-center gap-6">
          <a 
            href="https://github.com/Ayodeji515" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-surface border border-border-subtle text-text-muted hover:text-brand-primary hover:border-brand-primary transition-all"
          >
            <Github size={24} />
          </a>
          <a 
            href="https://www.linkedin.com/in/ayodeji-emmanuel-b39756250/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-surface border border-border-subtle text-text-muted hover:text-brand-primary hover:border-brand-primary transition-all"
          >
            <Linkedin size={24} />
          </a>
          <a 
            href="https://x.com/emmahdev?s=21" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-surface border border-border-subtle text-text-muted hover:text-brand-primary hover:border-brand-primary transition-all"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
            </svg>
          </a>
        </div>
        <p className="text-text-muted text-sm text-center">
          © {new Date().getFullYear()} Emmanuel. Built with passion in the Digital Multiverse.
        </p>
      </div>
    </footer>
  );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[60] p-4 rounded-full bg-brand-primary text-black shadow-2xl shadow-brand-primary/20 hover:bg-text-main hover:text-surface transition-all group"
          aria-label="Scroll to top"
        >
          <ChevronUp className="group-hover:-translate-y-1 transition-transform" size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const MotionDesign = () => {
  const { scrollYProgress } = useScroll();
  
  // Create multiple transforms for different elements
  const y1 = useTransform(scrollYProgress, [0, 0.5, 1], [0, 200, 0]);
  const y2 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, -150, 150, 0]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.1, 0.3, 0.3, 0.1]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating Gradient Orbs that follow scroll and "stagnate" in their movement range */}
      <motion.div 
        style={{ y: y1, scale: scale1, opacity: opacity1 }}
        className="absolute top-[10%] -left-[10%] w-[40vw] h-[40vw] bg-brand-primary/5 rounded-full blur-[120px]"
      />
      <motion.div 
        style={{ y: y2, rotate: rotate1, opacity: opacity1 }}
        className="absolute top-[40%] -right-[10%] w-[35vw] h-[35vw] bg-brand-secondary/5 rounded-full blur-[100px]"
      />
      <motion.div 
        style={{ y: y1, x: y2, opacity: opacity1 }}
        className="absolute bottom-[10%] left-[20%] w-[30vw] h-[30vw] bg-brand-primary/5 rounded-full blur-[110px]"
      />
      
      {/* Geometric shapes that follow scroll */}
      <motion.div 
        style={{ y: y2, rotate: rotate1 }}
        className="absolute top-[20%] right-[15%] w-32 h-32 border border-brand-primary/10 rounded-3xl hidden md:block"
      />
      <motion.div 
        style={{ y: y1, rotate: -rotate1 }}
        className="absolute bottom-[30%] left-[10%] w-24 h-24 border border-brand-secondary/10 rounded-full hidden md:block"
      />
    </div>
  );
};

export default function App() {
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.className = savedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.className = newTheme;
  };

  return (
    <div className="min-h-screen relative">
      <MotionDesign />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <AboutMe onOpenCV={() => setIsCVOpen(true)} />
      <TechPathFinder />
      <Toolbox />
      <Projects />
      <Reviews />
      <Contact />
      <Footer />

      <ScrollToTop />
      <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
    </div>
  );
}
