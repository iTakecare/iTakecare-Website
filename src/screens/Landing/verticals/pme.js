// Landing page « TPE / PME » (pack généraliste : trésorerie, sérénité, gestion de parc).
// Contenu provisoire : les textes marqués TODO sont à valider avant mise en ligne.
// Les packs viennent du catalogue https://www.itakecare.be/catalogue?tab=packs

export const pme = {
  slug: "pme",
  meta: {
    title: "Leasing informatique pour TPE et PME — iTakecare",
    description:
      "Ordinateurs, smartphones et accessoires reconditionnés en leasing pour TPE et PME. Loyer fixe, maintenance incluse, remplacement sous 24h.",
  },

  hero: {
    eyebrow: "TPE & PME",
    // Le mot entre [crochets] est surligné en turquoise.
    title: "Votre parc informatique pour [un loyer fixe].",
    subtitle:
      "Ordinateurs, smartphones et accessoires pour toute votre équipe. Le matériel, la maintenance et le support : on s'occupe de tout.",
    bullets: [
      "Zéro investissement initial : votre trésorerie reste disponible",
      "Maintenance, support et remplacement sous 24h inclus",
      "Logiciel de gestion de parc IT inclus pour tout suivre en un clic",
    ],
    cta: "Recevoir mon offre entreprise",
    priceFrom: "78,90",
    // TODO : remplacer par une vraie photo (petite équipe dans un bureau lumineux).
    image: null,
    imagePlaceholder: "Photo : petite équipe au bureau, chacun avec son poste",
  },

  painPoints: {
    title: "L'informatique ne devrait pas [vous ralentir].",
    items: [
      {
        icon: "wallet",
        title: "Chaque achat plombe la trésorerie",
        text: "Équiper une équipe, c'est plusieurs milliers d'euros à sortir d'un coup, avant même de produire.",
      },
      {
        icon: "alert",
        title: "Personne ne gère vraiment l'IT",
        text: "Pannes, mises à jour, nouveaux arrivants : c'est souvent le dirigeant qui s'y colle.",
      },
      {
        icon: "clock",
        title: "Une panne = un collaborateur à l'arrêt",
        text: "Et des journées perdues à attendre une réparation ou un nouvel appareil.",
      },
    ],
  },

  packs: {
    title: "Un pack pour [chaque poste]",
    subtitle:
      "Choisissez un pack par collaborateur ou composez le vôtre. Dès 100 € HTVA/mois, votre pack sur mesure bénéficie automatiquement de jusqu'à -5 %.",
    items: [
      {
        name: "Pack iWin",
        tagline: "Le poste Windows polyvalent pour toute l'équipe",
        price: "78,90",
        highlight: "Notre recommandation", // TODO : à confirmer avec les chiffres de vente
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
        tagline: "Le poste nomade sous Mac, pour ceux qui bougent",
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
        name: "Pack iDesk",
        tagline: "Le poste fixe tout-en-un pour l'accueil ou l'administratif",
        price: "121,90",
        image:
          "https://api.leazr.co/storage/v1/object/public/pack-images/company-c1ce66bb-3ad2-474d-b477-583baa7ff1c0/packs/image-1781526429137-b278w8f03l.png",
        products: [
          "iMac 24 pouces M4",
          "iPhone 17 Pro Max",
          "AirPods 4",
          "Hub USB-C Ugreen Revodock 105",
          "Microsoft Office 2024",
        ],
        url: "https://www.itakecare.be/catalogue/pack/0f5d12da-3c08-4f5e-a0cb-74e1a0a2993a",
      },
    ],
    note: "Prix HTVA par mois et par pack, leasing sur 36 mois. Maintenance, garantie et remplacement 24h inclus.",
  },

  benefits: {
    title: "Pourquoi les PME passent [au leasing]",
    items: [
      {
        icon: "wallet",
        title: "Trésorerie préservée",
        text: "Pas d'investissement : gardez votre capital pour développer votre activité.",
      },
      {
        icon: "receipt",
        title: "Un coût fixe et maîtrisé",
        text: "Une mensualité par poste qui couvre tout, y compris la maintenance et le support.",
      },
      {
        icon: "shield",
        title: "Gestion de parc incluse",
        text: "Suivez vos équipements et gérez vos demandes en un clic depuis notre plateforme.",
      },
      {
        icon: "leaf",
        title: "Un choix responsable",
        text: "Du matériel reconditionné : jusqu'à 170 kg de CO₂ évités par ordinateur.",
      },
    ],
  },

  testimonials: {
    title: "Ils se concentrent sur leur métier, [on gère le reste]",
    // TODO : remplacer par de vrais témoignages de clients TPE/PME (photo, prénom, fonction, ville).
    // Tant que `placeholder` est à true, un badge « Exemple » s'affiche sur la carte.
    items: [
      {
        placeholder: true,
        name: "Marc D.",
        role: "Gérant d'un bureau d'études (8 pers.)",
        city: "Namur",
        quote:
          "On a renouvelé tout le parc sans sortir un euro de trésorerie. Et je ne m'occupe plus des pannes.",
      },
      {
        placeholder: true,
        name: "Élodie R.",
        role: "Fondatrice d'une agence de communication",
        city: "Bruxelles",
        quote:
          "Chaque nouvelle recrue a son MacBook en quelques jours. Le loyer fixe simplifie énormément mon budget.",
      },
      {
        placeholder: true,
        name: "Pierre S.",
        role: "Administrateur d'une PME de services",
        city: "Mons",
        quote:
          "Un portable a lâché un mardi, le remplaçant était là le mercredi. C'est exactement le service qu'on cherchait.",
      },
    ],
  },

  faq: {
    title: "Vos questions, [nos réponses]",
    items: [
      {
        q: "Combien de temps dure le contrat ?",
        a: "Les packs sont proposés sur 36 mois. D'autres durées sont possibles sur devis.",
      },
      {
        q: "Puis-je ajouter des postes en cours de contrat ?",
        a: "Oui, vous ajoutez du matériel à tout moment, par exemple à chaque recrutement. Livraison en 3 à 5 jours.",
      },
      {
        q: "Puis-je composer mon propre pack ?",
        a: "Oui : choisissez vos produits dans le catalogue (minimum 2 catégories différentes). Dès 100 € HTVA/mois, une réduction de 2 à 5 % s'applique automatiquement.",
      },
      {
        q: "Que se passe-t-il en fin de contrat ?",
        a: "Vous renouvelez simplement votre matériel par des appareils plus récents, sans vous soucier de la revente.",
      },
      {
        q: "Pourquoi travaillez-vous avec un partenaire financier ?",
        a: "Pour vous proposer des conditions de leasing flexibles et avantageuses, pendant que nous nous concentrons sur le matériel et le service.",
      },
      {
        q: "Comment le leasing apparaît-il dans ma comptabilité ?",
        // TODO : formulation à valider avec un comptable.
        a: "Le loyer est en principe une charge d'exploitation et non un investissement à amortir. Votre comptable vous confirmera le traitement adapté à votre société.",
      },
    ],
  },

  form: {
    title: "Recevez votre [offre entreprise]",
    subtitle: "3 questions, 30 secondes. Un conseiller vous recontacte sous 24h.",
    profileQuestion: "Combien de postes souhaitez-vous équiper ?",
    profiles: ["1 à 3 postes", "4 à 10 postes", "Plus de 10 postes"],
    needQuestion: "Qu'est-ce qui vous intéresse ?",
    // Les packs ci-dessus sont proposés automatiquement, ces choix s'ajoutent après.
    extraNeeds: ["Un pack sur mesure", "Je ne sais pas encore"],
  },

  thankYou: {
    title: "Merci ! Votre demande est bien arrivée.",
    text: "Un conseiller iTakecare vous recontacte sous 24h ouvrables avec une offre adaptée à votre entreprise.",
    // TODO : lien de prise de rendez-vous (Calendly, Google Agenda…).
    bookingUrl: null,
  },
};
