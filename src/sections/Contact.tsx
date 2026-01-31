import { Phone, MapPin, MessageSquare, Clock } from 'lucide-react';

const contactMethods = [
  {
    icon: MessageSquare,
    title: 'WhatsApp',
    value: '+216 98 29 78 35',
    href: 'https://wa.me/21698297835',
    external: true,
    color: 'bg-[#25D366]',
  },
  {
    icon: Phone,
    title: 'Téléphone',
    value: '+216 98 29 78 35',
    href: 'tel:+21698297835',
    external: false,
    color: 'bg-[#00ffff]',
  },
  {
    icon: MapPin,
    title: 'Adresse',
    value: 'Disponible sur demande',
    href: '#',
    external: false,
    color: 'bg-[#8a2be2]',
  },
  {
    icon: Clock,
    title: 'Horaires',
    value: 'Lun-Sam: 9h - 18h',
    href: '#',
    external: false,
    color: 'bg-[#00ff41]',
  },
];

export const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-[#141414]" aria-label="Contactez-Nous">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-['Orbitron'] text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Contactez-Nous
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.href}
              target={method.external ? '_blank' : undefined}
              rel={method.external ? 'noopener noreferrer' : undefined}
              className="flex items-center bg-[#0a0a0a] rounded-xl p-5 border border-[#222] hover:border-[#00ffff]/30 transition-all group"
            >
              <div
                className={`w-12 h-12 ${method.color} rounded-full flex items-center justify-center mr-4 flex-shrink-0`}
              >
                <method.icon className="w-5 h-5 text-black" />
              </div>
              <div>
                <h4 className="text-white font-semibold">{method.title}</h4>
                <p className="text-[#cccccc] text-sm">{method.value}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Quick CTA */}
        <div className="mt-12 text-center">
          <p className="text-[#cccccc] mb-6">
            Une question ? N&apos;hésitez pas à nous contacter directement sur WhatsApp pour une
            réponse rapide.
          </p>
          <a
            href="https://wa.me/21698297835"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold px-8 py-4 rounded-lg transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
            Discuter sur WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
