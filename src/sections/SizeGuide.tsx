import { useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Calculator, Ruler, Info, Bike, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { sizeGuideData } from '@/data/products';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { TiltCard } from '@/components/ui/TiltCard';

const ageOptions = [
  { value: '2', label: '2 ans' },
  { value: '3', label: '3 ans' },
  { value: '4', label: '4 ans' },
  { value: '5', label: '5 ans' },
  { value: '6', label: '6 ans' },
  { value: '7', label: '7 ans' },
  { value: '8', label: '8 ans' },
  { value: '9+', label: '9 ans et plus' },
];

interface CalculatorResult {
  size: string;
  details: string;
  recommendedModels: string[];
}

export const SizeGuide = () => {
  const [selectedAge, setSelectedAge] = useState('');
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [activeTab, setActiveTab] = useState<'table' | 'calculator'>('table');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const calculateSize = (age: string): CalculatorResult | null => {
    const ageNum = parseInt(age);
    if (isNaN(ageNum)) return null;

    if (ageNum <= 2) {
      return {
        size: '12 pouces',
        details: 'Pour les tout-petits (2-4 ans) • 85-100 cm',
        recommendedModels: ['MOTO BIKE', 'FROZEN'],
      };
    } else if (ageNum === 3) {
      return {
        size: '14 pouces',
        details: 'Pour les jeunes enfants (3-5 ans) • 95-110 cm',
        recommendedModels: ['MOTO BIKE', 'FROZEN', 'JEXICA'],
      };
    } else if (ageNum >= 4 && ageNum <= 6) {
      return {
        size: '16 pouces',
        details: 'Idéal pour les enfants (4-6 ans) • 105-120 cm',
        recommendedModels: ['MOTO BIKE', 'JEXICA', 'POWER BIKE', 'TY BIKE', 'FROZEN'],
      };
    } else if (ageNum >= 7 && ageNum <= 8) {
      return {
        size: '20 pouces',
        details: 'Pour les plus grands (5-8 ans) • 115-135 cm',
        recommendedModels: ['JEXICA', 'POWER BIKE', 'TY BIKE', 'FROZEN'],
      };
    } else {
      return {
        size: '24 pouces',
        details: 'Enfants (7-10 ans) • 130-150 cm',
        recommendedModels: ['JEXICA', 'POWER BIKE', 'TY BIKE'],
      };
    }
  };

  const handleCalculate = () => {
    if (selectedAge) {
      const calcResult = calculateSize(selectedAge);
      setResult(calcResult);
    }
  };

  return (
    <section
      ref={containerRef}
      id="sizeGuide"
      className="py-24 bg-[#0a0a0a] relative overflow-hidden"
      aria-label="Guide des Tailles"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ y: backgroundY }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 20% 50%, rgba(0,255,255,0.1) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 50%, rgba(138,43,226,0.1) 0%, transparent 50%)
            `,
          }}
        />
      </motion.div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00ff41]/10 border border-[#00ff41]/30 mb-6"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            <Ruler className="w-4 h-4 text-[#00ff41]" />
            <span className="text-[#00ff41] text-sm font-medium">Guide Expert</span>
          </motion.div>

          <h2 className="font-['Orbitron'] text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="gradient-text">Guide des Tailles</span>
          </h2>
          <p className="text-[#cccccc] text-lg max-w-2xl mx-auto">
            Choisir la bonne taille est essentiel pour la sécurité et le confort de votre enfant.
            Utilisez nos outils pour trouver le vélo parfait.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('table')}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeTab === 'table'
                ? 'bg-[#00ffff] text-black'
                : 'bg-[#1f1f1f] text-white hover:bg-[#333]'
            }`}
          >
            Tableau Complet
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
              activeTab === 'calculator'
                ? 'bg-[#00ff41] text-black'
                : 'bg-[#1f1f1f] text-white hover:bg-[#333]'
            }`}
          >
            <Calculator className="w-4 h-4" />
            Calculateur Intelligent
          </button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'table' ? (
            <motion.div
              key="table"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <TiltCard className="glass-strong rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-[#00ffff]/20 to-[#8a2be2]/20">
                        <th className="text-left py-5 px-6 text-[#00ffff] font-bold text-lg">
                          <div className="flex items-center gap-2">
                            <Bike className="w-5 h-5" />
                            Âge
                          </div>
                        </th>
                        <th className="text-left py-5 px-6 text-[#00ffff] font-bold text-lg">
                          <div className="flex items-center gap-2">
                            <Ruler className="w-5 h-5" />
                            Taille Enfant
                          </div>
                        </th>
                        <th className="text-left py-5 px-6 text-[#00ffff] font-bold text-lg">
                          Taille Vélo Recommandée
                        </th>
                        <th className="text-left py-5 px-6 text-[#00ffff] font-bold text-lg">
                          Modèles
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sizeGuideData.map((row, index) => (
                        <motion.tr
                          key={index}
                          className="border-b border-[#222] hover:bg-[#1f1f1f]/50 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: index * 0.1 }}
                        >
                          <td className="py-5 px-6">
                            <span className="text-white font-bold text-lg">{row.age}</span>
                          </td>
                          <td className="py-5 px-6 text-[#cccccc]">{row.height}</td>
                          <td className="py-5 px-6">
                            <motion.span
                              className="inline-flex items-center gap-2 px-4 py-2 bg-[#00ff41]/20 text-[#00ff41] font-bold rounded-full"
                              whileHover={{ scale: 1.05 }}
                            >
                              <CheckCircle className="w-4 h-4" />
                              {row.size}
                            </motion.span>
                          </td>
                          <td className="py-5 px-6">
                            <div className="flex flex-wrap gap-2">
                              {['MOTO', 'JEXICA', 'POWER', 'TY', 'FROZEN']
                                .slice(0, Math.min(3, index + 2))
                                .map((model) => (
                                  <span
                                    key={model}
                                    className="px-3 py-1 bg-[#1f1f1f] text-[#cccccc] text-sm rounded-full"
                                  >
                                    {model}
                                  </span>
                                ))}
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TiltCard>
            </motion.div>
          ) : (
            <motion.div
              key="calculator"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto"
            >
              <TiltCard className="glass-strong rounded-2xl p-8">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#00ffff] to-[#8a2be2] flex items-center justify-center">
                    <Calculator className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Calculateur Intelligent</h3>
                  <p className="text-[#cccccc]">Sélectionnez l&apos;âge de votre enfant</p>
                </div>

                <div className="space-y-6">
                  <Select value={selectedAge} onValueChange={setSelectedAge}>
                    <SelectTrigger className="bg-[#0a0a0a] border-[#333] text-white h-14 text-lg">
                      <SelectValue placeholder="Choisir l'âge" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0a0a0a] border-[#333]">
                      {ageOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="text-white hover:bg-[#1f1f1f] focus:bg-[#1f1f1f] h-12"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    onClick={handleCalculate}
                    disabled={!selectedAge}
                    className="w-full bg-gradient-to-r from-[#00ffff] to-[#8a2be2] hover:from-[#00cccc] hover:to-[#6a1fb2] text-white font-bold py-6 text-lg disabled:opacity-50"
                  >
                    Calculer la Taille Parfaite
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>

                  {result && (
                    <motion.div
                      className="mt-8 p-6 bg-gradient-to-r from-[#00ff41]/10 to-[#00ffff]/10 border border-[#00ff41]/30 rounded-xl"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <div className="text-center mb-4">
                        <p className="text-sm text-[#cccccc] mb-2">Taille recommandée</p>
                        <p className="text-4xl font-bold text-[#00ff41]">{result.size}</p>
                      </div>
                      <p className="text-[#cccccc] text-center mb-4">{result.details}</p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {result.recommendedModels.map((model) => (
                          <span
                            key={model}
                            className="px-3 py-1 bg-[#00ffff]/20 text-[#00ffff] text-sm rounded-full"
                          >
                            {model}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="mt-6 flex items-start gap-3 text-sm text-[#666]">
                  <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p>
                    Ce calculateur donne une estimation basée sur l&apos;âge moyen. Pour une
                    précision optimale, mesurez la taille de votre enfant et consultez notre
                    tableau complet.
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          {[
            { value: 6, suffix: '', label: 'Tailles disponibles' },
            { value: 18, suffix: '+', label: 'Modèles' },
            { value: 100, suffix: '%', label: 'Sécurité testée' },
            { value: 2, suffix: '-10', label: 'Ans recommandés' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="text-center p-6 bg-[#141414] rounded-xl border border-[#222]"
              whileHover={{ scale: 1.05, borderColor: 'rgba(0,255,255,0.3)' }}
            >
              <div className="text-3xl md:text-4xl font-bold text-[#00ffff] mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-[#cccccc]">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
