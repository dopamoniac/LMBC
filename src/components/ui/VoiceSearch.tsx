import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X, Search } from 'lucide-react';

// Type declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
  interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onstart: (() => void) | null;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
    onend: (() => void) | null;
    start(): void;
    stop(): void;
  }
  interface SpeechRecognitionEvent extends Event {
    resultIndex: number;
    results: SpeechRecognitionResultList;
  }
  interface SpeechRecognitionErrorEvent extends Event {
    error: string;
  }
}

interface VoiceSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const VoiceSearch = ({ onSearch, placeholder = 'Rechercher un vélo...' }: VoiceSearchProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('La reconnaissance vocale n\'est pas supportée sur ce navigateur');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'fr-FR';

    recognitionRef.current.onstart = () => {
      setIsListening(true);
      setError(null);
      setTranscript('');
    };

    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      const current = event.resultIndex;
      const transcriptText = event.results[current][0].transcript;
      setTranscript(transcriptText);
      
      if (event.results[current].isFinal) {
        onSearch(transcriptText);
        setIsListening(false);
      }
    };

    recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      setError('Erreur de reconnaissance vocale');
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current.start();
  }, [onSearch]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666]" />
          <input
            type="text"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-3 bg-[#141414] border border-[#333] rounded-lg text-white placeholder:text-[#666] focus:border-[#00ffff] focus:outline-none transition-colors"
          />
        </div>
        
        <motion.button
          onClick={isListening ? stopListening : startListening}
          className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
            isListening
              ? 'bg-[#ff3366] text-white'
              : 'bg-[#1f1f1f] text-[#cccccc] hover:bg-[#333]'
          }`}
          whileTap={{ scale: 0.95 }}
          animate={isListening ? { scale: [1, 1.1, 1] } : {}}
          transition={{ repeat: isListening ? Infinity : 0, duration: 0.5 }}
        >
          {isListening ? <X className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isListening && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 p-4 bg-[#141414] border border-[#00ffff] rounded-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-[#00ffff] rounded-full"
                    animate={{
                      height: [10, 30, 10],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.5,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
              <span className="text-[#cccccc]">Écoute en cours...</span>
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 p-3 bg-[#ff3366]/20 border border-[#ff3366] rounded-lg text-[#ff3366] text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
