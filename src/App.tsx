/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Linkedin, 
  ExternalLink, 
  Phone,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

// --- Types ---

type Lang = 'pt' | 'en' | 'es';

interface Content {
  [key: string]: {
    pt: string;
    en: string;
    es: string;
  };
}

// --- Constants ---

const CONTENT: Content = {
  navProducts: { pt: 'Produtos', en: 'Products', es: 'Productos' },
  navProcess: { pt: 'Processo', en: 'Process', es: 'Proceso' },
  navEducation: { pt: 'Formação', en: 'Education', es: 'Formación' },
  navSkills: { pt: 'Skills', en: 'Skills', es: 'Skills' },
  navContact: { pt: 'Contato', en: 'Contact', es: 'Contacto' },
  heroDesc: {
    pt: '4+ anos no UOL liderando produtos digitais de ponta a ponta. Do discovery e mapeamento de jornada até protótipos de alta fidelidade com impacto real em conversão e retenção.',
    en: '4+ years at UOL leading digital products end-to-end. From discovery and journey mapping to high-fidelity prototypes with real impact on conversion and retention.',
    es: '4+ años en UOL liderando productos digitales de punta a punta. Desde el discovery y mapeo de jornada hasta prototipos de alta fidelidade con impacto real en conversión y retención.'
  },
  heroBtnSee: { pt: 'Ver produtos', en: 'See products', es: 'Ver productos' },
  statsYears: { pt: 'Anos no UOL', en: 'Years at UOL', es: 'Años en UOL' },
  statsProducts: { pt: 'Produtos', en: 'Products', es: 'Productos' },
  statsGrad: { pt: 'Pós em UX', en: 'UX Grad.', es: 'Posgrados UX' },
  expertise: { pt: 'expertise', en: 'expertise', es: 'especialidad' },
  conversionImpact: { pt: 'Impacto em conversão', en: 'Conversion impact', es: 'Impacto en conversión' },
  sectionProducts: { pt: 'PRODUTOS', en: 'PRODUCTS', es: 'PRODUCTOS' },
  productsIntro: {
    pt: 'Produtos que lidero como Product Designer responsável no time colab da UOL — do discovery ao design system, de ponta a ponta.',
    en: 'Products I lead as responsible Product Designer on UOL\'s colab team — from discovery to design system, end-to-end.',
    es: 'Productos que lidero como Product Designer responsable en el equipo colab de UOL — desde el discovery hasta el design system, de punta a punta.'
  },
  sectionProcess: { pt: 'PROCESSO', en: 'PROCESS', es: 'PROCESO' },
  sectionEducation: { pt: 'FORMAÇÃO', en: 'EDUCATION', es: 'FORMACIÓN' },
  sectionContact: { pt: 'CONTATO', en: 'CONTACT', es: 'CONTACTO' },
  sectionContributions: { pt: 'CONTRIBUIÇÕES', en: 'CONTRIBUTIONS', es: 'CONTRIBUCIONES' },
  contactTitle: { pt: 'VAMOS<br>CRIAR<br>ALGO?', en: 'LET\'S<br>BUILD<br>SOMETHING?', es: 'VAMOS<br>A CREAR<br>ALGO?' },
  contactSub: { pt: 'Aberto a projetos e oportunidades', en: 'Open to projects and opportunities', es: 'Abierto a proyectos y oportunidades' }
};

