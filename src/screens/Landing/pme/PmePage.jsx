// Landing page TPE/PME, d'après la maquette « iTakecare TPE/PME — palette bleue » du 02/11/2026
// (palette bleu électrique / anthracite / gris clair, visuels générés, parcours en 9 temps, sans loyer affiché).
// Le formulaire est le vrai : il passe par submitLead → landing-lead → Leazr (source funnelpme).

import React, { useEffect, useRef, useState } from "react";
import { GoogleRating } from "../components/GoogleRating";
import { BookingStep, BookingWidget } from "../components/BookingWidget";
import { useNavigate } from "react-router-dom";
import { fetchCheapestLaptop, formatMonthly } from "../lib/catalog";
import { isValidPhone, submitLead, track, withAttribution } from "../lib/leads";
import { pme } from "../verticals/pme";
import { Footer } from "../sante/SantePage";
import heroImage from "./assets/hero-tpe-pme.webp";
import parcImage from "./assets/parc-uniformise.webp";
import swapImage from "./assets/garantie-swap.webp";
import logo from "../sante/assets/logo-itakecare.png";
import "./pme.css";

const PRIVACY_URL = "https://www.itakecare.be/politique-confidentialite";

// Tuile « composer en ligne » : ouvre le configurateur de pack du catalogue.
const CONFIGURATOR_URL = "https://www.itakecare.be/catalogue/configurateur-pack";

// Les paramètres de la pub (utm, fbclid) suivent le visiteur vers le configurateur.
const openConfigurator = (e) => {
  e.currentTarget.href = withAttribution(CONFIGURATOR_URL);
  track("CustomizeProduct", { content_category: pme.slug });
};

const PRIORITIES = [
  { value: "Trésorerie", icon: "clock", label: "Préserver ma trésorerie", hint: "Répartir le coût de l’équipement dans le temps" },
  { value: "Parc cohérent", icon: "laptop", label: "Harmoniser mon parc", hint: "Une base commune pour les postes de l’équipe" },
  { value: "Maintenance et swap", icon: "refresh", label: "Être accompagné en cas de souci", hint: "Maintenance incluse et garantie swap" },
];

const SIZES = [
  { value: "1 à 5 postes", hint: "Dès un seul poste, en solo ou en petite équipe" },
  { value: "6 à 20 postes", hint: "Un parc à organiser ou à renouveler" },
  { value: "Plus de 20 postes", hint: "Une approche adaptée à plusieurs profils" },
];

// Onglets « Votre équipe » : chaque lien présélectionne la priorité dans le formulaire.
const SITUATIONS = [
  {
    id: "parc",
    tab: "Un parc cohérent",
    image: parcImage,
    alt: "Trois collègues travaillent avec le même modèle d’ordinateur et des accessoires assortis.",
    caption: "HARMONISER · SIMPLIFIER · AVANCER",
    eyebrow: "MOINS DE DISPARITÉS À GÉRER",
    title: ["Des postes cohérents.", "Des habitudes partagées."],
    text: "Un parc construit au fil des urgences devient vite disparate. Définissons un socle commun, puis ajustons-le aux besoins de chaque métier.",
    points: [
      "Des configurations de référence par usage",
      "Des accessoires compatibles et cohérents",
      "Un suivi matériel avec un même interlocuteur",
    ],
    cta: "Je veux harmoniser mon parc",
    priority: "Parc cohérent",
  },
  {
    id: "arrivee",
    tab: "Une arrivée",
    image: heroImage,
    alt: "Une petite équipe échange autour d’un ordinateur dans son bureau.",
    caption: "ACCUEILLIR · ÉQUIPER · DÉVELOPPER",
    eyebrow: "L’ENTREPRISE GRANDIT",
    title: ["Un collègue arrive.", "Vous avez une base."],
    text: "Votre deuxième poste comme le dixième s’appuie sur les choix déjà faits. Vous préparez son équipement avec une vision plus claire.",
    points: [
      "Des besoins et logiciels identifiés en amont",
      "Un poste adapté au rôle du collaborateur",
      "Une mise à disposition organisée ensemble",
    ],
    cta: "Je prépare mon prochain équipement",
    priority: "Trésorerie",
  },
  {
    id: "panne",
    tab: "Une panne",
    image: swapImage,
    alt: "Un technicien remet un ordinateur de remplacement à une collaboratrice dans une petite entreprise.",
    caption: "SIGNALER · DIAGNOSTIQUER · REMPLACER",
    eyebrow: "LE REMPLACEMENT EST PRÉVU",
    title: ["Une panne survient.", "Vous savez qui appeler."],
    text: "Vous avez un point de contact pour le diagnostic et le suivi. En cas de panne couverte, la garantie swap prévoit le remplacement du matériel.",
    points: [
      "Une prise en charge à activer auprès de votre contact",
      "Un échange organisé pour le matériel concerné",
      "Une activité qui reprend vite",
    ],
    cta: "Je veux un matériel bien accompagné",
    priority: "Maintenance et swap",
  },
];

