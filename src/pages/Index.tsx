import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import DirectionsSection from '@/components/sections/DirectionsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import NewsSection from '@/components/sections/NewsSection';
import ContactsSection from '@/components/sections/ContactsSection';
import CmsPanel from '@/components/CmsPanel';
import { initialNews, NewsItem } from '@/data/newsData';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [cmsOpen, setCmsOpen] = useState(false);
  const [news, setNews] = useState<NewsItem[]>(initialNews);

  useEffect(() => {
    const sections = ['about', 'directions', 'projects', 'news', 'contacts'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id || 'home');
          }
        });
      },
      { threshold: 0.25, rootMargin: '-80px 0px 0px 0px' }
    );

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection('home');
        });
      },
      { threshold: 0.1 }
    );
    const hero = document.getElementById('hero-anchor');
    if (hero) heroObserver.observe(hero);

    return () => { observer.disconnect(); heroObserver.disconnect(); };
  }, []);

  const handleNavigate = (section: string) => {
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAddNews = (item: NewsItem) => setNews(prev => [item, ...prev]);
  const handleUpdateNews = (item: NewsItem) => setNews(prev => prev.map(n => n.id === item.id ? item : n));
  const handleDeleteNews = (id: string) => setNews(prev => prev.filter(n => n.id !== id));

  return (
    <div className="min-h-screen font-golos">
      <Header activeSection={activeSection} onNavigate={handleNavigate} />

      <div id="hero-anchor">
        <HeroSection onNavigate={handleNavigate} />
      </div>

      <AboutSection />
      <DirectionsSection />
      <ProjectsSection />
      <NewsSection news={news} />
      <ContactsSection />
      <Footer onNavigate={handleNavigate} />

      {/* CMS floating button */}
      <button
        onClick={() => setCmsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-sm font-semibold rounded-2xl shadow-2xl shadow-brand-blue/40 hover:scale-105 transition-all animate-pulse-glow"
      >
        <Icon name="Newspaper" size={18} />
        Управление новостями
      </button>

      {cmsOpen && (
        <CmsPanel
          news={news}
          onAdd={handleAddNews}
          onUpdate={handleUpdateNews}
          onDelete={handleDeleteNews}
          onClose={() => setCmsOpen(false)}
        />
      )}
    </div>
  );
}