const PROJECTS = [
  {
    id: "01",
    name: "UOL RESOLVE",
    tags: ["Discovery", "Product Strategy", "Workshop"],
    desc: {
      pt: "Liderança do Product Design na vertical de serviços. Discovery de novas estratégias comerciais com benchmark competitivo, entrevistas com stakeholders e workshops de co-criação.",
      en: "Product Design leadership for the services vertical. Discovery of new commercial strategies with competitive benchmarking, stakeholder interviews, and co-creation workshops.",
      es: "Liderazgo de Product Design en la vertical de servicios. Discovery de nuevas estrategias comerciales com benchmark competitivo, entrevistas com stakeholders y workshops de co-creación."
    }
  },
  {
    id: "02",
    name: "UOL ANTIVÍRUS",
    tags: ["UX Research", "Design System", "Rebranding"],
    desc: {
      pt: "Estratégia de Product Design para reformulação completa da experiência de venda. Blueprint de serviço em múltiplos SOs e evolução do Design System com foco em conversão.",
      en: "Product Design strategy for a full sales experience redesign. Service blueprint across multiple OSes and Design System evolution focused on conversion.",
      es: "Estrategia de Product Design para reformulación completa de la experiencia de venta. Blueprint de servicio en múltiplos SOs y evolución del Design System con foco en conversión."
    }
  },
  {
    id: "03",
    name: "UOL+",
    tags: ["Product Design", "WCAG", "UI System"],
    desc: {
      pt: "Design de Produto focado em fidelização. Do mapeamento de jornada e benchmark internacional até o redesign da interface com rigorosa acessibilidade WCAG.",
      en: "Product Design focused on loyalty. From journey mapping and international benchmarking to interface redesign with rigorous WCAG accessibility.",
      es: "Diseño de Producto enfocado en fidelización. Desde el mapeo de jornada y benchmark internacional hasta el rediseño de la interfaz con rigurosa acessibilidad WCAG."
    }
  },
  {
    id: "04",
    name: "VITRINE B2B2C",
    tags: ["Scalable UI", "Modular Design", "Product Architecture"],
    desc: {
      pt: "Arquitetura de design para plataforma modular de benefícios. Estruturação de componentes escaláveis para integração de parceiros estratégicos (Ingresso.com, PagBank).",
      en: "Design architecture for a modular benefits platform. Structuring scalable components for strategic partner integration (Ingresso.com, PagBank).",
      es: "Arquitectura de diseño para plataforma modular de beneficios. Estructuración de componentes escalables para integración de socios estratégicos (Ingresso.com, PagBank)."
    }
  },
  {
    id: "05",
    name: "UOL ASSIST. TÉCNICA",
    tags: ["Product Strategy", "UX Research", "UI"],
    desc: {
      pt: "Product Design focado na clareza da proposta de valor. Otimização da jornada de contratação através de testes de usabilidade e refinamento da interface.",
      en: "Product Design focused on value proposition clarity. Optimization of the subscription journey through usability testing and interface refinement.",
      es: "Product Design enfocado en la claridad de la propuesta de valor. Optimización de la jornada de contratación a través de pruebas de usabilidad y refinamiento de la interfaz."
    }
  },
  {
    id: "06",
    name: "UOL SEXO",
    tags: ["End-to-End", "Product Discovery", "UI"],
    desc: {
      pt: "Desenvolvimento de ponta a ponta de plataforma premium. Do Product Discovery e arquitetura de informação até a entrega de interface de alta fidelidade.",
      en: "End-to-end development of a premium platform. From Product Discovery and information architecture to high-fidelity interface delivery.",
      es: "Desarrollo de punta a punta de plataforma premium. Desde Product Discovery y arquitectura de información hasta la entrega de interfaz de alta fidelidade."
    }
  },
  {
    id: "07",
    name: "CLUBE UOL",
    tags: ["Retention", "Product Strategy", "UX"],
    desc: {
      pt: "Estratégia de design e auxílio na reformulação do produto. Diagnóstico de baixa ativação e redesign focado em percepção de valor e retenção.",
      en: "Design strategy and assistance in product reformulation. Diagnosis of low activation and redesign focused on value perception and retention.",
      es: "Estrategia de diseño y apoyo en la reformulación del producto. Diagnóstico de baja activación y rediseño enfocado en la percepción de valor y retención."
    }
  },
  {
    id: "08",
    name: "ENTRE OUTROS",
    tags: ["Product Design", "Multi-squad", "UI/UX"],
    desc: {
      pt: "Atuação transversal em múltiplos squads de conteúdo e serviços. Design de Produto focado em consistência visual e melhoria contínua da experiência do usuário.",
      en: "Cross-functional work across multiple content and service squads. Product Design focused on visual consistency and continuous user experience improvement.",
      es: "Trabajo transversal en múltiplos squads de contenido y servicios. Diseño de Produto enfocado en consistencia visual y mejora continua de la experiencia del usuario."
    }
  }
];

