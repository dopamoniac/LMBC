import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronDown, Play, ArrowRight } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { TextReveal } from '@/components/ui/TextReveal';

interface HeroProps {
  onExplore: () => void;
}

export const Hero = ({ onExplore }: HeroProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const img = new Image();
    img.src = './images/hero.png';
    img.onload = () => setIsLoaded(true);
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
      aria-label="Section principale"
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: springY }}
      >
        <div
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: 'url(./images/hero.png)' }}
        >
          <div className="absolute inset-0 bg-[#111] -z-10" />
        </div>
      </motion.div>

      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0 z-[1]"
        style={{ opacity: springOpacity }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.7) 50%, rgba(10,10,10,0.95) 100%)',
          }}
        />
        
        {/* Animated aurora effect */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%]"
            style={{
              background: `
                radial-gradient(ellipse at 30% 20%, rgba(0,255,255,0.15) 0%, transparent 40%),
                radial-gradient(ellipse at 70% 80%, rgba(138,43,226,0.15) 0%, transparent 40%),
                radial-gradient(ellipse at 50% 50%, rgba(255,0,255,0.1) 0%, transparent 50%)
              `,
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        style={{ 
          scale: springScale,
          opacity: springOpacity,
        }}
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(0,255,255,0.1)] border border-[rgba(0,255,255,0.3)] mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse" />
          <span className="text-[#00ffff] text-sm font-medium">Nouvelle Collection 2025</span>
        </motion.div>

        {/* Main Title with Glitch Effect */}
        <motion.h1
          className="font-['Orbitron'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-wider relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="relative inline-block glitch" data-text="LMCYCLE">
            <span className="gradient-text-animated">LMCYCLE</span>
          </span>
        </motion.h1>

        {/* Subtitle with Text Reveal */}
        <motion.p
          className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-4 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <TextReveal delay={0.6}>
            Vélos Enfants Sécurisés & Design
          </TextReveal>
        </motion.p>

        <motion.p
          className="text-lg text-[#cccccc] mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Pour Petits Aventuriers
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <MagneticButton
            onClick={onExplore}
            className="group relative px-8 py-4 bg-[#00ff41] text-black font-bold text-lg rounded-lg overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(0,255,65,0.5)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Voir la Collection
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          </MagneticButton>

          <MagneticButton
            onClick={() => window.open('https://wa.me/21698297835', '_blank')}
            className="px-8 py-4 border-2 border-white/30 text-white font-bold text-lg rounded-lg hover:bg-white/10 hover:border-white/50 transition-all flex items-center gap-2"
          >
            <Play className="w-5 h-5" />
            Contact Rapide
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {[
            { value: '18+', label: 'Modèles' },
            { value: '5', label: 'Collections' },
            { value: '99', label: 'TND', prefix: 'À partir de ' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <motion.div
                className="text-3xl md:text-4xl font-bold text-[#00ffff]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2 + i * 0.1, type: 'spring' }}
              >
                {stat.prefix}{stat.value}
              </motion.div>
              <div className="text-sm text-[#cccccc] mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[#cccccc] text-sm">Défiler</span>
          <ChevronDown className="w-6 h-6 text-[#00ffff]" />
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 border border-[#00ffff]/20 rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-32 h-32 border border-[#ff00ff]/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-[#00ff41] rounded-full animate-ping" />
    </section>
  );
};
