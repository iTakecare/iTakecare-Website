// Landing page « Agents immobiliers » (angle mobilité : visites, estimations, signatures).
// Contenu provisoire : les textes marqués TODO sont à valider avant mise en ligne.
// Les packs viennent du catalogue https://www.itakecare.be/catalogue?tab=packs

export const immobilier = {
  slug: "immobilier",
  meta: {
    title: "Leasing informatique pour agents immobiliers — iTakecare",
    description:
      "MacBook, iPhone et iPad reconditionnés en leasing pour agents immobiliers et agences. Maintenance incluse, remplacement sous 24h.",
  },

  hero: {
    eyebrow: "Agents immobiliers & agences",
    // Le mot entre [crochets] est surligné en turquoise.
    title: "Votre bureau tient dans [un sac].",
    subtitle:
      "Visites, estimations, signatures : un MacBook et un iPhone qui suivent votre rythme, pour un loyer mensuel fixe.",
    bullets: [
      "Matériel Apple premium qui renforce votre image auprès des clients",
      "Remplacé sous 24h : jamais bloqué entre deux visites",
      "Zéro investissement : équipez un nouvel agent en quelques jours",
    ],
    cta: "Recevoir mon offre agent",
    priceFrom: "89,90",
    // TODO : remplacer par une vraie photo (agent devant un bien avec iPad/MacBook).
    image: null,
    imagePlaceholder: "Photo : agent immobilier en visite, iPad et MacBook en main",
  },

  painPoints: {
    title: "Vous vendez des biens. [Pas du temps perdu.]",
    items: [
      {
        icon: "slow",
        title: "Un portable trop lourd, trop lent",
        text: "Les photos HD et les dossiers de vente font ramer votre ordinateur en plein rendez-vous.",
      },
      {
        icon: "star",
        title: "Une image qui compte",
        text: "Présenter une estimation sur un vieil écran fissuré, ça ne rassure pas un vendeur.",
      },
      {
        icon: "wallet",
        title: "Chaque recrue coûte cher",
        text: "Équiper un nouvel agent, c'est plusieurs milliers d'euros à sortir d'un coup.",
      },
    ],
  },

  packs: {
    title: "Des packs pensés pour [le terrain]",
    subtitle:
      "Ordinateur, smartphone et accessoires réunis dans un seul loyer. Pour un agent seul ou toute l'agence, configurable sur devis.",
    items: [
      {
        name: "Pack iDiscovery",
        tagline: "L'agent nomade : léger, autonome, efficace",
        price: "89,90",
        image:
          "https://api.leazr.co/storage/v1/object/public/pack-images/company-c1ce66bb-3ad2-474d-b477-583baa7ff1c0/packs/image-1781526139571-nhf912jdldp.png",
        products: [
          "MacBook Air 13 M4",
          "iPhone 16 Pro Max",
          "Hub USB-C Ugreen Revodock 105",
          "Magic Mouse 2",
          "Microsoft Office 2024",
        ],
        url: "https://www.itakecare.be/catalogue/pack/fd591ae8-90ca-4668-9dd8-9c88984f9cb5",
      },
      {
        name: "Pack iExplore",
        tagline: "La puissance pour les photos, vidéos et visites virtuelles",
        price: "119,90",
        highlight: "Notre recommandation",
        image:
          "https://api.leazr.co/storage/v1/object/public/pack-images/company-c1ce66bb-3ad2-474d-b477-583baa7ff1c0/packs/image-1781526305170-ofs5io01iy9.png",
        products: [
          "MacBook Pro 14 M4",
          "iPhone 17 Pro Max",
          "Hub USB-C Ugreen Revodock 105",
          "Magic Mouse 2",
          "Microsoft Office 2024",
        ],
        url: "https://www.itakecare.be/catalogue/pack/8fa3a6d0-5daf-4237-a528-e1b469a44e6d",
      },
      {
        name: "Pack iOdyssey",
        tagline: "Le bureau complet, avec l'iPad pour les visites et signatures",
        price: "198,90",
        image:
          "https://api.leazr.co/storage/v1/object/public/pack-images/company-c1ce66bb-3ad2-474d-b477-583baa7ff1c0/packs/image-1781526104656-ge3jzuhq7ja.png",
        products: [
          "MacBook Pro 16 M4 Pro",
          "iPad Pro M4 11\" + Apple Pencil Pro",
          "iPhone 17 Pro Max",
          "AirPods 4",
          "Hub USB-C, Magic Mouse 2, Office 2024",
        ],
        url: "https://www.itakecare.be/catalogue/pack/a84c0e22-eab2-4bfb-a86b-8f779ee32da7",
      },
    ],
    note: "Prix HTVA par mois, leasing sur 36 mois. Maintenance, garantie et remplacement 24h inclus.",
  },

  benefits: {
    title: "Pourquoi les agences passent [au leasing]",
    items: [
      {
        icon: "star",
        title: "Une image premium",
        text: "Du matériel Apple récent, à la hauteur des biens que vous présentez.",
      },
      {
        icon: "refresh",
        title: "Toujours opérationnel",
        text: "Panne, casse ou sinistre : votre matériel est remplacé sous 24h.",
      },
      {
        icon: "wallet",
        title: "Trésorerie préservée",
        text: "Un loyer fixe par agent, sans investissement. Vous ajoutez du matériel quand vous recrutez.",
      },
      {
        icon: "leaf",
        title: "Un choix responsable",
        text: "Du matériel reconditionné : jusqu'à 170 kg de CO₂ évités par ordinateur.",
      },
    ],
  },

  testimonials: {
    title: "Ils vendent, [on gère le reste]",
    // TODO : remplacer par de vrais témoignages de clients de l'immobilier (photo, prénom, métier, ville).
    // Tant que `placeholder` est à true, un badge « Exemple » s'affiche sur la carte.
    items: [
      {
        placeholder: true,
        name: "Thomas V.",
        role: "Agent immobilier indépendant",
        city: "Waterloo",
        quote:
          "Je fais mes estimations directement sur l'iPad chez le client. Ça change tout dans la façon dont on me perçoit.",
      },
      {
        placeholder: true,
        name: "Claire L.",
        role: "Gérante d'agence",
        city: "Liège",
        quote:
          "Quand on a recruté deux agents, ils étaient équipés la semaine suivante, sans sortir un euro de trésorerie.",
      },
      {
        placeholder: true,
        name: "Karim H.",
        role: "Négociateur",
        city: "Bruxelles",
        quote:
          "Mon iPhone est tombé pendant une visite. Le lendemain j'en avais un autre. Zéro stress.",
      },
    ],
  },

  faq: {
    title: "Vos questions, [nos réponses]",
    items: [
      {
        q: "Le matériel est-il compatible avec mon logiciel immobilier et les portails ?",
        a: "Oui : la plupart des logiciels immobiliers et des portails fonctionnent dans le navigateur, sur Mac comme sur PC. Dites-nous lequel vous utilisez, nous vérifions avant la livraison.",
      },
      {
        q: "Je préfère Windows, c'est possible ?",
        a: "Bien sûr. Nous avons aussi des packs sous Windows (HP, Microsoft Surface…) et chaque pack est configurable sur devis.",
      },
      {
        q: "Puis-je ajouter du matériel quand je recrute un agent ?",
        a: "Oui, vous ajoutez des équipements à tout moment. Chaque nouvel agent est équipé en 3 à 5 jours.",
      },
      {
        q: "Que se passe-t-il en cas de casse ou de vol pendant un déplacement ?",
        a: "Contactez-nous : nous remplaçons votre matériel sous 24h. Les conditions en cas de sinistre sont détaillées dans votre contrat.",
      },
      {
        q: "Combien de temps dure le contrat ?",
        a: "Les packs sont proposés sur 36 mois. D'autres durées sont possibles sur devis.",
      },
      {
        q: "Que devient le matériel en fin de contrat ?",
        a: "Vous le renouvelez simplement par du matériel plus récent, sans vous soucier de la revente.",
      },
    ],
  },

  form: {
    title: "Recevez votre [offre agent]",
    subtitle: "3 questions, 30 secondes. Un conseiller vous recontacte sous 24h.",
    profileQuestion: "Vous êtes…",
    profiles: ["Agent indépendant", "Agence de 2 à 10 personnes", "Réseau ou agence de plus de 10 personnes"],
    needQuestion: "Qu'est-ce qui vous intéresse ?",
    // Les packs ci-dessus sont proposés automatiquement, ces choix s'ajoutent après.
    extraNeeds: ["Un pack sur mesure", "Je ne sais pas encore"],
  },

  thankYou: {
    title: "Merci ! Votre demande est bien arrivée.",
    text: "Un conseiller iTakecare vous recontacte sous 24h ouvrables avec une offre adaptée à votre agence.",
    // TODO : lien de prise de rendez-vous (Calendly, Google Agenda…).
    bookingUrl: null,
  },
};