const CONTRIBUTIONS = ["BATE-PAPO UOL", "UOL PLAY", "+ OUTROS"];

const BEHANCE_PROJECTS = [
  {
    id: "05",
    name: "O ESOTÉRICO",
    tags: ["UI Design", "Visual Identity", "Mobile"],
    desc: {
      pt: "Design de interface e identidade visual para plataforma de esoterismo e bem-estar.",
      en: "Interface design and visual identity for an esotericism and well-being platform.",
      es: "Diseño de interfaz e identidad visual para plataforma de esoterismo y bienestar."
    },
    link: "https://www.behance.net/gallery/146524335/O-Esoterico-UI-Design"
  },
  {
    id: "06",
    name: "AI MVP DEVELOPMENT",
    tags: ["AI", "Product Strategy", "MVP"],
    desc: {
      pt: "Desenvolvimento de estratégia de produto e design para MVPs baseados em Inteligência Artificial.",
      en: "Product strategy and design development for AI-based MVPs.",
      es: "Desarrollo de estrategia de producto y diseño para MVPs basados en Inteligencia Artificial."
    },
    link: "https://www.behance.net/pedroyuritessari"
  }
];

const PROCESS = [
  {
    title: { pt: "Discovery", en: "Discovery", es: "Discovery" },
    items: {
      pt: ["Benchmark", "Entrevistas", "Desk Research"],
      en: ["Benchmark", "Interviews", "Desk Research"],
      es: ["Benchmark", "Entrevistas", "Desk Research"]
    }
  },
  {
    title: { pt: "Definição", en: "Definition", es: "Definición" },
    items: {
      pt: ["Personas", "User Stories", "Priorização"],
      en: ["Personas", "User Stories", "Prioritization"],
      es: ["Personas", "User Stories", "Priorización"]
    }
  },
  {
    title: { pt: "Design", en: "Design", es: "Diseño" },
    items: {
      pt: ["Wireframes", "Prototipagem", "Design System"],
      en: ["Wireframes", "Prototyping", "Design System"],
      es: ["Wireframes", "Prototipado", "Design System"]
    }
  },
  {
    title: { pt: "Entrega", en: "Delivery", es: "Entrega" },
    items: {
      pt: ["Handover", "Testes de Usabilidade", "QA"],
      en: ["Handover", "Usability Testing", "QA"],
      es: ["Handover", "Pruebas de Usabilidad", "QA"]
    }
  }
];

const EDUCATION = [
  {
    degree: { pt: "Pós-graduação Lato Sensu, User Experience and Beyond", en: "Postgraduate in User Experience and Beyond", es: "Posgrado en User Experience and Beyond" },
    school: "PUCRS",
    year: "2024 - 2025"
  },
  {
    degree: { pt: "Pós-graduação Lato Sensu - Especialização, User Experience", en: "Postgraduate in User Experience", es: "Posgrado en User Experience" },
    school: "Universidade Anhembi Morumbi",
    year: "2020 - 2021"
  },
  {
    degree: { pt: "Tecnologia, Marketing", en: "Technology, Marketing", es: "Tecnología, Marketing" },
    school: "Faculdade Sumaré",
    year: "2016 - 2018"
  }
];

const SKILLS = {
  hard: ["Figma", "UX Research", "UI Design", "Prototipagem", "Design System", "WCAG", "Service Blueprint", "Discovery"],
  soft: ["Comunicação", "Liderança", "Resolução de Problemas", "Trabalho em Equipe", "Pensamento Crítico", "Adaptabilidade"]
};

// --- Components ---

