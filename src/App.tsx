import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Menu, X, Github, Linkedin, Twitter, Mail, Code, Rocket, Compass, Star, Send } from "lucide-react";
import { cn } from "./utils";
import { getTechPathAdvice } from "./services/gemini";
import ReactMarkdown from "react-markdown";

// --- Components ---

const Navbar = () => {
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
      scrolled ? "bg-bg-dark/80 backdrop-blur-md border-b border-white/10 py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.a 
          href="#" 
          className="text-2xl font-display font-bold text-gradient"
          whileHover={{ scale: 1.05 }}
        >
          EMMANUEL.
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium hover:text-brand-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="px-5 py-2 rounded-full bg-brand-primary text-black font-semibold text-sm hover:bg-white transition-colors"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-bg-dark border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
        >
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium hover:text-brand-primary"
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background 3D-like elements */}
      <motion.div 
        style={{ y }}
        className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-primary/10 rounded-full blur-[120px]"
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-secondary/10 rounded-full blur-[120px]"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-mono uppercase tracking-widest text-brand-primary mb-6">
            CMS & Frontend Developer • Product Manager
          </span>
          <h1 className="text-6xl md:text-8xl font-display font-bold mb-8 leading-[1.1]">
            Crafting <span className="text-gradient italic">Digital</span> Multiverses.
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Bridging the gap between design, code, and strategy. Helping businesses scale and newbies find their path in tech.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#projects" 
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-brand-primary transition-all transform hover:scale-105"
            >
              View Projects
            </a>
            <a 
              href="#tech4all" 
              className="w-full sm:w-auto px-8 py-4 rounded-full glass font-bold hover:bg-white/10 transition-all"
            >
              Tech Orientation
            </a>
          </div>
        </motion.div>
      </div>

      {/* Floating Icons */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-1/3 left-10 md:left-40 p-4 glass rounded-2xl hidden lg:block"
      >
        <Code className="text-brand-primary" size={32} />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute bottom-1/3 right-10 md:right-40 p-4 glass rounded-2xl hidden lg:block"
      >
        <Rocket className="text-brand-secondary" size={32} />
      </motion.div>
    </section>
  );
};

