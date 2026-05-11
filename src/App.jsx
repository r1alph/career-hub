import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import './storage.js'; // Initialize window.storage polyfill

import CareerCommandCenter from './pages/CareerCommandCenter.jsx';
import IndustryIntelligence from './pages/IndustryIntelligence.jsx';
import FiveGPathway from './pages/FiveGPathway.jsx';
import ProjectPortfolio from './pages/ProjectPortfolio.jsx';
import TechSkillsMastery from './pages/TechSkillsMastery.jsx';
import MasterPlan from './pages/MasterPlan.jsx';

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: '🏠' },
  { path: '/career', label: 'Career Center', icon: '⚡' },
  { path: '/industry', label: 'Top 100', icon: '🏢' },
  { path: '/5g-path', label: '5G Pathway', icon: '📡' },
  { path: '/projects', label: 'Projects', icon: '🔧' },
  { path: '/tech-skills', label: 'Skills', icon: '♾️' },
  { path: '/master-plan', label: 'Plan', icon: '📋' },
];

function NavBar() {
  const location = useLocation();
  const current = location.pathname;

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000,
      background: 'linear-gradient(180deg, transparent 0%, #06080F 15%)',
      padding: '12px 0 8px',
    }}>
      <div style={{
        maxWidth: 500, margin: '0 auto',
        display: 'flex', justifyContent: 'center', gap: 4,
        background: '#0C1020', border: '1px solid #19223A',
        borderRadius: 16, padding: '6px 8px',
        boxShadow: '0 -4px 30px rgba(0,0,0,0.5)',
      }}>
        {NAV_ITEMS.map(item => {
          const active = current === item.path || (item.path !== '/' && current.startsWith(item.path));
          return (
            <Link key={item.path} to={item.path}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                padding: '6px 12px', borderRadius: 10, textDecoration: 'none',
                background: active ? '#2563EB18' : 'transparent',
                border: active ? '1px solid #2563EB30' : '1px solid transparent',
                transition: 'all 0.2s',
              }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              <span style={{ fontSize: 9, fontWeight: 600, color: active ? '#60A5FA' : '#334155', letterSpacing: 0.3 }}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function HomePage() {
  const dashboards = [
    { path: '/career', icon: '⚡', title: 'Career Command Center', desc: 'Daily tasks, job dashboard, LinkedIn strategy, certifications roadmap, networking playbook', color: '#2563EB', stat: 'Daily Tasks + 20 Jobs' },
    { path: '/industry', icon: '🏢', title: 'Top 100 Companies', desc: '100 wireless & telecom companies, skills matrix, certification roadmap, gap analysis', color: '#E8553D', stat: '100 Companies + Skills' },
    { path: '/5g-path', icon: '📡', title: '5G Engineer Pathway', desc: '5-section learning path with checkable concepts, curated resources, certifications', color: '#10B981', stat: '36-Week Path' },
    { path: '/projects', icon: '🔧', title: 'Project Portfolio', desc: '12 hands-on projects mapped to jobs, companies, and skills. Build real systems.', color: '#8B5CF6', stat: '12 Projects + Steps' },
    { path: '/tech-skills', icon: '♾️', title: 'Tech Skills Mastery', desc: 'Python, SQL, AWS, Docker, K8s, Terraform, Ansible, Jenkins, Security, DevOps.', color: '#EC4899', stat: '10 Skills + 6 Projects' },
    { path: '/master-plan', icon: '📋', title: '24-Week Master Plan', desc: 'Unified daily timetable combining all dashboards — skills, 5G, projects, certs, LinkedIn — into one trackable schedule.', color: '#E8553D', stat: '24 Weeks · All-in-One' },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: '#06080F', color: '#CBD5E1', minHeight: '100vh', paddingBottom: 80 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Syne:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fade { animation: fadeUp 0.5s ease forwards; }
        .fd1 { animation-delay: 0.1s; opacity: 0; }
        .fd2 { animation-delay: 0.2s; opacity: 0; }
        .fd3 { animation-delay: 0.3s; opacity: 0; }
        .fd4 { animation-delay: 0.4s; opacity: 0; }
        a { text-decoration: none; color: inherit; }
      `}</style>

      {/* Hero */}
      <div style={{ padding: '60px 20px 40px', textAlign: 'center', background: 'linear-gradient(180deg, #0D1225 0%, #06080F 100%)' }}>
        <div className="fade" style={{ width: 70, height: 70, borderRadius: 18, background: 'linear-gradient(135deg, #2563EB, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 800, fontFamily: 'Syne', color: '#fff', margin: '0 auto 16px' }}>R</div>
        <h1 className="fade fd1" style={{ fontSize: 28, fontWeight: 800, fontFamily: 'Syne', color: '#F1F5F9', letterSpacing: -0.5, marginBottom: 8 }}>Ralph Assan Kumah</h1>
        <p className="fade fd2" style={{ fontSize: 14, color: '#64748B', maxWidth: 500, margin: '0 auto', lineHeight: 1.6 }}>
          PhD Candidate in Electrical & Computer Engineering at Portland State University. Researching THz communications, physical layer security, and ML for wireless systems.
        </p>
        <div className="fade fd3" style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 16, flexWrap: 'wrap' }}>
          {['THz Systems', '5G/6G', 'Physical Layer Security', 'ML/DL', 'O-RAN', 'SDR/USRP'].map((s, i) => (
            <span key={i} style={{ padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: '#2563EB14', color: '#60A5FA', border: '1px solid #2563EB25' }}>{s}</span>
          ))}
        </div>
        <div className="fade fd4" style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 20 }}>
          <a href="mailto:ralphassan0@gmail.com" style={{ padding: '8px 20px', borderRadius: 8, background: 'linear-gradient(135deg, #2563EB, #4338CA)', color: '#fff', fontSize: 12, fontWeight: 700 }}>Contact Me</a>
          <a href="https://www.linkedin.com/in/ralphassan" target="_blank" rel="noopener noreferrer" style={{ padding: '8px 20px', borderRadius: 8, background: '#19223A', color: '#94A3B8', fontSize: 12, fontWeight: 700, border: '1px solid #253060' }}>LinkedIn</a>
        </div>
      </div>

      {/* Dashboards */}
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 16px' }}>
        <h2 className="fade fd3" style={{ fontSize: 12, fontWeight: 700, fontFamily: 'Space Mono', color: '#334155', letterSpacing: 1.5, marginBottom: 14, textAlign: 'center' }}>CAREER DASHBOARDS</h2>

        {dashboards.map((d, i) => (
          <Link key={d.path} to={d.path}>
            <div className={`fade fd${i + 1}`} style={{
              background: 'linear-gradient(150deg, #0C1020, #111828)',
              border: '1px solid #19223A', borderRadius: 14,
              padding: 20, marginBottom: 10,
              borderLeft: `4px solid ${d.color}`,
              transition: 'all 0.25s', cursor: 'pointer',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 22 }}>{d.icon}</span>
                    <h3 style={{ fontSize: 16, fontWeight: 700, fontFamily: 'Syne', color: '#F1F5F9' }}>{d.title}</h3>
                  </div>
                  <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.6 }}>{d.desc}</p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 12 }}>
                  <span style={{ padding: '4px 10px', borderRadius: 8, background: d.color + '14', color: d.color, fontSize: 10, fontWeight: 700 }}>{d.stat}</span>
                  <div style={{ fontSize: 18, color: d.color, marginTop: 8 }}>→</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '30px 16px 80px', fontSize: 10, fontFamily: 'Space Mono', color: '#19223A', letterSpacing: 1 }}>
        RALPH KUMAH · CAREER HUB · 2026
      </div>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <div style={{ paddingBottom: 60 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/career" element={<CareerCommandCenter />} />
          <Route path="/industry" element={<IndustryIntelligence />} />
          <Route path="/5g-path" element={<FiveGPathway />} />
          <Route path="/projects" element={<ProjectPortfolio />} />
          <Route path="/tech-skills" element={<TechSkillsMastery />} />
          <Route path="/master-plan" element={<MasterPlan />} />
        </Routes>
      </div>
      <NavBar />
    </HashRouter>
  );
}