const Logo = () => (
  <a href="#" className="flex items-center gap-2 group" aria-label="Pedro Yuri Tessari - Home">
    <div className="flex items-center font-display text-2xl tracking-tighter">
      <span className="text-brand-red font-black">PY</span>
      <span className="text-brand-white font-light">URI</span>
      <div className="w-1.5 h-1.5 rounded-full bg-brand-red ml-1 animate-pulse" />
    </div>
  </a>
);

const StarBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    let stars: any[] = [];

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      init();
    };

    const init = () => {
      stars = [];
      const n = Math.floor((W * H) / 4000);
      for (let i = 0; i < n; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.2 + 0.2,
          a: Math.random(),
          s: Math.random() * 0.003 + 0.001,
          tint: Math.random() > 0.85
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      stars.forEach(s => {
        s.a += s.s;
        if (s.a > 1) s.a = 0;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.tint
          ? `rgba(232, 80, 80, ${s.a * 0.6})`
          : `rgba(245, 240, 238, ${s.a * 0.7})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => window.removeEventListener('resize', resize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true" />;
};

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  useEffect(() => {
    let frameId: number;
    const updateRing = () => {
      setRingPos(prev => ({
        x: prev.x + (pos.x - prev.x) * 0.15,
        y: prev.y + (pos.y - prev.y) * 0.15
      }));
      frameId = requestAnimationFrame(updateRing);
    };
    frameId = requestAnimationFrame(updateRing);
    return () => cancelAnimationFrame(frameId);
  }, [pos]);

  return (
    <>
      <div 
        id="cur" 
        style={{ left: pos.x, top: pos.y }} 
      />
      <div 
        id="ring" 
        style={{ 
          left: ringPos.x, 
          top: ringPos.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.8 : 1})`,
          borderColor: isHovering ? 'rgba(232, 0, 29, 0.8)' : 'rgba(232, 0, 29, 0.5)',
          boxShadow: isHovering ? '0 0 10px rgba(232, 0, 29, 0.4)' : 'none'
        }} 
      />
    </>
  );
};

// --- Main App ---

