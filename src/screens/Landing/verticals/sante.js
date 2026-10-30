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
    items: [
      {
        name: "Pack iWin",
        tagline: "L'essentiel sous Windows, léger et efficace",
        price: "78,90",
        image:
          "https://api.leazr.co/storage/v1/object/public/pack-images/company-c1ce66bb-3ad2-474d-b477-583baa7ff1c0/packs/image-1781526388434-nscsa9i7esk.png",
        products: [
          "HP ProBook 440 G11",
          "Samsung Galaxy S24 Ultra",
          "Hub USB-C Ugreen Revodock 105",
          "Souris MX Anywhere 3S",
          "Microsoft Office 2024",
        ],
        url: "https://www.itakecare.be/catalogue/pack/265dce6d-454a-437d-a975-db4bb5acf466",
      },
      {
        name: "Pack iDiscovery",
        tagline: "L'univers Apple, ultra-léger pour les déplacements",
        price: "89,90",
        highlight: "Le plus choisi", // TODO : à confirmer avec les chiffres de vente
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
    ],
    note: "Prix HTVA par mois, leasing sur 36 mois. Maintenance, garantie et remplacement 24h inclus.",
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
