// Landing page « Professions libérales de santé » (infirmier·es à domicile, kinés, …).
// Contenu provisoire : les textes marqués TODO sont à valider avant mise en ligne.
// Les packs viennent du catalogue https://www.itakecare.be/catalogue?tab=packs

export const sante = {
  slug: "sante",
  meta: {
    title: "Votre informatique prend soin de vous — iTakecare Santé",
    description:
      "Ordinateur, smartphone et accompagnement réunis dans un loyer mensuel. Découvrez les packs iTakecare pour les soignants indépendants.",
  },

  hero: {
    eyebrow: "Infirmier·es, kinés & soignants indépendants",
    // Le mot entre [crochets] est surligné en turquoise.
    title: "Soignez vos patients. On s'occupe de votre [informatique].",
    subtitle:
      "Un ordinateur et un smartphone prêts à l'emploi pour vos tournées et votre facturation, pour un loyer mensuel fixe.",
    bullets: [
      "Matériel reconditionné haut de gamme, testé et garanti",
      "Remplacé sous 24h en cas de panne : vos tournées continuent",
      "Maintenance et support inclus, sans investissement de départ",
    ],
    cta: "Recevoir mon offre soignant",
    priceFrom: "78,90",
    // TODO : remplacer par une vraie photo (soignant·e à domicile avec son ordinateur/smartphone).
    image: null,
    imagePlaceholder: "Photo : infirmière à domicile avec son portable et son smartphone",
  },

  painPoints: {
    title: "Votre métier, c'est le soin. [Pas l'informatique.]",
    items: [
      {
        icon: "slow",
        title: "Un ordinateur qui rame",
        text: "La facturation de fin de journée prend deux fois plus de temps que prévu.",
      },
      {
        icon: "alert",
        title: "Une panne = une journée perdue",
        text: "Sans ordinateur, impossible d'accéder à vos dossiers ni de facturer.",
      },
      {
        icon: "wallet",
        title: "Un budget à protéger",
        text: "Acheter du neuf tous les 3 ans, c'est une grosse dépense d'un coup.",
      },
    ],
  },

  packs: {
    title: "Des packs prêts pour [vos tournées]",
    subtitle:
      "Ordinateur, smartphone et accessoires réunis dans un seul loyer. Tout est configurable sur devis.",
    // Packs « Pro Santé » de la page partenaire https://www.itakecare.be/prosante (packs Leazr).
    // `id` sert à relire le prix en direct ; `price` est le prix de secours (relevé le 02/11/2026).
    // Les noms de produits sont ceux du catalogue, tels quels : ils partent avec le lead vers Leazr.
    items: [
      {
        key: "PC",
        id: "cb1ad865-0690-4f06-867c-1577226098e6",
        name: "Pro Santé - Pack Ultra Portable PC + SLA Ultra",
        tagline: "Windows, écran et smartphone, avec le SLA Ultra",
        price: "110,75",
        image:
          "https://api.leazr.co/storage/v1/object/public/pack-images/company-c1ce66bb-3ad2-474d-b477-583baa7ff1c0/packs/image-1793639055520-za95r310cwb.png",
        products: [
          "Apple AirPods 4",
          "Lecteur de cartes ied Bluetooth",
          "ProBook 4 G1iR 16",
          "Ecran SAMSUNG 27 pouces",
          "iPhone 17 Pro",
        ],
        url: "https://www.itakecare.be/prosante/pack/0",
      },
      {
        key: "Apple",
        id: "d93c428f-237f-4e30-ae30-72ab96738ef7",
        name: "Pro Santé - Pack Ultra Portable Apple + SLA Ultra",
        tagline: "MacBook, écran et iPhone, avec le SLA Ultra",
        price: "123,75",
        image:
          "https://api.leazr.co/storage/v1/object/public/pack-images/company-c1ce66bb-3ad2-474d-b477-583baa7ff1c0/packs/image-1793639071030-w5djtomk11.png",
        products: [
          "Apple AirPods 4",
          "Lecteur de cartes ied Bluetooth",
          "Ecran SAMSUNG 27 pouces",
          "iPhone 17 Pro",
          "MacBook Air 15 M4",
        ],
        url: "https://www.itakecare.be/prosante/pack/1",
      },
      {
        key: "Mobile",
        id: "0d57dc67-027a-445d-bec3-91dbd135487b",
        name: "Pro Santé - Pack Ultra Mobile + SLA Ultra",
        tagline: "iPad Pro et iPhone pour les tournées, avec le SLA Ultra",
        price: "139,70",
        image:
          "https://api.leazr.co/storage/v1/object/public/pack-images/company-c1ce66bb-3ad2-474d-b477-583baa7ff1c0/packs/image-1793639027385-6jrzuh20j8s.png",
        products: [
          "iPad Pro M4 13 pouces",
          "Apple Pencil Pro",
          "Apple AirPods 4",
          "Lecteur de cartes ied Bluetooth",
          "iPhone 17 Pro",
          "Logitech Combo Touch for iPad Pro 13",
        ],
        url: "https://www.itakecare.be/prosante/pack/2",
      },
    ],
    note: "Prix HTVA par mois, leasing sur 36 mois. Maintenance, garantie et SLA Ultra inclus.",
  },

  benefits: {
    title: "Pourquoi les soignants choisissent [le leasing]",
    items: [
      {
        icon: "wallet",
        title: "Zéro investissement",
        text: "Gardez votre trésorerie pour votre activité. Vous payez un loyer fixe, c'est tout.",
      },
      {
        icon: "receipt",
        title: "Un loyer en frais professionnels",
        // TODO : formulation à valider avec un comptable.
        text: "Le loyer peut être comptabilisé comme frais professionnel. Parlez-en à votre comptable.",
      },
      {
        icon: "lock",
        title: "Vos données protégées",
        text: "En cas de remplacement ou en fin de contrat, les données sont effacées de façon certifiée.",
      },
      {
        icon: "leaf",
        title: "Un choix responsable",
        text: "Du matériel reconditionné : jusqu'à 170 kg de CO₂ évités par ordinateur.",
      },
    ],
  },

  testimonials: {
    title: "Ils soignent, [on gère le reste]",
    // TODO : remplacer par de vrais témoignages de clients soignants (photo, prénom, métier, ville).
    // Tant que `placeholder` est à true, un badge « Exemple » s'affiche sur la carte.
    items: [
      {
        placeholder: true,
        name: "Sophie D.",
        role: "Infirmière à domicile",
        city: "Namur",
        quote:
          "Mon ancien portable a lâché un lundi matin. Le remplacement est arrivé le lendemain, je n'ai rien perdu.",
      },
      {
        placeholder: true,
        name: "Julien M.",
        role: "Kinésithérapeute",
        city: "Liège",
        quote:
          "Un loyer fixe, pas de mauvaise surprise et un MacBook qui tient la journée. Exactement ce qu'il me fallait.",
      },
      {
        placeholder: true,
        name: "Nadia B.",
        role: "Infirmière indépendante",
        city: "Bruxelles",
        quote:
          "Je n'y connais rien en informatique. Tout est arrivé prêt à l'emploi et j'ai un conseiller qui répond.",
      },
    ],
  },

  faq: {
    title: "Vos questions, [nos réponses]",
    items: [
      {
        q: "Le matériel est-il compatible avec mon logiciel de soins et de facturation ?",
        a: "Oui : nos ordinateurs fonctionnent avec les logiciels web et Windows/macOS courants. Dites-nous lequel vous utilisez, nous vérifions avant la livraison.",
      },
      {
        q: "Puis-je ajouter un lecteur de carte eID ou une tablette ?",
        a: "Oui, chaque pack est configurable. Indiquez-le dans votre demande et nous adaptons votre offre.",
      },
      {
        q: "Que se passe-t-il si mon ordinateur tombe en panne pendant une tournée ?",
        a: "Vous nous contactez, nous remplaçons votre matériel sous 24h. La maintenance est incluse dans votre loyer.",
      },
      {
        q: "Qu'advient-il des données de mes patients lors d'un remplacement ?",
        a: "Les données sont effacées de façon certifiée sur tout appareil qui nous revient.",
      },
      {
        q: "Combien de temps dure le contrat ?",
        a: "Les packs sont proposés sur 36 mois. D'autres durées sont possibles sur devis.",
      },
      {
        q: "Je viens de m'installer, puis-je quand même souscrire ?",
        a: "Oui, contactez-nous : nous étudions chaque situation avec notre partenaire financier.",
      },
    ],
  },

  form: {
    title: "Recevez votre [offre soignant]",
    subtitle: "3 questions, 30 secondes. Un conseiller vous recontacte sous 24h.",
    profileQuestion: "Vous êtes…",
    profiles: ["Infirmier·e", "Kinésithérapeute", "Autre profession de santé"],
    needQuestion: "Qu'est-ce qui vous intéresse ?",
    // Les packs ci-dessus sont proposés automatiquement, ces choix s'ajoutent après.
    extraNeeds: ["Un pack sur mesure", "Je ne sais pas encore"],
  },

  thankYou: {
    title: "Merci ! Votre demande est bien arrivée.",
    text: "Un conseiller iTakecare vous recontacte sous 24h ouvrables avec une offre adaptée à votre pratique.",
    // TODO : lien de prise de rendez-vous (Calendly, Google Agenda…).
    bookingUrl: null,
  },
};
