import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Menu, X, Github, Linkedin, Mail, Code, Rocket, Compass, Star, Send, ExternalLink, Copy, Check, FileText, Briefcase, ChevronRight, Sun, Moon, AlertCircle, Download, Loader2 } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { cn } from "./utils";

// --- Components ---

const CVModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const cvRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleDownload = async () => {
    const cvElement = document.getElementById('cv-printable-content');
    if (!cvElement) return;
    setIsDownloading(true);

    try {
      const canvas = await html2canvas(cvElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        onclone: (clonedDoc) => {
          const el = clonedDoc.getElementById('cv-printable-content');
          if (el) {
            el.style.backgroundColor = '#ffffff';
            el.style.color = '#000000';
            el.style.padding = '40px';
            el.style.width = '800px';
            // Force all text to be black for the PDF
            const allText = el.querySelectorAll('*');
            allText.forEach((node) => {
              if (node instanceof HTMLElement) {
                node.style.color = '#000000';
                node.style.borderColor = '#eeeeee';
              }
            });
          }
        }
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const scaledHeight = (imgHeight * pdfWidth) / imgWidth;
      
      // Page 1: Top half
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, scaledHeight);
      
      // Page 2: Bottom half
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, -pdfHeight, pdfWidth, scaledHeight);

      pdf.save("Emmanuel_Ayodeji_CV.pdf");
    } catch (err) {
      console.error("PDF generation error:", err);
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

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
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary text-black font-bold hover:bg-text-main hover:text-surface transition-all disabled:opacity-50"
          >
            {isDownloading ? (
              <>Generating... <Loader2 size={18} className="animate-spin" /></>
            ) : (
              <>Download PDF <Download size={18} /></>
            )}
          </button>
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
          className="text-2xl font-display font-bold text-gradient"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          EMMANUEL.
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
                Spearheaded product roadmaps for startups like GrundPay, achieving a **30% increase in user engagement** through data-driven UI optimizations and agile leadership.
              </p>
            </div>
            <div className="glass p-6 rounded-3xl border-l-4 border-brand-secondary">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Compass className="text-brand-secondary" size={20} /> Tech4All Onboarding
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Successfully oriented **over 500+ non-tech individuals** into the ecosystem, simplifying complex concepts and fostering a inclusive learning environment at LearnByte.
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
                As a hybrid professional, I wear multiple hats: a **CMS & Frontend Developer**, a **Product Manager**, and a **Tech4All Onboarding Specialist**. My journey is fueled by a passion for creating digital solutions that are not only functional but also strategically sound and accessible to everyone.
              </p>
              
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-6"
                >
                  <p>
                    In the world of development, I specialize in building high-performance frontends and seamless CMS integrations. As a Product Manager, I focus on the "why" behind every feature, ensuring that technical execution aligns with business goals and user needs.
                  </p>
                  <p>
                    Beyond the code and strategy, I am deeply committed to **Tech4All**. I believe tech should be inclusive, which is why I dedicate time to onboarding and orienting newcomers, helping them discover their unique path in this vast multiverse.
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
                src="https://ais-dev-oxxbkeeyku3z2ca4pu5sbm-466415373403.europe-west2.run.app/api/files/67c3969747970d24172776" 
                alt="Emmanuel" 
                className="w-full h-full object-cover rounded-[32px]"
                loading="lazy"
                referrerPolicy="no-referrer"
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
  const [result, setResult] = useState("");

  const handleFindPath = () => {
    if (!input.trim()) return;
    
    const lowerInput = input.toLowerCase();
    let advice = "";

    if (lowerInput.includes("design") || lowerInput.includes("beautiful") || lowerInput.includes("art")) {
      advice = "### Recommended Path: UI/UX Design\n\nYour love for aesthetics and user experience makes you a perfect fit for Design. Start by learning Figma and basic design principles.";
    } else if (lowerInput.includes("code") || lowerInput.includes("build") || lowerInput.includes("logic")) {
      advice = "### Recommended Path: Frontend Development\n\nSince you enjoy building things and logic, Frontend Development is a great start. Focus on HTML, CSS, and JavaScript.";
    } else if (lowerInput.includes("manage") || lowerInput.includes("team") || lowerInput.includes("strategy")) {
      advice = "### Recommended Path: Product Management\n\nYour interest in leadership and strategy aligns perfectly with Product Management. Start by learning about Agile methodologies and user research.";
    } else {
      advice = "### Let's Explore Together!\n\nTech is vast! Whether it's Data, Backend, or Cloud, there's a place for you. Reach out to me for a personalized 1-on-1 orientation.";
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
          <p className="text-text-muted text-lg">Lost in the tech multiverse? Tell me what you enjoy, and I'll help you find your path.</p>
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
                placeholder="I love solving puzzles and making things look beautiful..."
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
                className="mt-12 p-6 rounded-2xl bg-surface border border-border-subtle prose prose-invert dark:prose-invert max-w-none text-text-main"
              >
                <div className="whitespace-pre-wrap">{result}</div>
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
        { name: "CSS3", slug: "css3" },
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

const Projects = () => {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Frontend development", "CMS", "Product Management", "Community building"];

  const projects = [
    {
      title: "CoilSkin E-commerce",
      category: "Frontend development",
      image: "https://picsum.photos/seed/skincare/800/600",
      description: "A comprehensive skincare and haircare organization platform. Developed the React website and currently leading the E-commerce web app development.",
      tags: ["React", "E-commerce", "Team Management"],
      liveUrl: "https://coilskin.vercel.app/"
    },
    {
      title: "LearnByte EdTech",
      category: "Community building",
      image: "https://picsum.photos/seed/education/800/600",
      description: "Founder & Team Lead of LearnByte, a startup making tech learning simple and practical through community-driven projects.",
      tags: ["EdTech", "Leadership", "Community"],
      liveUrl: "https://learnbytee.netlify.app/"
    },
    {
      title: "Hospiyou Tele-Medicine",
      category: "Frontend development",
      image: "https://picsum.photos/seed/medical/800/600",
      description: "Building responsive user interfaces for an AI-Data Powered Tele-Medical Corporation focused on quality healthcare access.",
      tags: ["React", "UI/UX", "Tele-Health"],
      liveUrl: "https://www.hospiyou.com/"
    },
    {
      title: "GrundPay Real Estate",
      category: "Product Management",
      image: "https://picsum.photos/seed/realestate/800/600",
      description: "Product Manager at GrundPay, overseeing product strategy and roadmap for innovative real estate solutions.",
      tags: ["Product Strategy", "Real Estate", "Agile"],
      liveUrl: "http://www.grundpay.com"
    },
    {
      title: "GDG FUOYE Community",
      category: "Community building",
      image: "https://picsum.photos/seed/google/800/600",
      description: "Frontend Lead at GDG FUOYE, guiding developers in modern tools and fostering technical growth through community projects.",
      tags: ["Mentorship", "Frontend", "Google Devs"],
      liveUrl: "https://gdg.community.dev/"
    },
    {
      title: "Kate Marketing CMS",
      category: "CMS",
      image: "https://picsum.photos/seed/marketing/800/600",
      description: "Developing professional marketing agency websites using WordPress, Snapps, and various CMS platforms.",
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
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
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
              className="group glass rounded-3xl overflow-hidden flex flex-col"
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
                  <a 
                    href={project.liveUrl || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-2 rounded-full bg-brand-primary text-black font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform"
                  >
                    Live Demo <ExternalLink size={16} />
                  </a>
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
    <div className="min-h-screen">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <AboutMe onOpenCV={() => setIsCVOpen(true)} />
      <TechPathFinder />
      <Toolbox />
      <Projects />
      <Reviews />
      <Contact />
      <Footer />

      <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
    </div>
  );
}
