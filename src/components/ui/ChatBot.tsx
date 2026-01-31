import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const botResponses: Record<string, string> = {
  bonjour: 'Bonjour! Bienvenue chez LMCYCLE. Comment puis-je vous aider aujourd\'hui?',
  hello: 'Hello! Welcome to LMCYCLE. How can I help you today?',
  prix: 'Nos vélos enfants sont à partir de 99 TND. Chaque modèle a différentes tailles disponibles. Souhaitez-vous plus de détails sur un modèle spécifique?',
  price: 'Our children\'s bikes start from 99 TND. Each model comes in different sizes. Would you like more details on a specific model?',
  taille: 'Pour choisir la bonne taille, utilisez notre calculateur dans la section "Guide Tailles". En général: 12" pour 2-4 ans, 16" pour 4-6 ans, 20" pour 5-8 ans.',
  size: 'To choose the right size, use our calculator in the "Size Guide" section. Generally: 12" for ages 2-4, 16" for ages 4-6, 20" for ages 5-8.',
  livraison: 'Nous livrons partout en Tunisie. La livraison est rapide et soignée. Contactez-nous sur WhatsApp pour plus de détails!',
  delivery: 'We deliver throughout Tunisia. Delivery is fast and careful. Contact us on WhatsApp for more details!',
  moto: 'La collection MOTO BIKE est parfaite pour les petits aventuriers! Disponible en rouge et vert, à partir de 99 TND.',
  frozen: 'La collection FROZEN ravira les fans de princesses! Modèles roses disponibles en 12" et 16".',
  jexica: 'JEXICA offre des vélos sportifs aux couleurs vives: rouge, orange, vert et bleu. Parfait pour les enfants actifs!',
  power: 'POWER BIKE combine style et performance. Disponible en 5 couleurs différentes pour tous les goûts!',
  ty: 'TY BIKE sont légers et maniables, idéaux pour les débutants. Disponibles en rouge, bleu et rose.',
  contact: 'Vous pouvez nous contacter sur WhatsApp au +216 98 29 78 35 ou par téléphone au même numéro.',
  whatsapp: 'Notre WhatsApp: +216 98 29 78 35. N\'hésitez pas à nous écrire pour toute question!',
  aide: 'Je peux vous aider avec: les prix, les tailles, les modèles disponibles, la livraison, ou vous mettre en contact avec notre équipe. Que souhaitez-vous savoir?',
  help: 'I can help you with: prices, sizes, available models, delivery, or connect you with our team. What would you like to know?',
};

const findResponse = (input: string): string => {
  const lowerInput = input.toLowerCase();
  
  for (const [key, response] of Object.entries(botResponses)) {
    if (lowerInput.includes(key)) {
      return response;
    }
  }
  
  return 'Je suis désolé, je n\'ai pas compris. Essayez de me demander sur: les prix, les tailles, les modèles (MOTO, FROZEN, JEXICA, POWER, TY), la livraison, ou le contact. / I\'m sorry, I didn\'t understand. Try asking about: prices, sizes, models (MOTO, FROZEN, JEXICA, POWER, TY), delivery, or contact.';
};

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Bonjour! Je suis LMCYCLE Bot. Comment puis-je vous aider aujourd\'hui?',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: findResponse(input),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-5 w-14 h-14 rounded-full bg-gradient-to-r from-[#00ffff] to-[#8a2be2] flex items-center justify-center text-white shadow-lg z-[997]"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={!isOpen ? { y: [0, -5, 0] } : {}}
        transition={{ repeat: !isOpen ? Infinity : 0, duration: 2 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-40 right-5 w-[350px] max-w-[calc(100vw-40px)] bg-[#141414] border border-[#333] rounded-2xl overflow-hidden shadow-2xl z-[996]"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#00ffff]/20 to-[#8a2be2]/20 border-b border-[#333]">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00ffff] to-[#8a2be2] flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">LMCYCLE Bot</h3>
                <p className="text-xs text-[#00ff41] flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  En ligne
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[300px] overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  className={`flex gap-2 ${msg.isBot ? '' : 'flex-row-reverse'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.isBot
                        ? 'bg-gradient-to-r from-[#00ffff] to-[#8a2be2]'
                        : 'bg-[#333]'
                    }`}
                  >
                    {msg.isBot ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
                  </div>
                  <div
                    className={`max-w-[70%] p-3 rounded-2xl text-sm ${
                      msg.isBot
                        ? 'bg-[#1f1f1f] text-white rounded-tl-none'
                        : 'bg-[#00ffff] text-black rounded-tr-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div className="flex gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00ffff] to-[#8a2be2] flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-[#1f1f1f] p-3 rounded-2xl rounded-tl-none flex gap-1">
                    <motion.div
                      className="w-2 h-2 bg-[#cccccc] rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.5 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-[#cccccc] rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-[#cccccc] rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }}
                    />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[#333] flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Écrivez un message..."
                className="flex-1 px-4 py-2 bg-[#1f1f1f] border border-[#333] rounded-full text-white text-sm placeholder:text-[#666] focus:border-[#00ffff] focus:outline-none"
              />
              <Button
                onClick={handleSend}
                size="icon"
                className="w-10 h-10 rounded-full bg-[#00ffff] hover:bg-[#00cccc] text-black"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
