import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface WishlistButtonProps {
  productId: number;
  className?: string;
}

const WISHLIST_KEY = 'lmcycle-wishlist';

export const WishlistButton = ({ productId, className = '' }: WishlistButtonProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
    setIsWishlisted(wishlist.includes(productId));
  }, [productId]);

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
    
    if (isWishlisted) {
      const newWishlist = wishlist.filter((id: number) => id !== productId);
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(newWishlist));
    } else {
      wishlist.push(productId);
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 1000);
    }
    
    setIsWishlisted(!isWishlisted);
  };

  return (
    <motion.button
      onClick={toggleWishlist}
      className={`relative ${className}`}
      whileTap={{ scale: 0.9 }}
      aria-label={isWishlisted ? 'Retirer des favoris' : 'Ajouter aux favoris'}
    >
      <Heart
        className={`w-6 h-6 transition-colors ${
          isWishlisted ? 'fill-[#ff3366] text-[#ff3366]' : 'text-[#cccccc] hover:text-white'
        }`}
      />
      
      <AnimatePresence>
        {showAnimation && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Heart className="w-6 h-6 fill-[#ff3366] text-[#ff3366]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Particle burst on add */}
      <AnimatePresence>
        {showAnimation && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-1 h-1 bg-[#ff3366] rounded-full"
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: Math.cos((i * 60 * Math.PI) / 180) * 30,
                  y: Math.sin((i * 60 * Math.PI) / 180) * 30,
                  opacity: 0,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