const FAQ = [
  [
    "Comment le leasing aide-t-il à préserver ma trésorerie ?",
    "Le coût de l’équipement est réparti dans un loyer plutôt que concentré dans un achat comptant. Le montant, la durée et les modalités de paiement sont définis dans votre offre pour vous donner de la visibilité.",
  ],
  // Objection des indépendants : « un parc, ce n'est pas pour moi qui n'ai qu'un ordinateur ».
  [
    "Je travaille en solo, avec un seul ordinateur. Est-ce pour moi ?",
    "Oui. Votre parc peut commencer avec une seule machine, dans le même cadre : loyer prévisible, maintenance incluse et garantie swap. Le jour où vous ajoutez un poste ou accueillez un collaborateur, il s’appuie sur la même base, avec le même interlocuteur.",
  ],
  [
    "Comment garder la maîtrise de mes coûts informatiques ?",
    "Votre offre précise le loyer, sa durée et les services compris. Vous pouvez ainsi anticiper les mensualités et le périmètre couvert par la maintenance et la garantie swap. Les licences, options et prestations hors périmètre sont identifiées dans le devis, pour garder une vision claire de votre budget.",
  ],
  [
    "Faut-il donner le même ordinateur à tout le monde ?",
    "Nous définissons un socle commun, puis des configurations selon les usages : bureautique, multitâche ou besoins métier plus exigeants. Le but est de rendre le parc cohérent tout en tenant compte du travail de chacun.",
  ],
  [
    "Que comprend la maintenance incluse ?",
    "La maintenance prévoit la prise en charge et le suivi du matériel selon le périmètre de votre solution. Votre offre détaille les interventions, les modalités d’assistance et les délais applicables. Les licences logicielles ou prestations supplémentaires éventuelles sont précisées séparément.",
  ],
  [
    "Comment fonctionne la garantie swap ?",
    "Vous signalez la panne à votre point de contact. Après diagnostic d’une panne couverte, le remplacement du matériel est organisé suivant les conditions du contrat. Les délais, les modalités de livraison ou de retour et les responsabilités concernant les données sont précisés dans votre offre.",
  ],
  [
    "Puis-je garder mes logiciels et choisir Windows ou Apple ?",
    "Indiquez les outils que vous utilisez : nous vérifions leur compatibilité avec la configuration envisagée. Le choix du système, les références et les licences nécessaires sont validés dans le devis.",
  ],
  [
    "La demande d’offre m’engage-t-elle ?",
    "La demande de devis est sans engagement. Vous recevez une proposition précisant le matériel, le loyer, la durée et les services. Le contrat commence uniquement après validation et signature.",
  ],
];

const Svg = ({ id, className }) => (
  <svg aria-hidden="true" className={className}>
    <use href={`#${id}`} />
  </svg>
);

const IconLibrary = () => (
  <svg className="icon-library" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <symbol id="arrow" viewBox="0 0 24 24"><path d="M4 12h15m-6-6 6 6-6 6" /></symbol>
      <symbol id="check" viewBox="0 0 24 24"><path d="m5 12 4 4L19 6" /></symbol>
      <symbol id="shield" viewBox="0 0 24 24"><path d="m12 3 8 3v6c0 4-8 9-8 9s-8-5-8-9V6z" /><path d="m8 11 3 3 5-5" /></symbol>
      <symbol id="refresh" viewBox="0 0 24 24"><path d="M20 8a8 8 0 0 0-14-3L3 8m0-5v5h5M4 16a8 8 0 0 0 14 3l3-3m0 5v-5h-5" /></symbol>
      <symbol id="headset" viewBox="0 0 24 24"><path d="M4 14v-3a8 8 0 0 1 16 0v3M4 12H2v7h4v-7zm16 0h2v7h-4v-7zm0 7c0 3-3 3-6 3" /></symbol>
      <symbol id="laptop" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="12" rx="1" /><path d="m4 16-3 4h22l-3-4M9 20h6" /></symbol>
      <symbol id="clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></symbol>
      <symbol id="box" viewBox="0 0 24 24"><path d="m12 2 9 5v10l-9 5-9-5V7zm0 10 9-5M12 12 3 7m9 5v10M7 4.5l9 5" /></symbol>
      <symbol id="cart" viewBox="0 0 24 24"><path d="M2 3h3l2.6 12.4a1 1 0 0 0 1 .8h9.7a1 1 0 0 0 1-.8L21 7H6" /><circle cx="9.5" cy="20" r="1.5" /><circle cx="17.5" cy="20" r="1.5" /></symbol>
    </defs>
  </svg>
);

