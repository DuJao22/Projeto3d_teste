import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { MessageCircle, ArrowRight, Zap, Shield, TrendingUp, Layers, Rocket, Code, Cpu, Palette, Video, Brain, BarChart3, CheckCircle2, AlertCircle } from 'lucide-react';
import CarCanvas, { CarCanvasHandle } from './components/CarCanvas';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const carCanvasRef = useRef<CarCanvasHandle>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          if (carCanvasRef.current) {
            carCanvasRef.current.updateCar(self.progress);
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const services = [
    {
      title: "Marketing Digital & Crescimento",
      desc: "Gestão de redes sociais, Tráfego pago (Ads), Funis de vendas e Copywriting persuasivo.",
      icon: TrendingUp,
      goal: "Atrair clientes e gerar vendas todos os dias."
    },
    {
      title: "Desenvolvimento Web & Sistemas",
      desc: "Landing pages de alta conversão, Sistemas personalizados, APIs e Dashboards.",
      icon: Code,
      goal: "Digitalizar negócios e aumentar a conversão."
    },
    {
      title: "Automação & IA",
      desc: "Bots de atendimento (WhatsApp), CRM inteligente e automação de processos de vendas.",
      icon: Cpu,
      goal: "Trabalhar menos e vender muito mais."
    },
    {
      title: "Branding & Design",
      desc: "Identidade visual, UI/UX e criação de marcas fortes e profissionais.",
      icon: Palette,
      goal: "Criar autoridade e percepção de valor."
    },
    {
      title: "Produção de Conteúdo",
      desc: "Vídeos virais, edição de Reels/TikTok e estratégias de conteúdo magnético.",
      icon: Video,
      goal: "Atrair atenção e gerar autoridade massiva."
    },
    {
      title: "Estratégia & Consultoria",
      desc: "Análise de negócio, otimização de processos e planos de escala acelerada.",
      icon: Brain,
      goal: "Converter pequenos negócios em grandes empresas."
    },
    {
      title: "Sistemas de Vendas",
      desc: "Scripts de vendas, automação de fechamento e gestão inteligente de leads.",
      icon: BarChart3,
      goal: "Fechar mais vendas com muito menos esforço."
    }
  ];

  return (
    <div ref={containerRef} className="relative text-white selection:bg-accent selection:text-bg">
      <CarCanvas ref={carCanvasRef} />

      {/* Overlay Gradients */}
      <div className="fixed inset-0 pointer-events-none z-2 bg-gradient-to-b from-bg/40 via-transparent to-bg/60" />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-10 py-6 md:py-10 flex justify-between items-center border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="font-display font-black text-xl md:text-2xl tracking-tighter uppercase">DS<span className="text-accent">COMPANY</span></span>
        </div>
        <div className="hidden lg:flex gap-8 text-[12px] font-medium uppercase tracking-[2px] text-muted">
          <a href="#sobre" className="hover:text-accent transition-colors">Sobre</a>
          <a href="#servicos" className="hover:text-accent transition-colors">Serviços</a>
          <a href="#diferencial" className="hover:text-accent transition-colors">Diferencial</a>
          <a href="#contato" className="hover:text-accent transition-colors">Contato</a>
        </div>
        <a href="https://wa.me/seunumero" target="_blank" rel="noreferrer" className="bg-accent text-bg px-4 py-2 md:px-6 md:py-3 rounded-none font-bold text-xs md:text-sm uppercase tracking-widest hover:shadow-[0_0_20px_rgba(0,242,255,0.5)] transition-all">
          ORÇAMENTO
        </a>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 md:px-20 z-20 pt-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-[4px] mb-4 block">Ecossistema Digital de Alto Impacto</span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-[84px] font-bold leading-[0.9] tracking-[-3px] mb-6">
            TRANSFORME SEU NEGÓCIO EM UMA <span className="text-accent text-glow">MÁQUINA</span> DIGITAL.
          </h1>
          <p className="text-base md:text-lg text-muted max-w-md mb-10 font-light leading-relaxed">
            A DS Company combina marketing, tecnologia e vendas em um único ecossistema para escalar sua empresa com automação e inteligência.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#servicos" className="cta-button-theme text-center w-full sm:w-auto">
              Nossos Serviços
            </a>
            <a href="#sobre" className="px-10 py-5 border border-white/10 text-white uppercase tracking-[2px] font-semibold hover:bg-white/5 transition-all text-center w-full sm:w-auto">
              Saiba Mais
            </a>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="sobre" className="relative min-h-screen flex items-center px-6 md:px-20 z-20 py-20">
        <div className="max-w-3xl">
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-8">
            O QUE É A <span className="text-accent italic">DS COMPANY?</span>
          </h2>
          <div className="space-y-6 text-lg text-muted font-light leading-relaxed">
            <p>
              Somos uma empresa digital focada em crescimento, automação e desenvolvimento tecnológico. Nossa missão é transformar empresas tradicionais em negócios modernos, escaláveis e totalmente automatizados.
            </p>
            <p>
              Atuamos como uma empresa <span className="text-white font-medium">full-service</span>, unindo o poder do marketing de resposta direta com a precisão da engenharia de software e inteligência artificial.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="stat-box-theme">
              <span className="text-3xl font-bold block">100%</span>
              <span className="text-[11px] uppercase tracking-[1px] text-muted">Foco em Resultados</span>
            </div>
            <div className="stat-box-theme">
              <span className="text-3xl font-bold block">IA</span>
              <span className="text-[11px] uppercase tracking-[1px] text-muted">Processos Inteligentes</span>
            </div>
            <div className="stat-box-theme">
              <span className="text-3xl font-bold block">24/7</span>
              <span className="text-[11px] uppercase tracking-[1px] text-muted">Escalabilidade Real</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="relative min-h-screen flex flex-col justify-center px-6 md:px-20 z-20 py-20">
        <div className="mb-16">
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-4">
            NOSSAS <span className="text-accent">SOLUÇÕES</span>
          </h2>
          <p className="text-muted max-w-xl">Um arsenal completo de tecnologia e marketing para dominar o seu mercado.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-white/5 border border-white/10 hover:border-accent/50 transition-all group relative"
            >
              <div className="relative inline-block mb-6">
                <s.icon className="w-10 h-10 text-accent group-hover:scale-110 transition-transform cursor-help" />
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-accent text-bg text-[10px] font-bold uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  {s.title.split(' ')[0]} PRO
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-accent" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4">{s.title}</h3>
              <p className="text-sm text-muted mb-6 leading-relaxed">{s.desc}</p>
              <div className="pt-4 border-t border-white/10">
                <span className="text-[10px] uppercase tracking-widest text-accent font-bold">Objetivo:</span>
                <p className="text-xs text-white/80 mt-1">{s.goal}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Differential Section */}
      <section id="diferencial" className="relative min-h-screen flex items-center justify-end px-6 md:px-20 z-20 py-20">
        <div className="max-w-2xl text-right">
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-12">
            POR QUE SOMOS <br />
            <span className="italic text-accent">DIFERENTES?</span>
          </h2>
          <div className="space-y-12">
            <div className="flex flex-row-reverse items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Rocket className="text-accent w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Tudo em um só lugar</h3>
                <p className="text-muted">Marketing + Tecnologia + Vendas integrados em um único ecossistema, eliminando falhas de comunicação e maximizando ROI.</p>
              </div>
            </div>
            <div className="flex flex-row-reverse items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Cpu className="text-accent w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Automação Completa</h3>
                <p className="text-muted">Sistemas que trabalham por você 24 horas por dia, 7 dias por semana, captando e qualificando leads sem intervenção humana.</p>
              </div>
            </div>
            <div className="flex flex-row-reverse items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="text-accent w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Foco em Resultados Reais</h3>
                <p className="text-muted">Não entregamos apenas estética. Entregamos sistemas prontos para vender e escalar seu faturamento.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem vs Solution */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-20 z-20 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="p-10 bg-red-500/5 border border-red-500/20">
            <AlertCircle className="w-12 h-12 text-red-500 mb-6" />
            <h2 className="text-3xl font-bold mb-8 uppercase tracking-tighter">O Problema</h2>
            <ul className="space-y-4 text-muted">
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> Negócios sem fluxo constante de clientes</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> Falta de presença digital profissional</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> Baixa conversão de visitantes em vendas</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> Processos manuais lentos e cansativos</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> Dependência total do dono para vender</li>
            </ul>
          </div>
          <div className="p-10 bg-accent/5 border border-accent/20">
            <CheckCircle2 className="w-12 h-12 text-accent mb-6" />
            <h2 className="text-3xl font-bold mb-8 uppercase tracking-tighter">O Resultado DS</h2>
            <ul className="space-y-4 text-white/80">
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-accent rounded-full" /> Fluxo ininterrupto de novos clientes</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-accent rounded-full" /> Presença digital de autoridade mundial</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-accent rounded-full" /> Negócio automatizado e independente</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-accent rounded-full" /> Escala acelerada de faturamento</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-accent rounded-full" /> Liberdade para focar na estratégia</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="contato" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 z-20 py-20">
        <div className="max-w-4xl p-8 md:p-20 border border-white/10 bg-white/5 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-accent" />
          <h2 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-8">
            PRONTO PARA <br />
            <span className="text-accent">ESCALAR?</span>
          </h2>
          <p className="text-lg md:text-xl text-muted mb-12 max-w-2xl mx-auto">
            Não deixe sua empresa no passado. Transforme seu negócio em uma máquina de vendas automatizada hoje mesmo.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="https://wa.me/seunumero" target="_blank" rel="noreferrer" className="cta-button-theme flex items-center justify-center gap-3">
              Falar com Especialista <ArrowRight className="w-5 h-5" />
            </a>
            <a href="https://wa.me/seunumero" target="_blank" rel="noreferrer" className="px-10 py-5 border border-white/10 text-white uppercase tracking-[2px] font-semibold hover:bg-white/5 transition-all flex items-center justify-center gap-3">
              <MessageCircle className="w-5 h-5" /> WhatsApp
            </a>
          </div>
        </div>
        
        <footer className="mt-20 w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.3em] text-white/30">
          <span>&copy; 2026 DS COMPANY - ECOSSISTEMA DIGITAL</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
          </div>
        </footer>
      </section>

      {/* Scroll Interface */}
      <div className="fixed bottom-10 left-0 w-full hidden md:flex justify-center items-center gap-5 z-30 text-[10px] uppercase tracking-[2px] text-muted pointer-events-none">
        <span>Explorar Ecossistema</span>
        <div className="scroll-track-theme">
          <motion.div 
            className="scroll-thumb-theme"
            animate={{ top: ["0%", "70%", "0%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <span>Scroll Control</span>
      </div>

      {/* Tech Specs */}
      <div className="fixed bottom-10 right-10 hidden lg:block text-right font-mono text-[10px] text-white/10 z-30 leading-relaxed pointer-events-none">
        DS_SYSTEM: ACTIVE<br />
        GROWTH_MODE: SCALING<br />
        AI_CORE: INTEGRATED
      </div>

      {/* Hidden sections for scroll length */}
      <div className="h-[20vh]" />
    </div>
  );
}
