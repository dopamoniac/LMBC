import { Facebook, Instagram } from 'lucide-react';

const currentYear = new Date().getFullYear();

export const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] py-12 border-t border-[#222]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Logo */}
          <div className="font-['Orbitron'] text-3xl font-black bg-gradient-to-r from-[#00ffff] to-[#8a2be2] bg-clip-text text-transparent mb-6">
            LMCYCLE
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-8">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-[#141414] border border-[#333] flex items-center justify-center text-white hover:text-[#00ffff] hover:border-[#00ffff] transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-[#141414] border border-[#333] flex items-center justify-center text-white hover:text-[#00ffff] hover:border-[#00ffff] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
            <a href="#home" className="text-[#cccccc] hover:text-white transition-colors">
              Accueil
            </a>
            <a href="#catalogue" className="text-[#cccccc] hover:text-white transition-colors">
              Collection
            </a>
            <a href="#sizeGuide" className="text-[#cccccc] hover:text-white transition-colors">
              Guide Tailles
            </a>
            <a href="#about" className="text-[#cccccc] hover:text-white transition-colors">
              À Propos
            </a>
            <a href="#contact" className="text-[#cccccc] hover:text-white transition-colors">
              Contact
            </a>
          </div>

          {/* Copyright */}
          <div className="text-[#666] text-sm">
            <p>&copy; {currentYear} LMCYCLE. Vélos Enfants. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
