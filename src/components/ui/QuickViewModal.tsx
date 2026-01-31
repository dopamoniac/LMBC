import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, MessageSquare, Share2, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import type { Product } from '@/types';
import { getFamilyProducts } from '@/data/products';
import { WishlistButton } from './WishlistButton';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onWhatsAppOrder: (product: Product) => void;
}

export const QuickViewModal = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onWhatsAppOrder,
}: QuickViewModalProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!product) return null;

  const familyProducts = getFamilyProducts(
    ['moto-bike', 'jexica', 'power-bike', 'ty-bike', 'frozen'].find((id) =>
      getFamilyProducts(id).some((p) => p.id === product.id)
    ) || 'moto-bike'
  );

  const images = [product.image, ...familyProducts.filter((p) => p.id !== product.id).map((p) => p.image)].slice(0, 4);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-4 md:inset-10 lg:inset-20 bg-[#141414] rounded-2xl z-[101] overflow-hidden flex flex-col"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#222]">
              <h2 className="font-['Orbitron'] text-xl text-white">Aperçu Rapide</h2>
              <div className="flex items-center gap-2">
                <WishlistButton productId={product.id} />
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-[#1f1f1f] flex items-center justify-center text-white hover:bg-[#333] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Images */}
                <div className="space-y-4">
                  <div
                    className="relative aspect-square bg-[#0f0f0f] rounded-xl overflow-hidden cursor-zoom-in"
                    onClick={() => setIsZoomed(!isZoomed)}
                  >
                    <motion.img
                      src={images[selectedImage]}
                      alt={product.name}
                      className="w-full h-full object-contain p-4"
                      animate={{ scale: isZoomed ? 1.5 : 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute top-4 right-4">
                      <ZoomIn className="w-5 h-5 text-white/50" />
                    </div>
                  </div>

                  {/* Thumbnails */}
                  <div className="flex gap-2">
                    {images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === i
                            ? 'border-[#00ffff]'
                            : 'border-transparent hover:border-[#333]'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-contain p-2 bg-[#0f0f0f]" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">{product.name}</h3>
                    <p className="text-[#00ffff] text-lg">{product.aura}</p>
                  </div>

                  <div className="text-4xl font-bold text-[#00ff41]">{product.price} TND</div>

                  <div className="bg-[#0a0a0a] rounded-xl p-4 space-y-2">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-[#cccccc]">{key}</span>
                        <span className="text-white font-medium">{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <Button
                      onClick={() => onAddToCart(product)}
                      className="w-full bg-white hover:bg-[#00ff41] text-black font-bold py-6 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Ajouter au Panier
                    </Button>

                    <Button
                      onClick={() => onWhatsAppOrder(product)}
                      className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-6 flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-5 h-5" />
                      Commander sur WhatsApp
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-[#444] text-[#cccccc] hover:bg-[#1f1f1f]"
                      onClick={() => {
                        navigator.share?.({
                          title: product.name,
                          text: `Découvrez le ${product.name} chez LMCYCLE!`,
                          url: window.location.href,
                        }).catch(() => {
                          navigator.clipboard.writeText(window.location.href);
                        });
                      }}
                    >
                      <Share2 className="w-5 h-5 mr-2" />
                      Partager
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