const Brand = ({ href, label }) => (
  <a className="brand" href={href} aria-label={label}>
    <img src={logo} alt="iTakecare" width="167" height="38" />
    <span>
      pour les
      <br />
      TPE & PME
    </span>
  </a>
);

const Header = ({ onStart }) => (
  <header className="site-header">
    <div className="container nav">
      <Brand href="#main" label="iTakecare, haut de page" />
      <a className="button button-small" href="#offre" onClick={() => onStart()}>
        Mon offre entreprise <Svg id="arrow" />
      </a>
    </div>
  </header>
);

const Hero = ({ onStart, laptop }) => (
  <section className="hero container" aria-labelledby="hero-title">
    <div className="hero-copy">
      <p className="eyebrow">
        <span className="live-dot" /> INDÉPENDANTS, TPE & PME
      </p>
      <h1 id="hero-title">
        Votre trésorerie
        <br />
        reste au service
        <br />
        <em>de vos projets.</em>
      </h1>
      <p className="hero-description">
        Anticipez vos coûts informatiques avec un loyer prévisible, la maintenance incluse, la garantie swap et un
        parc cohérent dès le premier poste.
      </p>
      <div className="hero-actions">
        <a className="button" href="#offre" onClick={() => onStart()}>
          Construire mon offre <Svg id="arrow" />
        </a>
        <a className="text-link" href="#solutions">
          Découvrir la solution <span>↗</span>
        </a>
      </div>
      <p className="reassurance">
        <Svg id="check" /> Devis sans engagement <span>·</span> Une offre adaptée à votre activité
      </p>
      <GoogleRating />
    </div>
    <div className="hero-visual">
      <div className="photo-frame">
        <img
          src={heroImage}
          alt="Une dirigeante de petite entreprise et son collègue travaillent sur un ordinateur dans leur bureau."
          width="1536"
          height="1024"
          fetchpriority="high"
        />
      </div>
      <div className="care-note">
        <span className="note-icon">
          <Svg id="headset" />
        </span>
        <div>
          <strong>Le matériel et son suivi, ensemble.</strong>
          <span>Un point de contact pour votre entreprise.</span>
        </div>
      </div>
      {laptop ? (
        <div className="hero-price">
          <span>Un ordinateur portable dès</span>
          <div>
            <strong>
              {formatMonthly(laptop.monthlyPrice)}
              <span> €</span>
            </strong>
            <span>HTVA / mois</span>
          </div>
          <small>Maintenance incluse · Garantie swap*</small>
        </div>
      ) : (
        <div className="hero-price sme-budget">
          <span>Une solution pensée pour votre activité</span>
          <div>
            <strong>
              Du matériel suivi.{" "}
              <br />
              Des coûts mieux anticipés.
            </strong>
          </div>
          <small>Maintenance incluse · Garantie swap*</small>
        </div>
      )}
    </div>
  </section>
);

const BenefitsBar = () => (
  <div className="benefits-bar">
    <div className="container benefits-grid four-benefits">
      {[
        ["clock", "Préservez votre trésorerie", "Coût étalé, mensualités connues"],
        ["laptop", "Un parc qui grandit avec vous", "Dès une machine, au rythme de votre activité"],
        ["headset", "Maintenance incluse", "Un suivi prévu pour votre matériel"],
        ["refresh", "Garantie swap*", "Un remplacement prévu en cas de panne couverte"],
      ].map(([icon, title, text]) => (
        <div key={title}>
          <Svg id={icon} />
          <p>
            <strong>{title}</strong>
            <span>{text}</span>
          </p>
        </div>
      ))}
    </div>
  </div>
);

