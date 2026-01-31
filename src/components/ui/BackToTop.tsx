import { ArrowUp } from 'lucide-react';

interface BackToTopProps {
  isVisible: boolean;
  onClick: () => void;
}

export const BackToTop = ({ isVisible, onClick }: BackToTopProps) => {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-5 right-5 w-11 h-11 rounded-full bg-[#141414] border border-[#444] text-white flex items-center justify-center transition-all duration-300 z-[998] hover:bg-[#00ffff] hover:text-black hover:border-[#00ffff] ${
        isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      aria-label="Retour en haut de page"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};
