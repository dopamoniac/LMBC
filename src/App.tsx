import { useState, useCallback, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Hooks
import { useCart } from '@/hooks/useCart';
import { useScroll } from '@/hooks/useScroll';

// UI Components
import { LuxuryLoader } from '@/components/ui/LuxuryLoader';
import { ParticleBackground } from '@/components/ui/ParticleBackground';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { FloatingActions } from '@/components/ui/FloatingActions';
import { CartSidebar } from '@/components/ui/CartSidebar';
import { ProductDetailModal } from '@/components/ui/ProductDetailModal';

import { BackToTop } from '@/components/ui/BackToTop';
import { Confetti } from '@/components/ui/Confetti';
import { ChatBot } from '@/components/ui/ChatBot';

// Sections
import { Navigation } from '@/sections/Navigation';
import { Hero } from '@/sections/Hero';
import { Catalogue } from '@/sections/Catalogue';
import { SizeGuide } from '@/sections/SizeGuide';
import { About } from '@/sections/About';
import { Contact } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';

// Types
import type { Product } from '@/types';

const WHATSAPP_NUMBER = '21698297835';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedFamilyId, setSelectedFamilyId] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);

  const { cart, totalItems, totalPrice, addToCart, updateQuantity, removeFromCart, clearCart, generateWhatsAppMessage } = useCart();
  const { showBackToTop, scrollToTop, scrollToSection } = useScroll();

  // Load loyalty points
  useEffect(() => {
    const saved = localStorage.getItem('lmcycle-loyalty');
    if (saved) setLoyaltyPoints(parseInt(saved));
  }, []);

  const handleLoaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleAddToCart = useCallback((product: Product) => {
    addToCart(product);
    
    // Add loyalty points
    const newPoints = loyaltyPoints + 10;
    setLoyaltyPoints(newPoints);
    localStorage.setItem('lmcycle-loyalty', newPoints.toString());
    
    toast.success(`${product.name} ajouté au panier!`, {
      description: `+10 points de fidélité! Total: ${newPoints} points`,
      icon: '🎉',
    });

    // Show confetti for first item
    if (cart.length === 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [addToCart, cart.length, loyaltyPoints]);

  const handleViewDetail = useCallback((product: Product, familyId: string) => {
    setSelectedProduct(product);
    setSelectedFamilyId(familyId);
    setIsDetailOpen(true);
  }, []);



  const handleVariantSelect = useCallback((product: Product) => {
    setSelectedProduct(product);
  }, []);

  const handleWhatsAppOrder = useCallback((product: Product) => {
    const message = `Bonjour, je suis intéressé par le modèle : ${product.name} (${product.price} TND).`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  }, []);

  const handleCartCheckout = useCallback((notes: string) => {
    if (cart.length === 0) {
      toast.error('Votre panier est vide');
      return;
    }
    
    // Bonus points for checkout
    const bonusPoints = cart.length * 50;
    const newPoints = loyaltyPoints + bonusPoints;
    setLoyaltyPoints(newPoints);
    localStorage.setItem('lmcycle-loyalty', newPoints.toString());
    
    const message = generateWhatsAppMessage(notes);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
    
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    
    toast.success(`Commande initiée! +${bonusPoints} points bonus!`, {
      description: `Total fidélité: ${newPoints} points`,
    });
    
    setIsCartOpen(false);
  }, [cart, generateWhatsAppMessage, loyaltyPoints]);

  const handleNavigate = useCallback((sectionId: string) => {
    scrollToSection(sectionId);
  }, [scrollToSection]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query) {
      toast.info(`Recherche: "${query}"`);
      scrollToSection('catalogue');
    }
  }, [scrollToSection]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white custom-cursor">
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#141414',
            color: '#fff',
            border: '1px solid #333',
          },
        }}
        richColors
      />
      
      {isLoading && <LuxuryLoader onComplete={handleLoaderComplete} />}

      {/* Visual Effects */}
      <ParticleBackground />
      <CustomCursor />
      <ScrollProgress />
      <Confetti trigger={showConfetti} />

      <Navigation
        cartCount={totalItems}
        onCartClick={() => setIsCartOpen(true)}
        onNavigate={handleNavigate}
        onSearch={handleSearch}
      />

      <main>
        <Hero onExplore={() => handleNavigate('catalogue')} />
        <Catalogue 
          onAddToCart={handleAddToCart} 
          onViewDetail={handleViewDetail}
          searchQuery={searchQuery}
        />
        <SizeGuide />
        <About />
        <Contact />
      </main>

      <Footer />

      {/* Floating Elements */}
      <FloatingActions />
      <ChatBot />

      {/* Modals */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        totalPrice={totalPrice}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onClear={clearCart}
        onCheckout={handleCartCheckout}
      />

      <ProductDetailModal
        product={selectedProduct}
        familyId={selectedFamilyId}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onVariantSelect={handleVariantSelect}
        onWhatsAppOrder={handleWhatsAppOrder}
      />



      <BackToTop isVisible={showBackToTop} onClick={scrollToTop} />

      {/* Loyalty Points Indicator */}
      <AnimatePresence>
        {loyaltyPoints > 0 && (
          <motion.div
            className="fixed top-24 right-5 z-[995]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
          >
            <div className="glass rounded-full px-4 py-2 flex items-center gap-2">
              <span className="text-[#ffd700]">⭐</span>
              <span className="text-white font-bold">{loyaltyPoints}</span>
              <span className="text-[#cccccc] text-sm">points</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Cart Button */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.button
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-5 right-20 w-14 h-14 rounded-full bg-gradient-to-r from-[#00ffff] to-[#8a2be2] flex items-center justify-center text-white shadow-lg z-[999] md:hidden"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Ouvrir le panier (${totalItems} articles)`}
          >
            <motion.span
              className="absolute -top-1 -right-1 w-5 h-5 bg-[#00ff41] text-[#0a0a0a] text-xs font-bold rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              {totalItems}
            </motion.span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Vercel Speed Insights */}
      <SpeedInsights />
    </div>
  );
}

export default App;