const Treasury = () => (
  <section className="section container treasury-section" aria-labelledby="treasury-title">
    <div className="section-heading">
      <div>
        <p className="eyebrow">VOTRE BUDGET A D’AUTRES AMBITIONS</p>
        <h2 id="treasury-title">
          Gardez de la marge
          <br />
          pour ce qui compte.
        </h2>
      </div>
      <p>
        Répartissez le coût de votre équipement dans un loyer.{" "}
        <br />
        Gardez une capacité d’action pour votre entreprise.
      </p>
    </div>
    <div className="project-grid">
      {[
        [
          "Vos équipes",
          "Accueillir un nouveau talent, développer les compétences et accompagner les personnes qui font avancer l’activité.",
        ],
        [
          "Vos clients",
          "Financer le quotidien, soigner votre service et vous concentrer sur les engagements pris auprès de vos clients.",
        ],
        [
          "Vos prochains projets",
          "Garder de la souplesse pour une opportunité, une nouvelle offre ou une étape de développement.",
        ],
      ].map(([title, text], i) => (
        <article key={title}>
          <span>0{i + 1}</span>
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </div>
    <div className="cost-control" id="maitrise-couts" aria-labelledby="costs-title">
      <div>
        <p className="eyebrow">MAÎTRISE DES COÛTS</p>
        <h3 id="costs-title">
          Votre budget informatique,
          <br />
          plus lisible.
        </h3>
        <p>
          Un loyer fixe, les services compris, aucune surprise : vous connaissez le budget de votre parc avant de vous
          engager.
        </p>
      </div>
      <ul>
        {[
          ["Des mensualités connues", "Un montant fixe, chaque mois, pendant toute la durée."],
          ["La maintenance incluse", "Les prestations couvertes font partie de votre solution."],
          ["Un cadre pour les pannes", "Le remplacement est prévu par la garantie swap*."],
        ].map(([title, text]) => (
          <li key={title}>
            <Svg id="check" />
            <div>
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

const ProfileCard = ({ featured, tag, icon, title, text, points, priceTitle, priceText, cta, href = "#offre", external, onClick }) => (
  <article className={`profile-card${featured ? " featured" : ""}`}>
    <div className="profile-top">
      <span className="pack-tag-inline">{tag}</span>
      <Svg id={icon} />
    </div>
    <h3>{title}</h3>
    <p>{text}</p>
    <ul>
      {points.map((point) => (
        <li key={point}>
          <Svg id="check" /> {point}
        </li>
      ))}
    </ul>
    <div className="profile-price">
      <strong>{priceTitle}</strong>
      <span>{priceText}</span>
    </div>
    <a
      className={`button${featured ? "" : " button-outline"}`}
      href={href}
      onClick={onClick}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {cta} <Svg id="arrow" />
    </a>
  </article>
);

// Portable le moins cher du catalogue, chargé en direct (null tant qu'il n'est pas connu ou si l'appel échoue).
const useCheapestLaptop = () => {
  const [laptop, setLaptop] = useState(null);
  useEffect(() => {
    let cancelled = false;
    fetchCheapestLaptop()
      .then((result) => !cancelled && setLaptop(result))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);
  return laptop;
};

const Solutions = ({ onStart, laptop }) => {
  return (
    <section className="solutions-band" id="solutions" aria-labelledby="solutions-title">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">UNE SOLUTION À LA TAILLE DE VOTRE ENTREPRISE</p>
            <h2 id="solutions-title">
              Un poste aujourd’hui.
              <br />
              Un parc cohérent demain.
            </h2>
          </div>
          <p>
            Votre parc commence dès la première machine.{" "}
            <br />
            Il grandit avec votre activité.
          </p>
        </div>
        <div className="profile-grid">
          <ProfileCard
            tag="ÉQUIPER UN POSTE"
            icon="laptop"
            title="Bien démarrer."
            text="En solo ou pour un premier équipement : une seule machine suffit. Elle pose la base de votre futur parc."
            points={[
              "Un ordinateur choisi selon l’usage",
              "Les accessoires utiles au quotidien",
              "Vos logiciels et leur compatibilité vérifiés",
              "Maintenance et garantie swap incluses*",
            ]}
            priceTitle="Votre configuration."
            priceText="Votre loyer, sur devis."
            cta="Équiper un premier poste"
            onClick={() => onStart({ priority: "Trésorerie", size: "1 à 5 postes" })}
          />
          <ProfileCard
            featured
            tag="HARMONISER UN PARC"
            icon="shield"
            title="Avancer ensemble."
            text="Pour sortir des équipements disparates et créer une base commune à votre équipe."
            points={[
              "Des références définies par profil métier",
              "Des accessoires et habitudes plus cohérents",
              "Un renouvellement organisé avec vous",
              "Maintenance et garantie swap incluses*",
            ]}
            priceTitle="Votre équipe."
            priceText="Une offre pour votre parc."
            cta="Construire un parc cohérent"
            onClick={() => onStart({ priority: "Parc cohérent" })}
          />
          <ProfileCard
            tag="COMPOSER EN LIGNE"
            icon="cart"
            title="Aller droit au but."
            text="Vous savez ce qu’il vous faut ? Composez votre pack dans le configurateur et suivez votre mensualité en direct."
            points={[
              "Ordinateurs, écrans, smartphones et accessoires",
              "Votre mensualité calculée au fil de vos choix",
              "Une remise automatique selon le montant du pack",
              "Maintenance et garantie swap incluses*",
            ]}
            priceTitle={laptop ? `Dès ${formatMonthly(laptop.monthlyPrice)} € / mois` : "Votre pack, à la carte."}
            priceText={laptop ? "HTVA · ordinateur portable, au catalogue" : "Prix affichés en direct dans le configurateur."}
            cta="Composer mon pack"
            href={CONFIGURATOR_URL}
            external
            onClick={openConfigurator}
          />
        </div>
        <p className="solution-note">
          Configurations à définir sur devis.
          {laptop &&
            ` Prix « dès » : ordinateur portable le moins cher du configurateur (${laptop.name}), hors autres produits du pack.`}
        </p>
      </div>
    </section>
  );
};

// Onglets accessibles : flèches gauche/droite, Début et Fin déplacent la sélection.
const Day = ({ onStart }) => {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);

  const onKeyDown = (e, index) => {
    const last = SITUATIONS.length - 1;
    const target = { ArrowRight: index === last ? 0 : index + 1, ArrowLeft: index === 0 ? last : index - 1, Home: 0, End: last }[
      e.key
    ];
    if (target === undefined) return;
    e.preventDefault();
    setActive(target);
    tabRefs.current[target]?.focus();
  };

  return (
    <section className="day-section" id="quotidien" aria-labelledby="day-title">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">UNE INFORMATIQUE QUI SUIT LA VIE DE L’ENTREPRISE</p>
            <h2 id="day-title">
              Une bonne base.
              <br />
              Pour toute l’équipe.
            </h2>
          </div>
          <p>
            Des besoins qui évoluent. Des collaborateurs qui arrivent.{" "}
            <br />
            Votre équipement s’organise autour de votre activité.
          </p>
        </div>
        <div className="day-tabs" role="tablist" aria-label="Les situations de votre entreprise">
          {SITUATIONS.map((item, i) => (
            <button
              key={item.id}
              ref={(el) => (tabRefs.current[i] = el)}
              id={`tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-controls={`panel-${item.id}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              <span>0{i + 1}</span> {item.tab}
            </button>
          ))}
        </div>
        {SITUATIONS.map((item, i) => (
          <div
            key={item.id}
            className="day-panel"
            id={`panel-${item.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${item.id}`}
            tabIndex={0}
            hidden={active !== i}
          >
            <div className="day-photo">
              <img src={item.image} alt={item.alt} width="1536" height="1024" loading="lazy" />
              <span>{item.caption}</span>
            </div>
            <div className="day-copy">
              <p className="eyebrow">{item.eyebrow}</p>
              <h3>
                {item.title[0]}
                <br />
                {item.title[1]}
              </h3>
              <p>{item.text}</p>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>
                    <Svg id="check" /> {point}
                  </li>
                ))}
              </ul>
              <a className="text-link" href="#offre" onClick={() => onStart({ priority: item.priority })}>
                {item.cta} <span>↗</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Services = () => (
  <section className="continuity-section" id="services" aria-labelledby="services-title">
    <div className="container">
      <div className="continuity-heading">
        <p className="eyebrow">LE SERVICE FAIT PARTIE DE LA SOLUTION</p>
        <h2 id="services-title">
          Votre matériel travaille.
          <br />
          Son suivi est prévu.
        </h2>
        <p>Vous choisissez un équipement et un cadre pour l’accompagner pendant votre activité.</p>
      </div>
      <div className="continuity-grid">
        {[
          [
            "headset",
            "MAINTENANCE INCLUSE",
            ["Un souci technique ?", "Vous avez un interlocuteur."],
            "Le diagnostic et le suivi du matériel font partie de votre solution. Vous savez vers qui vous tourner pour organiser la prise en charge.",
          ],
          [
            "refresh",
            "GARANTIE SWAP",
            ["Une panne couverte ?", "Le remplacement est prévu."],
            "Après diagnostic, nous organisons l’échange du matériel concerné pour que vous repreniez l’activité au plus vite.",
          ],
        ].map(([icon, label, title, text]) => (
          <article key={label}>
            <Svg id={icon} />
            <p className="service-label">{label}</p>
            <h3>
              {title[0]}
              <br />
              {title[1]}
            </h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const Steps = () => (
  <section className="steps-band" aria-labelledby="steps-title">
    <div className="container">
      <div className="center-heading">
        <p className="eyebrow">UNE DÉMARCHE SIMPLE</p>
        <h2 id="steps-title">Votre parc se construit en trois étapes.</h2>
        <p>Un échange concret, une proposition claire, un équipement organisé.</p>
      </div>
      <div className="steps-grid">
        {[
          [
            "laptop",
            "On fait le point sur vos usages",
            "Nombre de postes, métiers, logiciels et contraintes : nous définissons la bonne base pour votre entreprise.",
          ],
          [
            "check",
            "Vous recevez votre proposition",
            "Matériel, loyer, durée, maintenance et garantie swap : le cadre est présenté avant votre engagement.",
          ],
          [
            "box",
            "On organise l’équipement",
            "Votre matériel arrive configuré, prêt à l’emploi, et son suivi est organisé avec vous.",
          ],
        ].map(([icon, title, text], i) => (
          <article key={title}>
            <span className="step-number">0{i + 1}</span>
            <Svg id={icon} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const COMPARISON = [
  ["Au démarrage", "Tout le parc à payer", "Un loyer mensuel fixe"],
  ["Maintenance", "À organiser vous-même", "Incluse dans le loyer"],
  ["En cas de panne", "Réparation à gérer", "Garantie swap : matériel remplacé*"],
  ["Un collaborateur arrive", "Un nouvel achat", "Un poste en plus, sans gros achat"],
  ["Votre matériel", "Neuf ou d’occasion", "Reconditionné, testé et garanti"],
];

const Comparison = ({ onStart }) => (
  <section className="comparison-section">
    <div className="container comparison-grid">
      <div>
        <p className="eyebrow">UNE AUTRE FAÇON DE S’ÉQUIPER</p>
        <h2>
          Votre trésorerie
          <br />
          reste dans vos projets.
        </h2>
        <p>Un loyer fixe pour le matériel et son suivi. Vous savez ce que coûte votre parc, mois après mois.</p>
        <a className="text-link" href="#offre" onClick={() => onStart()}>
          Construire mon offre <span>↗</span>
        </a>
      </div>
      <div className="comparison-table" role="table" aria-label="Comparaison achat et leasing">
        <div className="comparison-row table-head" role="row">
          <span role="columnheader">Votre quotidien</span>
          <span role="columnheader">Achat classique</span>
          <strong role="columnheader">iTakecare</strong>
        </div>
        {COMPARISON.map(([label, buy, lease]) => (
          <div className="comparison-row" role="row" key={label}>
            <span role="rowheader">{label}</span>
            <span role="cell">{buy}</span>
            <strong role="cell">
              {lease} <span>✓</span>
            </strong>
          </div>
        ))}
        <p className="table-note">Le leasing implique un contrat de 36 mois. Les modalités figurent dans votre offre.</p>
      </div>
    </div>
  </section>
);

const Faq = ({ onStart }) => {
  const [open, setOpen] = useState(0);
  return (
    <section className="section container faq-grid" id="questions">
      <div>
        <p className="eyebrow">AVANT DE VOUS ÉQUIPER</p>
        <h2>
          Les questions
          <br />
          des petites entreprises.
        </h2>
        <p>
          Budget, parc, maintenance et pannes.
          <br />
          Partons de ce qui compte pour vous.
        </p>
        <a className="text-link" href="#offre" onClick={() => onStart()}>
          Parler de mon besoin <span>↗</span>
        </a>
      </div>
      <div className="faq-list">
        {FAQ.map(([q, a], i) => (
          <details
            key={q}
            open={open === i}
            onToggle={(e) => {
              if (e.currentTarget.open) setOpen(i);
              else if (open === i) setOpen(null);
            }}
          >
            <summary>
              {q}
              <span className="plus" />
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
};

const EMPTY_CONTACT = { firstName: "", lastName: "", company: "", email: "", phone: "", message: "", website: "" };

const LeadForm = ({ form }) => {
  const { step, setStep, priority, setPriority, size, setSize } = form;
  const navigate = useNavigate();
  const [contact, setContact] = useState(EMPTY_CONTACT);
  const [invalid, setInvalid] = useState(null);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const legendRefs = useRef([]);

  const goTo = (value) => {
    setStep(value);
    setError(null);
    requestAnimationFrame(() => legendRefs.current[value]?.focus({ preventScroll: true }));
  };

  const update = (key) => (e) => {
    setContact({ ...contact, [key]: e.target.value });
    setInvalid(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) return priority ? goTo(2) : setError("Choisissez votre priorité pour continuer.");
    if (step === 2) return size ? goTo(3) : setError("Indiquez le nombre de postes pour continuer.");

    const required = [
      ["firstName", "Indiquez votre prénom."],
      ["lastName", "Indiquez votre nom."],
      ["company", "Indiquez le nom de votre entreprise."],
    ];
    for (const [key, message] of required) {
      if (!contact[key].trim()) {
        setInvalid(key);
        return setError(message);
      }
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) {
      setInvalid("email");
      return setError("Indiquez une adresse e-mail valide.");
    }
    if (!isValidPhone(contact.phone)) {
      setInvalid("phone");
      return setError(contact.phone.trim() ? "Indiquez un numéro de téléphone valide." : "Indiquez votre numéro de téléphone.");
    }
    // État réel de la case (l'auto-remplissage peut la cocher sans passer par onChange).
    if (!e.currentTarget.elements.consent?.checked) {
      return setError("Merci d’accepter d’être recontacté·e pour recevoir votre offre.");
    }

    // Pas de pack sur cette page : le nombre de postes sert de profil, la priorité de choix.
    setSending(true);
    try {
      await submitLead({
        vertical: pme.slug,
        profile: size,
        need: PRIORITIES.find((item) => item.value === priority).label,
        ...contact,
        consent: true,
      });
      track("Lead", { content_category: pme.slug });
      setSubmitted(true);
    } catch {
      setSending(false);
      setError("L’envoi a échoué. Vérifiez vos informations et réessayez dans un instant.");
    }
  };

  const fieldProps = (key) => ({
    name: key,
    value: contact[key],
    onChange: update(key),
    "aria-invalid": invalid === key ? "true" : undefined,
  });

  if (submitted) return <BookingStep category={pme.slug} onFinish={() => navigate(`/lp/${pme.slug}/merci`)} />;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-top">
        <span>ÉTAPE {step} SUR 4</span>
        <span>Votre offre TPE/PME</span>
      </div>
      <div className="progress" aria-hidden="true">
        <span style={{ width: `${(step * 100) / 4}%` }} />
      </div>

      {step === 1 && (
        <fieldset>
          <legend tabIndex={-1} ref={(el) => (legendRefs.current[1] = el)}>
            Votre priorité aujourd’hui&nbsp;?
          </legend>
          <p className="form-hint">Choisissez ce qui compte le plus pour votre entreprise.</p>
          <div className="choice-stack">
            {PRIORITIES.map((item) => (
              <label className="choice" key={item.value}>
                <input
                  type="radio"
                  name="priority"
                  value={item.value}
                  checked={priority === item.value}
                  onChange={() => {
                    setPriority(item.value);
                    setError(null);
                  }}
                />
                <Svg id={item.icon} className="choice-svg" />
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.hint}</small>
                </span>
                <i />
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset>
          <legend tabIndex={-1} ref={(el) => (legendRefs.current[2] = el)}>
            Combien de postes à équiper&nbsp;?
          </legend>
          <p className="form-hint">Une première indication, à préciser ensemble.</p>
          <div className="choice-stack">
            {SIZES.map((item) => (
              <label className="choice" key={item.value}>
                <input
                  type="radio"
                  name="size"
                  value={item.value}
                  checked={size === item.value}
                  onChange={() => {
                    setSize(item.value);
                    setError(null);
                  }}
                />
                <Svg id="laptop" className="choice-svg" />
                <span>
                  <strong>{item.value}</strong>
                  <small>{item.hint}</small>
                </span>
                <i />
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {step === 3 && (
        <fieldset>
          <legend tabIndex={-1} ref={(el) => (legendRefs.current[3] = el)}>
            Faisons connaissance.
          </legend>
          <p className="form-hint">Les champs marqués d’un * sont obligatoires.</p>
          <div className="field-row">
            <label className="field">
              Votre prénom *
              <input {...fieldProps("firstName")} autoComplete="given-name" maxLength={80} placeholder="Ex. Alex" />
            </label>
            <label className="field">
              Votre nom *
              <input {...fieldProps("lastName")} autoComplete="family-name" maxLength={80} placeholder="Ex. Martin" />
            </label>
          </div>
          <label className="field">
            Votre entreprise *
            <input {...fieldProps("company")} autoComplete="organization" maxLength={200} placeholder="Nom de votre entreprise" />
          </label>
          <label className="field">
            Votre e-mail professionnel *
            <input
              {...fieldProps("email")}
              type="email"
              autoComplete="email"
              maxLength={180}
              placeholder="vous@votre-entreprise.be"
            />
          </label>
          <label className="field">
            Votre téléphone *
            <input {...fieldProps("phone")} type="tel" autoComplete="tel" maxLength={30} placeholder="Ex. 0470 12 34 56" />
          </label>
          <label className="field">
            Vos logiciels ou votre besoin <span>(facultatif)</span>
            <textarea
              {...fieldProps("message")}
              rows={2}
              maxLength={500}
              placeholder="Parc actuel, logiciels métier, renouvellement prévu…"
            />
          </label>
          <input {...fieldProps("website")} className="trap" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <label className="consent">
            <input type="checkbox" name="consent" />
            <span>
              J’accepte d’être recontacté·e par iTakecare au sujet de ma demande, conformément à la{" "}
              <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer">
                politique de confidentialité
              </a>
              .
            </span>
          </label>
        </fieldset>
      )}

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      {step === 3 && <p className="form-hint">Étape suivante : choisissez votre rendez-vous, par téléphone ou en visio.</p>}
      <div className="form-controls">
        {step > 1 && (
          <button type="button" className="back-button" onClick={() => goTo(step - 1)}>
            ← Retour
          </button>
        )}
        <button type="submit" className="button" disabled={sending}>
          <span>{step === 3 ? (sending ? "Envoi…" : "Recevoir mon offre") : "Continuer"}</span>
          <Svg id="arrow" />
        </button>
      </div>
    </form>
  );
};

const Offer = ({ form }) => (
  <section className="offer-section" id="offre" aria-labelledby="offer-title">
    <div className="container offer-grid">
      <div className="offer-copy">
        <p className="eyebrow">PARLONS DE VOTRE ENTREPRISE</p>
        <h2 id="offer-title">
          Un parc plus simple.{" "}
          <br />
          De la marge{" "}
          <br />
          pour vos projets.
        </h2>
        <p>Quelques informations pour construire une offre adaptée à votre équipe et à vos priorités.</p>
        <ul>
          {["Un équipement cohérent avec vos usages", "Maintenance incluse et garantie swap*", "Un devis sans engagement"].map(
            (item) => (
              <li key={item}>
                <Svg id="check" /> {item}
              </li>
            )
          )}
        </ul>
        <div className="offer-signature">
          <Svg id="headset" />
          <p>
            Votre énergie, dans votre activité.
            <br />
            <strong>Votre matériel, bien accompagné.</strong>
          </p>
        </div>
      </div>
      <div className="form-card">
        <LeadForm form={form} />
      </div>
    </div>
  </section>
);

// Barre mobile : masquée quand le formulaire est à l'écran.
const MobileCta = ({ onStart, laptop }) => {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const target = document.getElementById("offre");
    if (!target || !("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);
  return (
    <div className={`mobile-cta${hidden ? " is-hidden" : ""}`}>
      <div>
        {laptop ? (
          <>
            <small>Ordinateur portable dès</small>
            <strong>
              {formatMonthly(laptop.monthlyPrice)} € <span>HTVA / mois</span>
            </strong>
          </>
        ) : (
          <>
            <small>Dès un seul poste</small>
            <strong>
              Une offre <span>adaptée à votre activité</span>
            </strong>
          </>
        )}
      </div>
      <a className="button button-small" href="#offre" onClick={() => onStart()}>
        Mon offre <Svg id="arrow" />
      </a>
    </div>
  );
};

export const PmePage = () => {
  const [step, setStep] = useState(1);
  const [priority, setPriority] = useState(null);
  const [size, setSize] = useState(null);
  const laptop = useCheapestLaptop();

  // Tout appel à l'action ramène au début du formulaire ; une carte ou une situation pré-sélectionne ses choix.
  const start = ({ priority: priorityKey, size: sizeKey } = {}) => {
    if (priorityKey) setPriority(priorityKey);
    if (sizeKey) setSize(sizeKey);
    setStep(1);
  };

  return (
    <div className="pme-lp sme-page">
      <IconLibrary />
      <a href="#main" className="skip">
        Aller au contenu
      </a>
      <Header onStart={start} />
      <main id="main">
        <Hero onStart={start} laptop={laptop} />
        <BenefitsBar />
        <Treasury />
        <Solutions onStart={start} laptop={laptop} />
        <Day onStart={start} />
        <Services />
        <Steps />
        <Comparison onStart={start} />
        <Faq onStart={start} />
        <Offer form={{ step, setStep, priority, setPriority, size, setSize }} />
        <div className="conditions container">
          <p>
            * Maintenance et garantie swap selon le périmètre, les conditions et les délais du contrat. Configurations,
            loyers, durée et licences à définir sur devis. Photos d’illustration.
          </p>
        </div>
      </main>
      <Footer />
      <MobileCta onStart={start} laptop={laptop} />
    </div>
  );
};

// Page de remerciement TPE/PME, dans le même style.
export const PmeThankYou = () => (
  <div className="pme-lp sme-page">
    <IconLibrary />
    <header className="site-header">
      <div className="container nav">
        <Brand href="/lp/pme" label="iTakecare, retour à la page" />
      </div>
    </header>
    <main id="main">
      <section className="offer-section" style={{ minHeight: "70vh" }}>
        <div className="container" style={{ maxWidth: 620 }}>
          <div className="form-card">
            <div className="form-success">
              <span className="success-icon">
                <Svg id="check" />
              </span>
              <p className="eyebrow">DEMANDE BIEN REÇUE</p>
              <h3>
                Votre projet
                <br />
                prend forme.
              </h3>
              <p>Un conseiller iTakecare vous recontacte sous 24 h ouvrables avec une offre adaptée à votre entreprise.</p>
              <BookingWidget category="pme" />
              <dl>
                <dt>1</dt>
                <dd>Vous recevez un e-mail de confirmation.</dd>
                <dt>2</dt>
                <dd>Votre conseiller vous appelle pour faire le point sur votre parc et vos usages.</dd>
                <dt>3</dt>
                <dd>Vous recevez votre offre personnalisée.</dd>
              </dl>
              <a className="button button-outline" href="/lp/pme">
                Revenir à la page <Svg id="arrow" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);