export default function App() {
  const [lang, setLang] = useState<Lang>('pt');

  const t = (key: string) => CONTENT[key]?.[lang] || key;

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="min-h-screen bg-brand-space text-brand-white font-sans selection:bg-brand-red selection:text-white overflow-x-hidden">
      <StarBackground />
      <CustomCursor />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[300] flex justify-between items-center px-6 md:px-12 h-[58px] bg-brand-black/92 backdrop-blur-3xl border-b border-brand-border">
        <Logo />
        
        <div className="flex items-center gap-8">
          <ul className="hidden lg:flex gap-8 list-none">
            {['Products', 'Process', 'Skills', 'Education', 'Contact'].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item.toLowerCase()}`}
                  className="font-mono text-[10px] tracking-[0.2em] uppercase text-brand-white/60 hover:text-brand-white transition-all relative group"
                >
                  {t(`nav${item}`)}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-red transition-all group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex gap-1 pl-6 border-l border-brand-border">
            {(['pt', 'en', 'es'] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-label={`Change language to ${l.toUpperCase()}`}
                className={`font-mono text-[9px] tracking-widest uppercase px-2 py-1 transition-all ${
                  lang === l 
                    ? 'text-brand-red border border-brand-red/30 bg-brand-red/10 shadow-[0_0_8px_rgba(232,0,29,0.6)]' 
                    : 'text-brand-white/50 hover:text-brand-white/80'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen pt-[58px] grid grid-cols-1 lg:grid-cols-[1fr_400px] relative overflow-hidden">
          <div className="flex flex-col justify-center px-6 md:px-12 py-20 relative">
            <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none" />
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 font-mono text-[10px] tracking-[0.32em] uppercase text-brand-red/70 mb-10"
            >
              <div className="w-6 h-[1px] bg-linear-to-r from-brand-red to-transparent shadow-[0_0_6px_rgba(232,0,29,0.5)]" />
              Product Designer · UOL colab · São Paulo, BR
            </motion.div>

            <h1 className="font-display text-[clamp(4rem,10vw,8.5rem)] leading-[0.85] tracking-tight mb-6">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="block text-brand-white drop-shadow-[2px_3px_0_rgba(0,0,0,0.6)]"
              >
                PEDRO
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="block text-brand-white drop-shadow-[2px_3px_0_rgba(0,0,0,0.6)]"
              >
                YURI
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="block bevel text-[clamp(4.5rem,11vw,10rem)]"
              >
                TESSARI
              </motion.span>
            </h1>

            <div className="font-bold text-[14px] tracking-[0.3em] uppercase text-brand-white/70 mb-10 flex items-center gap-4">
              UX Research <em className="text-brand-red/50 not-italic">/</em> UI Design <em className="text-brand-red/50 not-italic">/</em> Strategy
            </div>

            <p className="text-[17px] font-light leading-relaxed text-brand-wdim max-w-[420px] mb-12">
              {t('heroDesc')}
            </p>

            <div className="flex flex-wrap gap-3">
              <a href="#products" className="btn-glow" aria-label={t('heroBtnSee')}>
                {t('heroBtnSee')}
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
              <a href="https://www.behance.net/pedroyuritessari" target="_blank" className="btn-wire" aria-label="Behance Profile">Behance</a>
              <a href="https://www.linkedin.com/in/peyurit" target="_blank" className="btn-wire" aria-label="LinkedIn Profile">LinkedIn</a>
            </div>
          </div>

          <div className="hidden lg:flex flex-col border-l border-brand-border">
            <div className="flex-1 grid grid-cols-2 gap-[1px] bg-brand-border">
              {[
                { val: '4+', lbl: t('statsYears'), ghost: '4' },
                { val: '8+', lbl: t('statsProducts'), ghost: '8' },
                { val: '2×', lbl: t('statsGrad'), ghost: '2' }
              ].map((s, i) => (
                <div key={i} className="bg-brand-g1 p-10 flex flex-col justify-end relative overflow-hidden group hover:bg-brand-g2 transition-colors">
                  <div className="absolute -bottom-3 -right-1 font-display text-[7rem] text-white/[0.03] pointer-events-none select-none">{s.ghost}</div>
                  <div className="font-display text-6xl bevel-sm relative z-10">{s.val}</div>
                  <div className="font-mono text-[9px] tracking-widest uppercase text-brand-white/60 mt-1 relative z-10">{s.lbl}</div>
                </div>
              ))}
            </div>
            <div className="p-8 border-top border-brand-border bg-brand-g2">
              <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-brand-red/80 mb-2">// {t('expertise')}</div>
              <div className="text-[14px] font-light leading-relaxed text-brand-wdim">
                UX Research · Service Blueprint · Wireframes MF→HF · UI System · <span className="text-brand-red/50">{t('conversionImpact')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Ticker */}
        <div className="ticker" aria-hidden="true">
          <div className="flex whitespace-nowrap animate-tick">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex">
                {[
                  'UX RESEARCH', 'SERVICE BLUEPRINT', 'WIREFRAMES HF', 'DESIGN SYSTEM', 
                  'PERSONA', 'USABILITY TESTS', 'FIGMA', 'WCAG', 'DISCOVERY', 
                  'BENCHMARK', 'WORKSHOP', 'CONVERSION'
                ].map((item, j) => (
                  <div key={j} className="font-display text-[14px] tracking-[0.2em] text-brand-white/50 px-10 flex items-center gap-10">
                    {item} <em className="text-brand-red/50 not-italic">✦</em>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Products Section */}
        <section id="products" className="bg-brand-g1 py-24 px-6 md:px-12">
          <div className="flex items-baseline gap-6 mb-16">
            <span className="font-mono text-[10px] text-brand-red/80 tracking-[0.28em]">01</span>
            <h2 className="font-display text-[clamp(2rem,3.5vw,3.2rem)] tracking-widest bevel">{t('sectionProducts')}</h2>
            <div className="flex-1 h-[1px] bg-linear-to-r from-brand-red/20 to-transparent" />
          </div>

          <p className="text-[16px] font-light leading-relaxed text-brand-wdim max-w-[600px] mb-14">
            {t('productsIntro')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[1px] bg-brand-red/10 border border-brand-red/10 mb-12">
            {PROJECTS.map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-brand-space p-8 relative overflow-hidden group hover:bg-brand-g1 transition-colors"
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-linear-to-r from-transparent via-brand-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_#E8001D]" />
                <div className="absolute -bottom-6 -right-2 font-display text-[8rem] text-brand-red/[0.025] pointer-events-none select-none">{i + 1}</div>
                
                <div className="font-mono text-[9px] tracking-widest text-brand-red/70 mb-5 flex items-center gap-2">
                  <div className="w-3 h-[1px] bg-brand-red/60" /> // {p.id}
                </div>

                <h3 className="font-display text-3xl leading-[0.95] tracking-widest mb-4 group-hover:text-brand-red-2 group-hover:drop-shadow-[0_0_12px_rgba(232,0,29,0.9)] transition-all">
                  {p.name}
                </h3>

                <div className="flex flex-wrap gap-1 mb-4">
                  {p.tags.map(tag => (
                    <span key={tag} className="font-mono text-[8px] tracking-widest uppercase px-2 py-0.5 border border-brand-border text-brand-white/60 group-hover:border-brand-red/40 group-hover:text-brand-white transition-all">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-[13px] font-light leading-relaxed text-brand-white/60">
                  {p.desc[lang]}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Contributions */}
          <div className="mt-16 p-8 bg-brand-black/40 border border-brand-border flex flex-col md:flex-row items-center gap-8">
            <div className="font-mono text-[10px] text-brand-red/80 tracking-[0.28em] whitespace-nowrap">
              // {t('sectionContributions')}
            </div>
            <div className="flex flex-wrap gap-4">
              {CONTRIBUTIONS.map(c => (
                <div key={c} className="px-6 py-2 border border-brand-border font-display text-[14px] tracking-widest text-brand-white/80">
                  {c}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-24 px-6 md:px-12 bg-brand-black/40">
          <div className="flex items-baseline gap-6 mb-16">
            <span className="font-mono text-[10px] text-brand-red/80 tracking-[0.28em]">02</span>
            <h2 className="font-display text-[clamp(2rem,3.5vw,3.2rem)] tracking-widest bevel">{t('sectionProcess')}</h2>
            <div className="flex-1 h-[1px] bg-linear-to-r from-brand-red/20 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS.map((step, i) => (
              <div key={i} className="relative">
                <div className="font-display text-5xl text-brand-red/10 mb-4">0{i + 1}</div>
                <h3 className="font-display text-2xl tracking-widest mb-4 text-brand-red">{step.title[lang]}</h3>
                <ul className="space-y-2">
                  {step.items[lang].map((item, j) => (
                    <li key={j} className="flex items-center gap-2 font-mono text-[11px] text-brand-wdim uppercase tracking-wider">
                      <ChevronRight className="w-3 h-3 text-brand-red/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 px-6 md:px-12 bg-brand-g2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="font-display text-3xl tracking-widest mb-8 text-brand-red">HARD SKILLS</h3>
              <div className="flex flex-wrap gap-3">
                {SKILLS.hard.map(skill => (
                  <span key={skill} className="px-4 py-2 bg-brand-black border border-brand-border font-mono text-[11px] tracking-widest uppercase text-brand-wdim hover:border-brand-red/40 hover:text-brand-white transition-all">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-display text-3xl tracking-widest mb-8 text-brand-red">SOFT SKILLS</h3>
              <div className="flex flex-wrap gap-3">
                {SKILLS.soft.map(skill => (
                  <span key={skill} className="px-4 py-2 bg-brand-black border border-brand-border font-mono text-[11px] tracking-widest uppercase text-brand-wdim hover:border-brand-red/40 hover:text-brand-white transition-all">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section id="education" className="py-24 px-6 md:px-12 border-t border-brand-border">
          <div className="flex items-baseline gap-6 mb-16">
            <span className="font-mono text-[10px] text-brand-red/80 tracking-[0.28em]">03</span>
            <h2 className="font-display text-[clamp(2rem,3.5vw,3.2rem)] tracking-widest bevel">{t('sectionEducation')}</h2>
            <div className="flex-1 h-[1px] bg-linear-to-r from-brand-red/20 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {EDUCATION.map((edu, i) => (
              <div key={i} className="p-8 bg-brand-g1 border-l-2 border-brand-red/30">
                <div className="font-mono text-[10px] text-brand-red/80 mb-2">{edu.year}</div>
                <h3 className="font-display text-2xl tracking-widest mb-2">{edu.degree[lang]}</h3>
                <p className="font-mono text-[12px] text-brand-wdim uppercase tracking-widest">{edu.school}</p>
              </div>
            ))}
          </div>
        </section>
        <section id="contact" className="relative py-32 px-6 md:px-12 bg-brand-g1 text-center overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-red/10 blur-[120px] rounded-full pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="font-display text-[clamp(4rem,10vw,9rem)] leading-[0.88] mb-8">
              <span className="block text-brand-white">{t('contactTitle').split('<br>')[0]}</span>
              <span className="block bevel">{t('contactTitle').split('<br>')[1] || 'CRIAR'}</span>
              <span className="block text-brand-white">{t('contactTitle').split('<br>')[2] || 'ALGO?'}</span>
            </h2>

            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-brand-white/50 mb-12">
              São Paulo, BR · {t('contactSub')}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a href="mailto:pytessari@gmail.com" className="btn-glow px-10 py-4 text-[12px]" aria-label="Send email to pytessari@gmail.com">
                pytessari@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/peyurit" target="_blank" className="btn-wire px-10 py-4 text-[12px]" aria-label="LinkedIn Profile">
                LinkedIn
              </a>
              <a href="https://www.behance.net/pedroyuritessari" target="_blank" className="btn-wire px-10 py-4 text-[12px]" aria-label="Behance Profile">
                Behance
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="py-20 px-6 md:px-12 border-t border-brand-border bg-brand-black/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          <div className="flex flex-col gap-6">
            <Logo />
            <p className="font-mono text-[11px] tracking-widest uppercase text-brand-white/60 leading-relaxed max-w-[280px]">
              Product Designer focado em criar experiências digitais de alto impacto e performance.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="font-display text-[10px] tracking-[0.3em] uppercase text-brand-red">Social</h4>
            <div className="flex flex-col gap-3">
              <a href="https://www.linkedin.com/in/peyurit" target="_blank" className="font-mono text-[11px] tracking-widest uppercase text-brand-white/70 hover:text-brand-white transition-colors">LinkedIn</a>
              <a href="https://www.behance.net/pedroyuritessari" target="_blank" className="font-mono text-[11px] tracking-widest uppercase text-brand-white/70 hover:text-brand-white transition-colors">Behance</a>
              <a href="mailto:pytessari@gmail.com" className="font-mono text-[11px] tracking-widest uppercase text-brand-white/70 hover:text-brand-white transition-colors">Email</a>
            </div>
          </div>

          <div className="flex flex-col gap-6 md:items-end">
            <h4 className="font-display text-[10px] tracking-[0.3em] uppercase text-brand-red">Localização</h4>
            <div className="flex flex-col gap-1 md:items-end">
              <span className="font-mono text-[11px] tracking-widest uppercase text-brand-white/60">São Paulo, Brasil</span>
              <span className="font-mono text-[9px] tracking-widest uppercase text-brand-white/50">Disponível para novos projetos</span>
            </div>
            <span className="font-mono text-[9px] tracking-widest uppercase text-brand-white/60 mt-4">© 2026 Pedro Yuri Tessari</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
