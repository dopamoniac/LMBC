import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  rotation: number;
  delay: number;
}

interface ConfettiProps {
  trigger: boolean;
  onComplete?: () => void;
}

const colors = ['#00ffff', '#ff00ff', '#00ff41', '#8a2be2', '#ff6600', '#ffff00'];

export const Confetti = ({ trigger, onComplete }: ConfettiProps) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (trigger) {
      const newPieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        delay: Math.random() * 0.5,
      }));
      setPieces(newPieces);

      setTimeout(() => {
        setPieces([]);
        onComplete?.();
      }, 3500);
    }
  }, [trigger, onComplete]);

  return (
    <AnimatePresence>
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="fixed w-3 h-3 z-[9999]"
          style={{
            left: `${piece.x}%`,
            top: -20,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
          }}
          initial={{ y: -20, rotate: 0, opacity: 1 }}
          animate={{
            y: window.innerHeight + 20,
            rotate: piece.rotation + 720,
            opacity: [1, 1, 0],
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 3,
            delay: piece.delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      ))}
    </AnimatePresence>
  );
};
