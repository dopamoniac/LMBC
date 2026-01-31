import { useState } from 'react';
import { Minus, Plus, ShoppingCart, MessageSquare } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { CartItem } from '@/types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  totalPrice: number;
  onUpdateQuantity: (productId: number, change: number) => void;
  onRemove: (productId: number) => void;
  onClear: () => void;
  onCheckout: (notes: string) => void;
}

export const CartSidebar = ({
  isOpen,
  onClose,
  cart,
  totalPrice,
  onUpdateQuantity,
  onRemove,
  onClear,
  onCheckout,
}: CartSidebarProps) => {
  const [notes, setNotes] = useState('');

  const handleCheckout = () => {
    onCheckout(notes);
    setNotes('');
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md bg-[#141414] border-l border-[#222] flex flex-col p-0">
        <SheetHeader className="px-6 py-5 border-b border-[#222]">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-['Orbitron'] text-xl text-white flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Votre Panier
            </SheetTitle>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12 text-[#cccccc]">
              <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p>Votre panier est vide</p>
              <p className="text-sm mt-2 opacity-60">Ajoutez des produits pour commencer</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-4 border-b border-[#222] last:border-0"
                >
                  <div className="w-20 h-20 bg-[#1f1f1f] rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain p-2"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white truncate">{item.name}</h4>
                    <p className="text-[#00ff41] font-bold">{item.price} TND</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-7 h-7 bg-[#1f1f1f] border border-[#444] rounded flex items-center justify-center text-white hover:bg-[#333] transition-colors"
                        aria-label="Diminuer la quantité"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-white font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-7 h-7 bg-[#1f1f1f] border border-[#444] rounded flex items-center justify-center text-white hover:bg-[#333] transition-colors"
                        aria-label="Augmenter la quantité"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="text-[#ff4d4d] text-sm mt-2 hover:underline"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-[#222] p-6 space-y-4">
            <div>
              <label className="block text-sm text-[#cccccc] mb-2">
                Notes (Couleur, Livraison...)
              </label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex: Je veux le modèle rouge..."
                className="bg-[#1f1f1f] border-[#444] text-white placeholder:text-[#666] min-h-[80px] resize-none"
              />
            </div>

            <div className="flex justify-between items-center text-lg">
              <span className="text-white font-bold">Total:</span>
              <span className="text-[#00ff41] font-bold text-xl">{totalPrice} TND</span>
            </div>

            <Button
              onClick={handleCheckout}
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-6 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5" />
              Commander sur WhatsApp
            </Button>

            <Button
              onClick={onClear}
              variant="outline"
              className="w-full border-[#444] text-[#cccccc] hover:bg-[#1f1f1f] hover:text-white"
            >
              Vider le panier
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
