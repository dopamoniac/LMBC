import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Ruler, Search, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { VoiceSearch } from '@/components/ui/VoiceSearch';

interface NavigationProps {
  cartCount: number;
  onCartClick: () => void;
  onNavigate: (section: string) => void;
  onSearch?: (query: string) => void;
}

const navLinks = [
  { id: 'home', label: 'Accueil' },
  { id: 'catalogue', label: 'Collection' },
  { id: 'sizeGuide', label: 'Guide', icon: Ruler, highlight: true },
  { id: 'about', label: 'À Propos' },
  { id: 'contact', label: 'Contact' },
];

export const Navigation = ({ cartCount, onCartClick, onNavigate, onSearch }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  };

  const handleVoiceSearch = (query: string) => {
    onSearch?.(query);
    setIsSearchOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          isScrolled
            ? 'bg-[rgba(10,10,10,0.95)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.1)]'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.button
              onClick={() => handleNavClick('home')}
              className="font-['Orbitron'] text-2xl lg:text-3xl font-black tracking-wider relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="gradient-text">LMCYCLE</span>
              <motion.span
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#00ffff] to-[#8a2be2]"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className={`relative text-sm font-medium uppercase tracking-wide transition-colors flex items-center gap-1 group ${
                      link.highlight
                        ? 'text-[#00ff41] hover:text-[#00ff41]'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link.icon && <link.icon className="w-4 h-4" />}
                    {link.label}
                    <motion.span
                      className="absolute -bottom-1 left-0 h-0.5 bg-[#00ffff]"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.2 }}
                    />
                  </button>
                </motion.li>
              ))}
            </ul>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Search Toggle */}
              <motion.button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hidden lg:flex w-10 h-10 rounded-full bg-[#1f1f1f] items-center justify-center text-white hover:bg-[#333] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Rechercher"
              >
                <Search className="w-4 h-4" />
              </motion.button>

              {/* Cart */}
              <motion.button
                onClick={onCartClick}
                className="relative w-10 h-10 rounded-full bg-[#1f1f1f] flex items-center justify-center text-white hover:bg-[#333] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Panier (${cartCount} articles)`}
              >
                <ShoppingCart className="w-4 h-4" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      className="absolute -top-1 -right-1 w-5 h-5 bg-[#00ff41] text-[#0a0a0a] text-xs font-bold rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Mobile Menu Toggle */}
              <motion.button
                className="lg:hidden w-10 h-10 rounded-full bg-[#1f1f1f] flex items-center justify-center text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.9 }}
                aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              className="absolute top-full left-0 right-0 bg-[#141414] border-b border-[#333] p-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="max-w-xl mx-auto">
                <VoiceSearch onSearch={handleVoiceSearch} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[999] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-[80%] max-w-sm bg-[#141414] border-l border-[#333] p-6"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-['Orbitron'] text-xl gradient-text">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-[#1f1f1f] flex items-center justify-center text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6">
                <VoiceSearch onSearch={handleVoiceSearch} />
              </div>

              <ul className="space-y-2">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => handleNavClick(link.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                        link.highlight
                          ? 'bg-[#00ff41]/10 text-[#00ff41] border border-[#00ff41]/30'
                          : 'text-white hover:bg-[#1f1f1f]'
                      }`}
                    >
                      {link.icon && <link.icon className="w-5 h-5" />}
                      {link.label}
                      {link.highlight && <Sparkles className="w-4 h-4 ml-auto" />}
                    </button>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 pt-8 border-t border-[#333]">
                <button
                  onClick={() => {
                    onCartClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 rounded-lg bg-[#1f1f1f] text-white flex items-center justify-between"
                >
                  <span className="flex items-center gap-3">
                    <ShoppingCart className="w-5 h-5" />
                    Panier
                  </span>
                  {cartCount > 0 && (
                    <span className="bg-[#00ff41] text-black text-sm font-bold px-2 py-1 rounded">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
