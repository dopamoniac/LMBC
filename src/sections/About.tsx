import { Shield, Truck, Sparkles, CheckCircle } from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'Sécurité Avancée',
    description: 'Freins efficaces et cadres renforcés conçus spécialement pour la sécurité des enfants.',
  },
  {
    icon: Truck,
    title: 'Service Local',
    description: 'Livraison rapide partout en Tunisie et service après-vente disponible.',
  },
  {
    icon: Sparkles,
    title: 'Design Plaisir',
    description: 'Des couleurs vives et des styles attrayants que les enfants adorent.',
  },
  {
    icon: CheckCircle,
    title: 'Prêt à Rouler',
    description: 'Vélos livrés assemblés et vérifiés, prêts à l\'emploi immédiatement.',
  },
];

export const About = () => {
  return (
    <section id="about" className="py-20 bg-[#0a0a0a]" aria-label="À Propos de LMCYCLE">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-['Orbitron'] text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Pourquoi LMCYCLE ?
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Content */}
          <div className="space-y-6">
            <p className="text-lg text-[#cccccc] leading-relaxed">
              Chez <strong className="text-white">LMCYCLE</strong>, nous savons que le premier vélo
              est un souvenir inoubliable. C&apos;est pourquoi nous proposons des vélos enfants
              alliant <span className="text-[#00ffff]">sécurité renforcée</span>,{' '}
              <span className="text-[#00ffff]">confort ergonomique</span> et{' '}
              <span className="text-[#00ffff]">design attrayant</span>.
            </p>
            <p className="text-lg text-[#cccccc] leading-relaxed">
              Nos vélos sont livrés assemblés et vérifiés, prêts à l&apos;emploi pour des balades en
              toute sérénité. Chaque modèle est sélectionné avec soin pour offrir le meilleur
              rapport qualité-prix.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-[#00ff41]">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Livraison rapide</span>
              </div>
              <div className="flex items-center gap-2 text-[#00ff41]">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Garantie incluse</span>
              </div>
              <div className="flex items-center gap-2 text-[#00ff41]">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Service après-vente</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#141414] border border-[#222]">
              <img
                src="https://z-cdn-media.chatglm.cn/files/e0e7ab66-82e1-482e-8a64-638a33d75f9c.jpeg?auth_key=1866098681-fad0b99d69174e6a8f4724ee116e053c-0-7294591651b3c88daf1bec0371610554"
                alt="Enfant heureux sur un vélo LMCYCLE"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#00ffff] to-[#8a2be2] rounded-lg -z-10 opacity-50" />
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-[#141414] rounded-xl p-6 border border-[#222] hover:border-[#00ffff]/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-[#0a0a0a] flex items-center justify-center mb-4 group-hover:bg-[#00ffff]/10 transition-colors">
                <value.icon className="w-6 h-6 text-[#00ffff]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
              <p className="text-[#cccccc] text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
