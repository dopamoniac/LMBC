import { useState } from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types';
import { getFamilyProducts } from '@/data/products';

interface ProductCardProps {
  product: Product;
  familyId: string;
  onAddToCart: (product: Product) => void;
  onViewDetail: (product: Product, familyId: string) => void;
}

export const ProductCard = ({ product, familyId, onAddToCart, onViewDetail }: ProductCardProps) => {
  const [selectedProduct, setSelectedProduct] = useState(product);
  const familyProducts = getFamilyProducts(familyId);

  const handleVariantChange = (newProduct: Product) => {
    setSelectedProduct(newProduct);
  };

  return (
    <div className="bg-[#0a0a0a] rounded-xl overflow-hidden border border-[#222] shadow-lg hover:shadow-xl transition-shadow">
      {/* Family Header */}
      <div className="px-6 py-4 bg-[#141414] border-b border-[#222]">
        <h3 className="font-['Orbitron'] text-xl font-bold text-white">
          {product.name.split(' ')[0]}
        </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6 p-6">
        {/* Product Image */}
        <div
          className="relative aspect-square bg-[#0f0f0f] rounded-lg overflow-hidden cursor-pointer group border border-[#333] hover:border-[rgba(0,255,255,0.3)] transition-all"
          onClick={() => onViewDetail(selectedProduct, familyId)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onViewDetail(selectedProduct, familyId)}
          aria-label={`Voir les détails de ${selectedProduct.name}`}
        >
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-full h-full object-contain p-4 transition-transform duration-400 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Eye className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <h4 className="text-2xl font-bold text-white mb-1">{selectedProduct.name}</h4>
          <p className="text-[#00ffff] text-sm font-semibold uppercase tracking-wide mb-4">
            {selectedProduct.aura}
          </p>
          <p className="text-3xl font-bold text-[#00ff41] mb-6">{selectedProduct.price} TND</p>

          {/* Specs */}
          <div className="bg-[#141414] rounded-lg p-4 mb-6">
            {Object.entries(selectedProduct.specs).map(([key, value]) => (
              <div key={key} className="flex justify-between py-1 border-b border-[#222] last:border-0">
                <span className="text-[#cccccc] text-sm">{key}</span>
                <span className="text-white text-sm font-medium">{value}</span>
              </div>
            ))}
          </div>

          {/* Variants */}
          <div className="mb-6">
            <h5 className="text-white text-sm font-bold uppercase mb-3">Couleurs Disponibles</h5>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              {familyProducts.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => handleVariantChange(variant)}
                  className={`relative aspect-square bg-[#141414] rounded-lg overflow-hidden border-2 transition-all ${
                    variant.id === selectedProduct.id
                      ? 'border-[#00ffff] ring-2 ring-[#00ffff]/20'
                      : 'border-transparent hover:border-[#333]'
                  }`}
                  aria-label={`Sélectionner ${variant.name}`}
                  aria-pressed={variant.id === selectedProduct.id}
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

          {/* Add to Cart */}
          <Button
            onClick={() => onAddToCart(selectedProduct)}
            className="w-full bg-white hover:bg-[#00ff41] text-black font-bold py-6 flex items-center justify-center gap-2 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            Ajouter au panier
          </Button>
        </div>
      </div>
    </div>
  );
};
