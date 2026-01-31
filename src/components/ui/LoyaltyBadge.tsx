import { motion } from 'framer-motion';
import { Star, Trophy, Zap, Crown } from 'lucide-react';

interface LoyaltyBadgeProps {
  points: number;
  className?: string;
}

const getTier = (points: number) => {
  if (points >= 1000) return { name: 'Légende', icon: Crown, color: '#ffd700' };
  if (points >= 500) return { name: 'Pro', icon: Trophy, color: '#c0c0c0' };
  if (points >= 200) return { name: 'Expert', icon: Star, color: '#cd7f32' };
  return { name: 'Débutant', icon: Zap, color: '#00ffff' };
};

export const LoyaltyBadge = ({ points, className = '' }: LoyaltyBadgeProps) => {
  const tier = getTier(points);
  const Icon = tier.icon;
  const nextTier = points < 200 ? 200 : points < 500 ? 500 : points < 1000 ? 1000 : null;
  const progress = nextTier ? (points / nextTier) * 100 : 100;

  return (
    <motion.div
      className={`glass rounded-xl p-4 ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center gap-3 mb-3">
        <motion.div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${tier.color}20`, border: `2px solid ${tier.color}` }}
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Icon className="w-6 h-6" style={{ color: tier.color }} />
        </motion.div>
        <div>
          <p className="text-white font-bold">{tier.name}</p>
          <p className="text-[#cccccc] text-sm">{points} points</p>
        </div>
      </div>

      {nextTier && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-[#cccccc]">
            <span>Progression</span>
            <span>{points} / {nextTier}</span>
          </div>
          <div className="h-2 bg-[#1f1f1f] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: tier.color }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};
