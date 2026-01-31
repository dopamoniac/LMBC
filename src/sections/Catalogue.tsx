import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Grid3X3, List, Sparkles } from 'lucide-react';
import { productFamilies, products } from '@/data/products';
import { TiltCard } from '@/components/ui/TiltCard';
import { WishlistButton } from '@/components/ui/WishlistButton';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import type { Product } from '@/types';

interface CatalogueProps {
  onAddToCart: (product: Product) => void;
  onViewDetail: (product: Product, familyId: string) => void;
  searchQuery?: string;
}

export const Catalogue = ({ onAddToCart, onViewDetail, searchQuery = '' }: CatalogueProps) => {
  const [selectedFamily, setSelectedFamily] = useState<string | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const filteredProducts = useMemo(() => {
    let filtered = products;
    
    if (selectedFamily !== 'all') {
      const family = productFamilies.find((f) => f.id === selectedFamily);
      if (family) {
        filtered = products.filter((p) => family.productIds.includes(p.id));
      }
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.aura.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [selectedFamily, searchQuery]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <section id="catalogue" className="py-24 bg-[#0a0a0a] relative overflow-hidden" aria-label="Notre Collection">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-50" />
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00ffff]/10 border border-[#00ffff]/30 mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-[#00ffff]" />
            <span className="text-[#00ffff] text-sm font-medium">Collection Exclusive</span>
          </motion.div>
          
          <h2 className="font-['Orbitron'] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            <span className="gradient-text">Notre Collection</span>
          </h2>
          <p className="text-[#cccccc] text-lg max-w-2xl mx-auto">
            Découvrez notre gamme complète de vélos enfants, conçus pour allier sécurité, confort et style.
          </p>
        </motion.div>

        {/* Filters & Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-12">
          {/* Family Filter */}
          <div className="flex flex-wrap gap-2">
            <motion.button
              onClick={() => setSelectedFamily('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedFamily === 'all'
                  ? 'bg-[#00ffff] text-black'
                  : 'bg-[#1f1f1f] text-white hover:bg-[#333]'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Tous
            </motion.button>
            {productFamilies.map((family) => (
              <motion.button
                key={family.id}
                onClick={() => setSelectedFamily(family.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedFamily === family.id
                    ? 'bg-[#00ffff] text-black'
                    : 'bg-[#1f1f1f] text-white hover:bg-[#333]'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {family.name}
              </motion.button>
            ))}
          </div>

          {/* View Mode */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-[#666] text-sm mr-2">
              <AnimatedCounter value={filteredProducts.length} /> produits
            </span>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-[#00ffff] text-black' : 'bg-[#1f1f1f] text-white'
              }`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-[#00ffff] text-black' : 'bg-[#1f1f1f] text-white'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedFamily}-${viewMode}-${searchQuery}`}
            className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
            }`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                layout
              >
                <TiltCard
                  className={`h-full ${
                    viewMode === 'list' ? 'holo-card' : ''
                  }`}
                  tiltAmount={viewMode === 'grid' ? 8 : 4}
                >
                  <div
                    className={`group relative bg-[#141414] rounded-xl overflow-hidden border border-[#222] hover:border-[#00ffff]/50 transition-all duration-300 ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    {/* Image */}
                    <div
                      className={`relative overflow-hidden bg-[#0f0f0f] ${
                        viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'
                      }`}
                    >
                      <motion.img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain p-4"
                        animate={{
                          scale: hoveredProduct === product.id ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.4 }}
                      />
                      
                      {/* Overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredProduct === product.id ? 1 : 0 }}
                      />

                      {/* Wishlist */}
                      <div className="absolute top-3 right-3">
                        <WishlistButton productId={product.id} />
                      </div>

                      {/* Quick View */}
                      <motion.button
                        className="absolute bottom-3 left-3 right-3 py-2 bg-[#00ffff] text-black font-bold text-sm rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: hoveredProduct === product.id ? 1 : 0,
                          y: hoveredProduct === product.id ? 0 : 20,
                        }}
                        onClick={() => onViewDetail(product, 'moto-bike')}
                      >
                        Aperçu Rapide
                      </motion.button>
                    </div>

                    {/* Info */}
                    <div className={`p-4 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-center' : ''}`}>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-white group-hover:text-[#00ffff] transition-colors">
                          {product.name}
                        </h3>
                      </div>
                      
                      <p className="text-[#00ffff] text-sm mb-2">{product.aura}</p>
                      
                      {viewMode === 'list' && (
                        <p className="text-[#666] text-sm mb-4">
                          {Object.entries(product.specs).map(([k, v]) => `${k}: ${v}`).join(' • ')}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-[#00ff41]">
                          {product.price} TND
                        </span>
                        
                        <MagneticButton
                          onClick={() => onAddToCart(product)}
                          className="px-4 py-2 bg-white text-black font-bold text-sm rounded-lg hover:bg-[#00ff41] transition-colors"
                          strength={0.2}
                        >
                          Ajouter
                        </MagneticButton>
                      </div>
                    </div>

                    {/* Holographic Effect */}
                    {viewMode === 'list' && (
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#00ffff]/5 via-transparent to-[#ff00ff]/5" />
                      </div>
                    )}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Filter className="w-16 h-16 mx-auto text-[#333] mb-4" />
            <h3 className="text-xl text-white mb-2">Aucun produit trouvé</h3>
            <p className="text-[#666]">Essayez de modifier vos critères de recherche</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