const TechPathFinder = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFindPath = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const advice = await getTechPathAdvice(input);
    setResult(advice);
    setLoading(false);
  };

  return (
    <section id="tech4all" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Tech4All <span className="text-brand-primary">Onboarding</span></h2>
          <p className="text-white/60 text-lg">Lost in the tech multiverse? Tell me what you enjoy, and I'll help you find your path.</p>
        </div>

        <div className="glass p-8 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Compass size={120} />
          </div>
          
          <div className="relative z-10">
            <label className="block text-sm font-mono text-brand-primary uppercase tracking-widest mb-4">What are your interests? (e.g., design, logic, data, managing teams)</label>
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="I love solving puzzles and making things look beautiful..."
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-colors"
              />
              <button 
                onClick={handleFindPath}
                disabled={loading}
                className="px-8 py-4 rounded-2xl bg-brand-primary text-black font-bold hover:bg-white transition-all disabled:opacity-50"
              >
                {loading ? "Discovering..." : "Find My Path"}
              </button>
            </div>

            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 prose prose-invert max-w-none"
              >
                <ReactMarkdown>{result}</ReactMarkdown>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Multiverse",
      category: "Frontend & CMS",
      image: "https://picsum.photos/seed/shop/800/600",
      description: "A headless CMS integration with a high-performance React frontend.",
      tags: ["Next.js", "Sanity", "Tailwind"]
    },
    {
      title: "Product Roadmap Tool",
      category: "Product Management",
      image: "https://picsum.photos/seed/pm/800/600",
      description: "Strategic planning tool for agile teams to visualize product growth.",
      tags: ["Strategy", "UX Design", "React"]
    },
    {
      title: "Tech4All Portal",
      category: "Community",
      image: "https://picsum.photos/seed/community/800/600",
      description: "A platform dedicated to onboarding non-techies into the ecosystem.",
      tags: ["Education", "Web3", "UI/UX"]
    }
  ];

  return (
    <section id="projects" className="py-24 px-6 bg-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Recent <span className="text-brand-secondary">Works</span></h2>
            <p className="text-white/60 text-lg max-w-md">A selection of projects where I've blended code, strategy, and empathy.</p>
          </div>
          <a href="#" className="text-brand-primary font-mono text-sm uppercase tracking-widest hover:underline">View All Projects →</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="group glass rounded-3xl overflow-hidden"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-mono text-brand-primary uppercase tracking-widest mb-2 block">{project.category}</span>
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-white/60 text-sm mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold uppercase tracking-wider">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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
          <p className="text-white/60 text-lg">What people say about our collaborations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="glass p-8 rounded-3xl relative">
              <div className="absolute -top-4 -left-4 text-brand-primary opacity-20">
                <Star size={64} fill="currentColor" />
              </div>
              <p className="text-lg italic mb-8 relative z-10">"{review.text}"</p>
              <div className="flex items-center gap-4">
                <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full border-2 border-brand-primary" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="font-bold">{review.name}</h4>
                  <p className="text-xs text-white/40">{review.role}</p>
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
  return (
    <section id="contact" className="py-24 px-6 bg-brand-secondary/5">
      <div className="max-w-5xl mx-auto glass p-12 rounded-[40px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-[100px] -mr-32 -mt-32" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
          <div>
            <h2 className="text-5xl font-bold mb-6">Let's <span className="text-gradient">Connect</span></h2>
            <p className="text-white/60 text-lg mb-10">Ready to start your next project or need tech orientation? Drop a message in the multiverse.</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white/5 text-brand-primary">
                  <Mail size={24} />
                </div>
                <span className="text-lg">hello@emmanuel.dev</span>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <a href="#" className="text-white/40 hover:text-brand-primary transition-colors"><Github size={28} /></a>
                <a href="#" className="text-white/40 hover:text-brand-primary transition-colors"><Linkedin size={28} /></a>
                <a href="#" className="text-white/40 hover:text-brand-primary transition-colors"><Twitter size={28} /></a>
              </div>
            </div>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Name" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-colors" />
              <input type="email" placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-colors" />
            </div>
            <input type="text" placeholder="Subject" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-colors" />
            <textarea placeholder="Message" rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-colors resize-none"></textarea>
            <button className="w-full py-4 rounded-2xl bg-brand-primary text-black font-bold hover:bg-white transition-all flex items-center justify-center gap-2">
              Send Message <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/10 text-center">
      <p className="text-white/40 text-sm">© {new Date().getFullYear()} Emmanuel. Built with passion in the Digital Multiverse.</p>
    </footer>
  );
};

export default function App() {
  return (
    <div className="bg-bg-dark min-h-screen selection:bg-brand-primary selection:text-black">
      <Navbar />
      <Hero />
      <div id="about" className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass p-8 rounded-3xl">
            <Code className="text-brand-primary mb-6" size={40} />
            <h3 className="text-2xl font-bold mb-4">CMS & Frontend</h3>
            <p className="text-white/60">Building performant, scalable, and beautiful web interfaces using modern frameworks and headless CMS solutions.</p>
          </div>
          <div className="glass p-8 rounded-3xl">
            <Rocket className="text-brand-secondary mb-6" size={40} />
            <h3 className="text-2xl font-bold mb-4">Product Management</h3>
            <p className="text-white/60">Bridging business goals with technical execution. Strategy, roadmap, and user-centric product development.</p>
          </div>
          <div className="glass p-8 rounded-3xl">
            <Compass className="text-brand-primary mb-6" size={40} />
            <h3 className="text-2xl font-bold mb-4">Tech4All Onboarding</h3>
            <p className="text-white/60">Empowering non-techies to find their path. Orientation, mentorship, and simplified tech education.</p>
          </div>
        </div>
      </div>
      <TechPathFinder />
      <Projects />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  );
}
