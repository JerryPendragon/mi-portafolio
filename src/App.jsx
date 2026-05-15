import React, { useState, useEffect } from 'react';
import { Terminal, Database, Shield, BarChart, Mail, ExternalLink, ChevronDown, Code, Download, Briefcase, GraduationCap, Award } from 'lucide-react';

// Cambiamos la ruta para que apunte directamente a la carpeta public y con un nombre sin espacios/acentos
const cvPDF = "/cv_gerardo.pdf";

// Creamos nuestro propio componente SVG para Github ya que Lucide eliminó los logos de marcas
const GithubIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

// Creamos nuestro propio componente SVG para Linkedin
const LinkedinIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const PORTFOLIO_DATA = {
  hero: {
    name: "Gerardo Preciado",
    title: "Ingeniero en Sistemas",
    subtitle: "Especialista en Análisis e Ingeniería de Datos",
    description: "Transformo información compleja en soluciones estratégicas. Mi experiencia técnica abarca desde la extracción y modelado de datos con Python y SQL, hasta la visualización ejecutiva en Power BI, asegurando siempre la integridad de la información con sólidas bases en ciberseguridad.",
  },
  about: {
    text: "Mi trayectoria profesional se caracteriza por un enfoque integral del dato. Habiendo trabajado en entornos corporativos exigentes como ArcelorMittal, comprendo que el valor de los datos no reside solo en su análisis, sino en su correcta gestión desde el origen. Mi conocimiento en infraestructura y herramientas de seguridad (DarkTrace, SentinelOne) me permite diseñar soluciones analíticas robustas, eficientes y, sobre todo, seguras para la toma de decisiones críticas.",
  },
  skills: [
    {
      category: "Ingeniería & Bases de Datos",
      icon: <Database className="w-6 h-6 mb-2 text-blue-400" />,
      items: ["SQL Server & PostgreSQL", "ETL Pipelines", "Modelado Relacional", "Integración de Datos"],
      color: "bg-blue-900/30 border-blue-800"
    },
    {
      category: "Análisis & Visualización",
      icon: <BarChart className="w-6 h-6 mb-2 text-emerald-400" />,
      items: ["Power BI", "DAX", "Diseño de Dashboards", "DataCamp Certified"],
      color: "bg-emerald-900/30 border-emerald-800"
    },
    {
      category: "Programación & Web",
      icon: <Code className="w-6 h-6 mb-2 text-purple-400" />,
      items: ["Python (Pandas, NumPy)", "Scikit-Learn", "Angular", "Ionic"],
      color: "bg-purple-900/30 border-purple-800"
    },
    {
      category: "Infraestructura & Seguridad",
      icon: <Shield className="w-6 h-6 mb-2 text-rose-400" />,
      items: ["DarkTrace", "SentinelOne", "SCCM", "CISCO Cybersecurity"],
      color: "bg-rose-900/30 border-rose-800"
    }
  ],
  experience: [
    {
      id: 1,
      role: "Analista de Datos y Ciberseguridad (Practicante)",
      company: "ArcelorMittal",
      period: "Ene 2026 - Jun 2026",
      description: "Análisis de Seguridad de Datos mediante monitoreo de tráfico de red en tiempo real utilizando DarkTrace y SentinelOne. Gestión de Integridad ejecutando auditorías con SCCM, asegurando la consistencia de las bases de datos corporativas."
    },
    {
      id: 2,
      role: "Desarrollador Frontend & UI/UX",
      company: "XROM Systems",
      period: "Jun 2024 - Feb 2025",
      description: "Diseño y programación de interfaces web responsivas con Angular e Ionic para visualización de datos complejos. Integración eficiente de servicios frontend con APIs de backend asegurando escalabilidad."
    },
    {
      id: 3,
      role: "Becario de Proyectos TI",
      company: "ArcelorMittal",
      period: "Ago 2023 - Jun 2024",
      description: "Soporte a infraestructura mediante mantenimiento preventivo de sistemas y redes. Generación de informes de estatus y reportes técnicos para la gestión de activos tecnológicos de la planta."
    }
  ],
  certifications: [
    { title: "Data Engineer", issuer: "DataCamp", date: "Marzo 2026" },
    { title: "Data Analyst Associate", issuer: "DataCamp", date: "Marzo 2026" },
    { title: "Junior Cybersecurity Analyst", issuer: "CISCO", date: "Febrero 2026" },
    { title: "Intro to Data Science", issuer: "CISCO", date: "Enero 2026" },
    { title: "Data Protection", issuer: "ArcelorMittal", date: "Marzo 2026" },
  ]
};

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'experience', 'skills', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 400) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-blue-500/30">
      
      {/* Navigation Bar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="font-bold text-xl tracking-tighter text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-blue-500" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              G.Preciado
            </span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            {['Home', 'Experience', 'Skills', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className={`transition-colors hover:text-blue-400 ${activeSection === item.toLowerCase() ? 'text-blue-400' : 'text-slate-400'}`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a 
              href={cvPDF} 
              download="CV_Gerardo_Preciado.pdf"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
              title="Descargar CV"
            >
              <Download className="w-4 h-4" /> <span className="hidden md:inline">CV</span>
            </a>
            <button 
              onClick={() => scrollTo('contact')}
              className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)]"
            >
              Contactar
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center mt-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-sm mb-6 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Disponible para nuevas oportunidades
          </div>
          <h2 className="text-2xl md:text-3xl font-light text-slate-300 mb-2">Hola, soy <span className="font-semibold text-white">{PORTFOLIO_DATA.hero.name}</span></h2>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Transformando Datos en <br className="hidden md:block"/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">
              Decisiones Estratégicas
            </span>
          </h1>
          <h2 className="text-xl md:text-2xl text-slate-400 mb-8 font-light">
            {PORTFOLIO_DATA.hero.title} · {PORTFOLIO_DATA.hero.subtitle}
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            {PORTFOLIO_DATA.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => scrollTo('experience')}
              className="px-8 py-4 rounded-lg bg-white text-slate-900 font-semibold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
            >
              Ver Experiencia <ChevronDown className="w-4 h-4" />
            </button>
            <a 
              href={cvPDF} 
              download="CV_Gerardo_Preciado.pdf"
              className="px-8 py-4 rounded-lg border border-slate-700 hover:border-blue-500 hover:text-blue-400 hover:bg-slate-800 transition-all flex items-center justify-center gap-2 text-white font-medium"
            >
              <Download className="w-5 h-5" /> Descargar CV
            </a>
            <a 
              href="https://linkedin.com/in/gerardo-preciado-arredondo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-lg border border-slate-700 hover:border-slate-500 hover:bg-slate-800 transition-all flex items-center justify-center gap-2 text-white font-medium"
            >
              <LinkedinIcon className="w-5 h-5" /> LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-slate-900/50 border-y border-slate-800/50 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-16">
            <Briefcase className="w-8 h-8 text-blue-500" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">Experiencia Profesional</h2>
          </div>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
            {PORTFOLIO_DATA.experience.map((exp, index) => (
              <div key={exp.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-900 text-slate-500 group-hover:text-blue-400 group-hover:border-blue-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors z-10">
                  <div className="w-2 h-2 bg-current rounded-full"></div>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <h3 className="font-bold text-white text-lg">{exp.role}</h3>
                    <span className="text-xs font-medium text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full whitespace-nowrap mt-2 sm:mt-0">{exp.period}</span>
                  </div>
                  <h4 className="text-slate-400 font-medium mb-4 flex items-center gap-2">
                    {exp.company}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Certifications Section */}
      <section id="skills" className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ecosistema & Formación</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Conocimientos técnicos respaldados por certificaciones de la industria e ingeniería formal.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {PORTFOLIO_DATA.skills.map((skill, index) => (
              <div key={index} className={`p-6 rounded-2xl border ${skill.color} backdrop-blur-sm hover:-translate-y-1 transition-transform duration-300`}>
                {skill.icon}
                <h3 className="text-xl font-semibold text-white mb-4">{skill.category}</h3>
                <ul className="space-y-2">
                  {skill.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Formación y Certificados */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/30">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="w-6 h-6 text-emerald-400" />
                <h3 className="text-2xl font-bold text-white">Educación</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-medium">Ingeniería en Sistemas Computacionales</h4>
                  <p className="text-sm text-slate-400">TecNM Campus Lázaro Cárdenas (Ago 2021 - Jun 2026)</p>
                </div>
                <div>
                  <h4 className="text-white font-medium">PTB en Informática</h4>
                  <p className="text-sm text-slate-400">Conalep 035, Lázaro Cárdenas (Ago 2018 - Jun 2021)</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/30">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6 text-blue-400" />
                <h3 className="text-2xl font-bold text-white">Certificaciones Top</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PORTFOLIO_DATA.certifications.map((cert, index) => (
                  <div key={index} className="flex flex-col p-3 rounded-xl border border-slate-700/50 bg-slate-800/20">
                    <span className="text-sm font-semibold text-white">{cert.title}</span>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-slate-400">{cert.issuer}</span>
                      <span className="text-xs text-blue-400/80">{cert.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section & Footer */}
      <section id="contact" className="pt-24 pb-12 bg-slate-900/50 border-t border-slate-800/50 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">¿Listo para potenciar tus datos?</h2>
          <p className="text-lg text-slate-400 mb-10">
            Estoy abierto a nuevas oportunidades corporativas o proyectos donde la integridad y el análisis del dato sean críticos.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-20">
            <a href="mailto:Gprecciado@gmail.com" className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all w-full sm:w-auto justify-center shadow-lg shadow-blue-900/20">
              <Mail className="w-5 h-5" /> Gprecciado@gmail.com
            </a>
            <div className="flex gap-4">
              
              <a href="https://www.linkedin.com/in/gerardo-preciado-arredondo-703a39176/" target="_blank" rel="noopener noreferrer" className="p-4 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors">
                <LinkedinIcon className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <footer className="max-w-6xl mx-auto px-6 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Gerardo Preciado Arredondo.</p>
          <p>Diseñado con React & Tailwind CSS</p>
        </footer>
      </section>

    </div>
  );
}