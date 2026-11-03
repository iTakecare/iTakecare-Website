// Landing page « Agents immobiliers » (angle mobilité : visites, estimations, signatures).
// Contenu provisoire : les textes marqués TODO sont à valider avant mise en ligne.
// Les packs viennent du catalogue https://www.itakecare.be/catalogue?tab=packs

export const immobilier = {
  slug: "immobilier",
  meta: {
    title: "Votre bureau vous suit. Votre activité avance. — iTakecare Immobilier",
    description:
      "Performance, gain de temps et mobilité : découvrez les packs ordinateur et smartphone iTakecare pour les agents immobiliers indépendants et les agences.",
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
    priceFrom: "84,80",
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
    // Packs « Pro Immo » de la page partenaire https://www.itakecare.be/proimmo (packs Leazr, créés le 03/11/2026).
    // `id` part avec le lead : Leazr reprend le pack exact. Les noms de produits sont ceux du catalogue.
    items: [
      {
        key: "PC",
        id: "8fc9a5cf-730b-405f-b9bf-87d076677286",
        name: "Pro Immo - Pack PC",
        tagline: "Windows, écran et smartphone Samsung",
        price: "84,80",
        products: ["ProBook 4 G1iR 16", "Samsung Galaxy S24 Ultra", "Ecran SAMSUNG 27 pouces", "Apple AirPods 4"],
        url: "https://www.itakecare.be/proimmo/pack/0",
      },
      {
        key: "Apple",
        id: "a2161226-3695-4bc1-8123-30ea90204894",
        name: "Pro Immo - Pack Apple",
        tagline: "MacBook, écran et iPhone",
        price: "125,80",
        products: ["MacBook Air 15 M4", "iPhone 17 Pro Max", "Ecran SAMSUNG 27 pouces", "Apple AirPods 4"],
        url: "https://www.itakecare.be/proimmo/pack/1",
      },
      {
        key: "Ultra Mobile",
        id: "40c82bb1-6476-4215-8e0a-bce2dbc61422",
        name: "Pro Immo - Pack Apple Ultra Mobile",
        tagline: "MacBook Pro, iPad Pro et iPhone",
        price: "203,75",
        products: [
          "MacBook Pro 14 M4",
          "iPad Pro M4 13 pouces",
          "Logitech Combo Touch for iPad Pro 13",
          "iPhone 17 Pro Max",
          "Apple AirPods 4",
        ],
        url: "https://www.itakecare.be/proimmo/pack/2",
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
