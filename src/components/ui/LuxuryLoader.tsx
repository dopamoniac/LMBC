import { useState, useEffect } from 'react';

interface LuxuryLoaderProps {
  onComplete?: () => void;
}

export const LuxuryLoader = ({ onComplete }: LuxuryLoaderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 500);
    }, 800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] transition-opacity duration-500 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="status"
      aria-live="polite"
      aria-label="Chargement en cours"
    >
      <div className="text-center">
        <div className="font-['Orbitron'] text-4xl font-black text-white mb-4 tracking-wider">
          LMCYCLE
        </div>
        <div className="w-10 h-10 border-4 border-[#1f1f1f] border-t-[#00ff41] rounded-full animate-spin mx-auto" />
        <p className="mt-4 text-[#cccccc] text-sm">Chargement...</p>
      </div>
    </div>
  );
};
