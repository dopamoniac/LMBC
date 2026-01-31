import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MessageSquare, Phone, ArrowLeft } from 'lucide-react';
import type { Product } from '@/types';
import { getFamilyProducts } from '@/data/products';

interface ProductDetailModalProps {
  product: Product | null;
  familyId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onVariantSelect: (product: Product) => void;
  onWhatsAppOrder: (product: Product) => void;
}

const PHONE_NUMBER = '+21698297835';

export const ProductDetailModal = ({
  product,
  familyId,
  isOpen,
  onClose,
  onVariantSelect,
  onWhatsAppOrder,
}: ProductDetailModalProps) => {
  if (!product || !familyId) return null;

  const familyProducts = getFamilyProducts(familyId);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-[#141414] border border-[#222] p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name} - Détails du produit</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Product Image */}
          <div className="aspect-square bg-[#0f0f0f] flex items-center justify-center p-8">
            <img
              src={product.image}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="p-8 flex flex-col">
            <h2 className="text-3xl font-bold text-white mb-2">{product.name}</h2>
            <p className="text-[#00ff41] text-2xl font-bold mb-4">{product.price} TND</p>
            <p className="text-[#cccccc] mb-6">{product.aura}</p>

            {/* Specs */}
            <div className="bg-[#0a0a0a] rounded-lg p-4 mb-6">
              <h4 className="text-white font-bold mb-3">Spécifications</h4>
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="text-[#cccccc] mb-1">
                  <span className="text-white">{key}:</span> {value}
                </div>
              ))}
            </div>

            {/* Variants */}
            {familyProducts.length > 1 && (
              <div className="mb-6">
                <h4 className="text-white font-bold mb-3">Autres Couleurs</h4>
                <div className="flex gap-2 flex-wrap">
                  {familyProducts.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => onVariantSelect(variant)}
                      className={`w-16 h-16 bg-[#0a0a0a] rounded-lg overflow-hidden border-2 transition-all ${
                        variant.id === product.id
                          ? 'border-[#00ffff]'
                          : 'border-transparent hover:border-[#333]'
                      }`}
                      aria-label={`Voir ${variant.name}`}
                      aria-pressed={variant.id === product.id}
                    >
                      <img
                        src={variant.image}
                        alt={variant.name}
                        className="w-full h-full object-contain p-2"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <Button
                onClick={() => onWhatsAppOrder(product)}
                className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-6"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Commander
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex-1 border-[#00ffff] text-black hover:bg-[#00ffff] font-bold py-6"
              >
                <a href={`tel:${PHONE_NUMBER}`}>
                  <Phone className="w-5 h-5 mr-2" />
                  Appeler
                </a>
              </Button>
            </div>

            <button
              onClick={onClose}
              className="mt-6 text-[#cccccc] hover:text-white flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à la collection
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
