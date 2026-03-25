/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ParticleLogo from './components/ParticleLogo';
import Header from './components/Header';
import Footer from './components/Footer';
import ProjectModal, { Project } from './components/ProjectModal';
import AnimatedCounter from './components/AnimatedCounter';
import TermsAndConditions from './components/TermsAndConditions';
import PrivacyPolicy from './components/PrivacyPolicy';
import RefundPolicy from './components/RefundPolicy';
import CancellationPolicy from './components/CancellationPolicy';
import PromotionsTerms from './components/PromotionsTerms';
import SecurityPolicy from './components/SecurityPolicy';
import ContactPage from './components/ContactPage';
import BlogPostPage from './components/BlogPostPage';
import { ArrowDown, Globe, Smartphone, MessageSquare, CheckCircle2, ArrowRight, CalendarDays } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'motion/react';

function HomePage() {
  const { t, i18n } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const aboutRef = useRef<HTMLElement>(null);
  const { scrollYProgress: aboutScroll } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  });
  const aboutY = useTransform(aboutScroll, [0, 1], [100, -100]);

  const servicesRef = useRef<HTMLElement>(null);
  const { scrollYProgress: servicesScroll } = useScroll({
    target: servicesRef,
    offset: ["start end", "end start"]
  });
  const servicesY = useTransform(servicesScroll, [0, 1], [100, -100]);

  const projects: Project[] = [
    { id: 1, title: t('projects.1.title'), category: t('projects.1.category'), image: 'https://picsum.photos/seed/sarab1/800/600', description: t('projects.1.desc') },
    { id: 2, title: t('projects.2.title'), category: t('projects.2.category'), image: 'https://picsum.photos/seed/sarab2/800/600', description: t('projects.2.desc') },
    { id: 3, title: t('projects.3.title'), category: t('projects.3.category'), image: 'https://picsum.photos/seed/sarab3/800/600', description: t('projects.3.desc') },
    { id: 4, title: t('projects.4.title'), category: t('projects.4.category'), image: 'https://picsum.photos/seed/sarab4/800/600', description: t('projects.4.desc') }
  ];

  const blogPosts = [
    {
      id: 1,
      slug: '1',
      category: t('blog.posts.1.category'),
      date: t('blog.posts.1.date'),
      title: t('blog.posts.1.title'),
      excerpt: t('blog.posts.1.excerpt'),
    },
    {
      id: 2,
      slug: '2',
      category: t('blog.posts.2.category'),
      date: t('blog.posts.2.date'),
      title: t('blog.posts.2.title'),
      excerpt: t('blog.posts.2.excerpt'),
    },
    {
      id: 3,
      slug: '3',
      category: t('blog.posts.3.category'),
      date: t('blog.posts.3.date'),
      title: t('blog.posts.3.title'),
      excerpt: t('blog.posts.3.excerpt'),
    }
  ];

  return (
    <div className="page-shell min-h-screen font-sans selection:bg-cyan-500/30" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <Header />
      
      {/* Background Glow */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="theme-glow-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] animate-pulse"></div>
        <div className="theme-glow-secondary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <ParticleLogo />

      {/* Hero Section */}
      <section id="home" className="h-screen flex flex-col items-center justify-center relative z-20 pointer-events-none">
        {/* The logo is drawn by the canvas in the center here */}
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-32 text-center pointer-events-auto px-6"
        >
          <p className="soft-text text-lg md:text-2xl font-light tracking-wide max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="hero-scroll absolute bottom-12 flex flex-col items-center animate-bounce pointer-events-auto cursor-pointer"
          onClick={() => document.getElementById('about-us')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-sm uppercase tracking-widest mb-2">{t('hero.scroll')}</span>
          <ArrowDown size={20} />
        </motion.div>
      </section>

      {/* Middle Section 1: About Us */}
      <section id="about-us" ref={aboutRef} className="min-h-screen flex items-center relative z-20 py-24">
        <motion.div 
          style={{ y: aboutY }}
          className="glass-panel max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center backdrop-blur-sm p-8 md:p-12 rounded-3xl border"
        >
          <div className="space-y-6">
            <h3 className="text-cyan-400 font-semibold tracking-wider uppercase text-sm">{t('about.subtitle')}</h3>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              {t('about.title_1')} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{t('about.title_2')}</span>
            </h2>
            <p className="muted-text text-lg leading-relaxed">
              {t('about.desc')}
            </p>
          </div>
          <motion.div 
            className="space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.3 } },
              hidden: {}
            }}
          >
            {[
              t('about.point_1'),
              t('about.point_2'),
              t('about.point_3')
            ].map((point, i) => (
              <motion.div 
                key={i}
                variants={{ 
                  hidden: { opacity: 0, y: 20 }, 
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } 
                }} 
                className="flex gap-4"
              >
                <CheckCircle2 className="text-cyan-400 shrink-0 mt-1" />
                <p className="soft-text">{point}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Middle Section 2: Our Customers Logo Slider */}
      <section className="subtle-section py-24 relative z-20 overflow-hidden backdrop-blur-sm border-y">
        <div className="max-w-6xl mx-auto px-6 mb-12 text-center">
          <h3 className="faint-text font-semibold tracking-wider uppercase text-sm">{t('customers.title')}</h3>
        </div>
        <div className="flex w-[200%] animate-marquee">
          {/* Duplicate logos for seamless loop */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex w-1/2 justify-around items-center">
              {['Client Alpha', 'Beta Corp', 'Gamma Tech', 'Delta Systems', 'Epsilon Inc'].map((logo, j) => (
                <div key={j} className="logo-strip-text text-2xl font-bold uppercase tracking-widest">{logo}</div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Middle Section 3: Our Services */}
      <section ref={servicesRef} className="min-h-screen flex flex-col justify-center relative z-20 py-24">
        <motion.div 
          style={{ y: servicesY }}
          className="max-w-6xl mx-auto px-6 w-full"
        >
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-cyan-400 font-semibold tracking-wider uppercase text-sm">{t('services.subtitle')}</h3>
            <h2 className="text-4xl md:text-5xl font-bold">{t('services.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: t('services.web_dev'), desc: t('services.web_dev_desc') },
              { icon: Smartphone, title: t('services.app_dev'), desc: t('services.app_dev_desc') },
              { icon: MessageSquare, title: t('services.chatbot'), desc: t('services.chatbot_desc') }
            ].map((service, i) => (
              <div key={i} className="card-surface backdrop-blur-md border p-8 rounded-2xl transition-colors hover:border-cyan-500/30">
                <service.icon className="w-12 h-12 text-cyan-400 mb-6" />
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="muted-text">{service.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Middle Section 4: Our Figures */}
      <section className="subtle-section py-32 relative z-20 backdrop-blur-sm border-y">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-cyan-400 font-semibold tracking-wider uppercase text-sm mb-4">{t('figures.subtitle')}</h3>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('figures.title')}</h2>
              <p className="muted-text text-lg leading-relaxed">
                {t('figures.desc')}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {[
                { num: 250, label: t('figures.customers') },
                { num: 50, label: t('figures.trainees') },
                { num: 2000000, label: t('figures.users') },
                { num: 25, label: t('figures.projects') }
              ].map((stat, i) => (
                <div key={i} className="space-y-2">
                  <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    <AnimatedCounter value={stat.num} />
                  </div>
                  <div className="muted-text font-medium uppercase tracking-wider text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Middle Section 5: Our Premium Projects */}
      <section id="portfolio" className="min-h-screen flex flex-col justify-center relative z-20 py-24">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-cyan-400 font-semibold tracking-wider uppercase text-sm">{t('portfolio.subtitle')}</h3>
            <h2 className="text-4xl md:text-5xl font-bold">{t('portfolio.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div 
                key={project.id} 
                onClick={() => setSelectedProject(project)}
                className="project-card group relative aspect-video rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--surface-elevated)] cursor-pointer hover:border-cyan-500/50 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)] transition-all duration-500"
              >
                <div className="project-overlay absolute inset-0 opacity-80 z-10 transition-opacity group-hover:opacity-90"></div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  referrerPolicy="no-referrer" 
                />
                <div className="absolute inset-0 p-8 z-20 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-cyan-400 font-medium text-sm mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 uppercase tracking-wider">{project.category}</span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">{project.title}</h3>
                  <div className="project-meta flex items-center gap-2 transition-colors duration-300">
                    <span className="text-sm font-semibold uppercase tracking-wider">{t('portfolio.view_details')}</span>
                    <ArrowRight size={16} className={`transform ${i18n.language === 'ar' ? 'translate-x-4 group-hover:translate-x-0 rotate-180' : '-translate-x-4 group-hover:translate-x-0'} opacity-0 group-hover:opacity-100 transition-all duration-500`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Middle Section 6: Blog */}
      <section id="blog" className="subtle-section py-24 relative z-20 border-y backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-16">
            <div className="space-y-4 max-w-2xl">
              <h3 className="text-cyan-400 font-semibold tracking-wider uppercase text-sm">{t('blog.subtitle')}</h3>
              <h2 className="text-4xl md:text-5xl font-bold">{t('blog.title')}</h2>
              <p className="muted-text text-lg leading-relaxed">{t('blog.description')}</p>
            </div>
            <Link
              to="/contact"
              className="project-meta inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider hover:text-cyan-400 transition-colors"
            >
              <span>{t('blog.cta')}</span>
              <ArrowRight size={16} className={i18n.language === 'ar' ? 'rotate-180' : ''} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="card-surface h-full border rounded-2xl p-8 backdrop-blur-md transition-colors hover:border-cyan-500/30"
              >
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">{post.category}</span>
                  <span className="muted-text inline-flex items-center gap-2 text-sm">
                    <CalendarDays size={16} className="text-cyan-400" />
                    {post.date}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{post.title}</h3>
                <p className="muted-text leading-relaxed mb-8">{post.excerpt}</p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="project-meta inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider hover:text-cyan-400 transition-colors"
                >
                  <span>{t('blog.read_more')}</span>
                  <ArrowRight size={16} className={i18n.language === 'ar' ? 'rotate-180' : ''} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final Section */}
      <section id="contact" className="h-screen flex flex-col items-center justify-center pb-32 relative z-20">
        <div className="glass-panel text-center space-y-8 backdrop-blur-md p-12 rounded-3xl border">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">
            {t('contact.title')}
          </h2>
          <p className="muted-text text-xl max-w-2xl mx-auto">
            {t('contact.desc')}
          </p>
          <Link to="/contact" className="cta-button inline-block px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform cursor-pointer">
            {t('contact.button')}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Project Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/terms" element={<TermsAndConditions />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/refund" element={<RefundPolicy />} />
      <Route path="/cancellation" element={<CancellationPolicy />} />
      <Route path="/promotions" element={<PromotionsTerms />} />
      <Route path="/security" element={<SecurityPolicy />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/blog/:postId" element={<BlogPostPage />} />
    </Routes>
  );
}
