// Landing page immobilier, d'après la maquette « iTakecare Immobilier » du 02/11/2026
// (palette bleu nuit / cuivre / ivoire, visuels générés, parcours en 8 temps).
// Le formulaire est le vrai : il passe par submitLead → landing-lead → Leazr (source funnelimmo).

import React, { useEffect, useRef, useState } from "react";
import { GoogleRating } from "../components/GoogleRating";
import { useNavigate } from "react-router-dom";
import { isValidPhone, submitLead, track } from "../lib/leads";
import { immobilier } from "../verticals/immobilier";
import { Footer } from "../sante/SantePage";
import heroImage from "./assets/hero-mobilite.webp";
import agenceImage from "./assets/agence-performance.webp";
import visiteImage from "./assets/visite-connectee.webp";
import iwinImage from "../sante/assets/pack-iwin.webp";
import idiscoveryImage from "../sante/assets/pack-idiscovery.webp";
import logo from "../sante/assets/logo-itakecare.png";
import "./immobilier.css";

const PRIVACY_URL = "https://www.itakecare.be/politique-confidentialite";

// Choix « pack » du formulaire → pack du catalogue (prix + produits pour Leazr).
const PACK_CHOICES = {
  iWin: { label: "iWin · Windows", detail: "78,90 € HTVA / mois · 36 mois", packName: "Pack iWin" },
  iDiscovery: { label: "iDiscovery · Apple", detail: "89,90 € HTVA / mois · 36 mois", packName: "Pack iDiscovery" },
  Conseil: { label: "Un conseil ou une offre pour mon équipe", detail: "Construisons la solution ensemble", packName: null },
};

const PRIORITIES = [
  { value: "Performance", icon: "speed", label: "Plus de performance", hint: "Annonces, photos, dossiers et multitâche" },
  { value: "Gain de temps", icon: "clock", label: "Gagner du temps", hint: "Un quotidien plus simple à organiser" },
  { value: "Mobilité", icon: "pin", label: "Travailler en mobilité", hint: "De l’agence aux visites, sans vous alourdir" },
];

// Onglets « Votre quotidien » : chaque lien présélectionne la priorité dans le formulaire.
const SITUATIONS = [
  {
    id: "agence",
    tab: "À l’agence",
    image: agenceImage,
    alt: "Deux collègues préparent leurs dossiers et leurs annonces immobilières à l’agence.",
    caption: "PRÉPARER · PRÉSENTER · AVANCER",
    eyebrow: "LA PERFORMANCE QUI SERT VOTRE MÉTIER",
    title: ["Préparez vos annonces.", "Gardez votre élan."],
    text: "Photos de biens, présentations et dossiers : choisissez un ordinateur adapté à votre charge de travail, pas un outil qui vous freine.",
    points: [
      "Une configuration pensée pour vos usages",
      "Vos logiciels et votre CRM vérifiés avant de choisir",
      "Un poste cohérent, à l’agence comme à domicile",
    ],
    cta: "Je veux un matériel à la hauteur",
    priority: "Performance",
  },
  {
    id: "visite",
    tab: "En visite",
    image: visiteImage,
    alt: "Un agent immobilier présente un dossier sur son ordinateur à des acheteurs pendant une visite.",
    caption: "EXPLIQUER · MONTRER · RASSURER",
    eyebrow: "LE TEMPS PASSÉ AVEC VOS CLIENTS COMPTE",
    title: ["Le bien devant vous.", "Le dossier à portée de main."],
    text: "Présentez vos photos, retrouvez un plan et préparez vos échanges. Votre ordinateur vous accompagne là où la discussion a lieu.",
    points: [
      "Un format portable facile à emporter",
      "Vos présentations sur un écran confortable",
      "Moins d’allers-retours pour retrouver un document",
    ],
    cta: "Je veux simplifier mon quotidien",
    priority: "Gain de temps",
  },
  {
    id: "mobilite",
    tab: "Entre deux rendez-vous",
    image: heroImage,
    alt: "Une agente immobilière consulte son téléphone à l’extérieur d’un bien.",
    caption: "APPELER · CONFIRMER · RELANCER",
    eyebrow: "LA MOBILITÉ SANS CHANGER VOS HABITUDES",
    title: ["Une visite se termine.", "Le suivi commence."],
    text: "Un appel à passer, un rendez-vous à confirmer, une relance à préparer. Ordinateur et smartphone vous suivent d’une adresse à l’autre.",
    points: [
      "Deux outils complémentaires dans un seul pack",
      "Votre agenda et vos applications habituelles*",
      "Un équipement adapté aux journées en mouvement",
    ],
    cta: "Je veux rester mobile",
    priority: "Mobilité",
    note: "* Selon vos logiciels et abonnements. Connexion internet et forfait mobile non inclus.",
  },
];

const FAQ = [
  [
    "Mon CRM immobilier fonctionnera-t-il sur le matériel ?",
    "La compatibilité dépend de votre logiciel, de sa version et du système choisi. Indiquez-nous votre CRM et vos outils de gestion, de photo ou de présentation : nous vérifions les prérequis avec vous avant de finaliser la configuration. Aucune licence CRM n’est incluse dans les packs présentés.",
  ],
  [
    "Puis-je travailler entre deux visites ?",
    "Les packs associent un ordinateur portable et un smartphone. L’accès à vos outils en ligne dépend de votre connexion et de vos abonnements habituels. Le forfait mobile, la connexion internet et les services cloud ne sont pas inclus dans les prix présentés.",
  ],
  [
    "Et si je traite beaucoup de photos ou de vidéos ?",
    "Dites-nous quels logiciels vous utilisez et le volume de contenus que vous traitez. Nous vérifions les besoins en mémoire, stockage et puissance. Une configuration différente peut être proposée sur devis, notamment pour des usages photo ou vidéo exigeants.",
  ],
  [
    "Puis-je équiper plusieurs collaborateurs ?",
    "Oui, vous pouvez demander une offre pour votre équipe. Précisez le nombre de personnes, les systèmes utilisés et les besoins de chacun. Les configurations, services et conditions seront définis dans votre proposition.",
  ],
  [
    "Quelle différence entre un devis sans engagement et le contrat ?",
    "Demander une offre ne vous engage pas. Les prix présentés correspondent à un leasing de 36 mois ; l’engagement commence uniquement après validation et signature du contrat.",
  ],
  [
    "Quels services sont compris dans ma solution ?",
    "Votre offre précise le matériel, la maintenance, la garantie et les modalités d’assistance ou de remplacement retenues. Les délais et le périmètre du service doivent être confirmés dans votre devis.",
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
      <symbol id="headset" viewBox="0 0 24 24"><path d="M4 14v-3a8 8 0 0 1 16 0v3M4 12H2v7h4v-7zm16 0h2v7h-4v-7zm0 7c0 3-3 3-6 3" /></symbol>
      <symbol id="laptop" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="12" rx="1" /><path d="m4 16-3 4h22l-3-4M9 20h6" /></symbol>
      <symbol id="clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></symbol>
      <symbol id="box" viewBox="0 0 24 24"><path d="m12 2 9 5v10l-9 5-9-5V7zm0 10 9-5M12 12 3 7m9 5v10M7 4.5l9 5" /></symbol>
      <symbol id="pin" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></symbol>
      <symbol id="speed" viewBox="0 0 24 24"><path d="M3 18a10 10 0 1 1 18 0M12 13l6-7M6 15H4m16 0h-2M7 7 6 6m6-2V2" /><circle cx="12" cy="14" r="2" /></symbol>
      <symbol id="leaf" viewBox="0 0 24 24"><path d="M20 3S6 1 4 10s6 12 11 7 5-14 5-14ZM3 22 16 8" /></symbol>
    </defs>
  </svg>
);

const Brand = ({ href, label }) => (
  <a className="brand" href={href} aria-label={label}>
    <img src={logo} alt="iTakecare" width="167" height="38" />
    <span>
      pour les pros
      <br />
      de l’immobilier
    </span>
  </a>
);

const Header = ({ onStart }) => (
  <header className="site-header">
    <div className="container nav">
      <Brand href="#main" label="iTakecare, haut de page" />
      <a className="button button-small" href="#offre" onClick={() => onStart()}>
        Mon offre immo <Svg id="arrow" />
      </a>
    </div>
  </header>
);

const Hero = ({ onStart }) => (
  <section className="hero container" aria-labelledby="hero-title">
    <div className="hero-copy">
      <p className="eyebrow">
        <span className="live-dot" /> AGENTS IMMOBILIERS INDÉPENDANTS & AGENCES
      </p>
      <h1 id="hero-title">
        Votre bureau
        <br />
        vous suit.
        <br />
        <em>
          Votre activité
          <br />
          avance.
        </em>
      </h1>
      <p className="hero-description">
        De l’agence aux visites, gardez le rythme. Un ordinateur performant, un smartphone à portée de main et une
        équipe pour suivre votre matériel.
      </p>
      <div className="hero-actions">
        <a className="button" href="#offre" onClick={() => onStart()}>
          Composer mon pack immo <Svg id="arrow" />
        </a>
        <a className="text-link" href="#packs">
          Voir les packs <span>↗</span>
        </a>
      </div>
      <p className="reassurance">
        <Svg id="check" /> Devis sans engagement <span>·</span> Un conseiller en Belgique
      </p>
      <GoogleRating />
    </div>
    <div className="hero-visual">
      <div className="photo-frame">
        <img
          src={heroImage}
          alt="Une agente immobilière consulte son smartphone entre deux visites, son ordinateur sous le bras."
          width="1536"
          height="1024"
          fetchpriority="high"
        />
        <span className="photo-label">L’immobilier bouge. Vous aussi.</span>
      </div>
      <div className="care-note">
        <span className="note-icon">
          <Svg id="pin" />
        </span>
        <div>
          <strong>Votre prochain rendez-vous vous attend.</strong>
          <span>Vos outils sont du voyage.</span>
        </div>
      </div>
      <div className="hero-price">
        <span>Ordinateur + smartphone + accessoires, dès</span>
        <div>
          <strong>
            78,90<span> €</span>
          </strong>
          <span>HTVA / mois</span>
        </div>
        <small>Leasing sur 36 mois · Configuration personnalisable</small>
      </div>
    </div>
  </section>
);

const BenefitsBar = () => (
  <div className="benefits-bar">
    <div className="container benefits-grid">
      <div>
        <Svg id="speed" />
        <p>
          <strong>La performance au quotidien</strong>
          <span>Des outils adaptés à votre façon de travailler</span>
        </p>
      </div>
      <div>
        <Svg id="clock" />
        <p>
          <strong>Du temps pour vos clients</strong>
          <span>Le suivi du matériel, en un seul endroit</span>
        </p>
      </div>
      <div>
        <Svg id="pin" />
        <p>
          <strong>Votre bureau, partout avec vous</strong>
          <span>Ordinateur et smartphone dans un même pack</span>
        </p>
      </div>
    </div>
  </div>
);

const PackCard = ({ apple, tag, image, alt, name, tagline, os, price, equipment, packKey, url, onStart }) => (
  <article className={`pack-card${apple ? " apple" : ""}`}>
    <div className="pack-photo">
      <span className="pack-tag">{tag}</span>
      <img src={image} alt={alt} width="1536" height="1024" loading="lazy" />
    </div>
    <div className="pack-body">
      <div className="pack-title">
        <div>
          <h3>{name}</h3>
          <p>{tagline}</p>
        </div>
        <span className="os">{os}</span>
      </div>
      <div className="price">
        <strong>
          {price}
          <span> €</span>
        </strong>
        <span>
          HTVA / mois
          <br />
          sur 36 mois
        </span>
      </div>
      <ul className="equipment">
        {equipment.map(([label, value]) => (
          <li key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </li>
        ))}
      </ul>
      <p className="pack-included">
        <Svg id="check" /> Maintenance et garantie incluses
      </p>
      <a className={`button${apple ? "" : " button-outline"}`} href="#offre" onClick={() => onStart({ pack: packKey })}>
        Personnaliser mon {packKey} <Svg id="arrow" />
      </a>
      <a className="catalogue" href={url} target="_blank" rel="noopener noreferrer">
        Voir la fiche catalogue <span>↗</span>
      </a>
    </div>
  </article>
);

const Packs = ({ onStart }) => (
  <section className="section container packs-section" id="packs" aria-labelledby="packs-title">
    <div className="section-heading">
      <div>
        <p className="eyebrow">VOTRE PROCHAIN OUTIL DE TRAVAIL</p>
        <h2 id="packs-title">
          Du premier contact
          <br />à la dernière visite.
        </h2>
      </div>
      <p>
        Deux univers. Un même objectif :{" "}
        <br />
        vous équiper pour avancer.
      </p>
    </div>
    <div className="pack-grid">
      <PackCard
        tag="LA POLYVALENCE WINDOWS"
        image={iwinImage}
        alt="Illustration du pack iWin : ordinateur Windows, smartphone, hub et souris."
        name="Le pack iWin"
        tagline="Votre agence dans un format mobile."
        os="Windows"
        price="78,90"
        equipment={[
          ["Ordinateur", "HP ProBook 440 G11"],
          ["Smartphone", "Samsung Galaxy S24 Ultra"],
          ["Accessoires", "Hub USB-C · MX Anywhere 3S"],
          ["Bureautique", "Microsoft Office 2024"],
        ]}
        packKey="iWin"
        url="https://www.itakecare.be/catalogue/pack/265dce6d-454a-437d-a975-db4bb5acf466"
        onStart={onStart}
      />
      <PackCard
        apple
        tag="LA FLUIDITÉ APPLE"
        image={idiscoveryImage}
        alt="Illustration du pack iDiscovery : MacBook, iPhone, hub et souris."
        name="Le pack iDiscovery"
        tagline="Votre univers Apple, de l’agence au terrain."
        os="macOS"
        price="89,90"
        equipment={[
          ["Ordinateur", "MacBook Air 13 M4"],
          ["Smartphone", "iPhone 16 Pro Max"],
          ["Accessoires", "Hub USB-C · Magic Mouse 2"],
          ["Bureautique", "Microsoft Office 2024"],
        ]}
        packKey="iDiscovery"
        url="https://www.itakecare.be/catalogue/pack/fd591ae8-90ca-4668-9dd8-9c88984f9cb5"
        onStart={onStart}
      />
    </div>
    <div className="packs-footnote">
      <p>
        Prix catalogue HTVA, leasing sur 36 mois. Configuration et conditions à confirmer sur devis. Visuels produits
        illustratifs.
      </p>
      <a href="#offre" onClick={() => onStart({ pack: "Conseil" })}>
        Une équipe à équiper ? Construisons votre offre <span>↗</span>
      </a>
    </div>
  </section>
);

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
            <p className="eyebrow">VOTRE JOURNÉE NE TIENT PAS À UN BUREAU</p>
            <h2 id="day-title">
              Le bon outil.
              <br />
              Au bon moment.
            </h2>
          </div>
          <p>
            Des annonces à préparer. Des visites à enchaîner.{" "}
            <br />
            Des clients à rappeler. Votre matériel doit suivre.
          </p>
        </div>
        <div className="day-tabs" role="tablist" aria-label="Votre quotidien immobilier">
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
              {item.note && <p className="day-note">{item.note}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Support = () => (
  <section className="section container support-section" aria-labelledby="support-title">
    <div className="support-intro">
      <div>
        <p className="eyebrow">VOTRE MÉTIER, C’EST L’IMMOBILIER</p>
        <h2 id="support-title">
          Les dossiers avancent.
          <br />
          Le matériel est suivi.
        </h2>
      </div>
      <p>
        Le gain de temps commence aussi par une informatique plus simple à gérer. Un même interlocuteur pour construire
        votre solution et organiser son suivi.
      </p>
    </div>
    <div className="support-grid">
      {[
        [
          "headset",
          "Un contact qui connaît votre besoin",
          "Indépendant, petite agence ou équipe : expliquez-nous votre organisation et les outils que vous utilisez.",
        ],
        [
          "shield",
          "Un cadre clair pour le suivi",
          "Maintenance et garantie incluses : vous savez qui appeler quand un appareil fait défaut.",
        ],
        [
          "leaf",
          "Un choix responsable, un loyer fixe",
          "Du matériel reconditionné, testé et garanti, pour une mensualité fixe pendant tout le contrat.",
        ],
      ].map(([icon, title, text]) => (
        <article key={title}>
          <Svg id={icon} />
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </div>
  </section>
);

const Steps = () => (
  <section className="steps-band" aria-labelledby="steps-title">
    <div className="container">
      <div className="center-heading">
        <p className="eyebrow">SIMPLE À CHOISIR. SIMPLE À METTRE EN ROUTE.</p>
        <h2 id="steps-title">Votre prochain pack, en trois étapes.</h2>
        <p>On part de vos journées, pas d’une fiche technique.</p>
      </div>
      <div className="steps-grid">
        {[
          ["laptop", "Vous parlez de votre activité", "Vos déplacements, vos logiciels, votre équipe : nous identifions ce qui compte pour vous."],
          ["check", "Vous recevez une offre claire", "Matériel, loyer et services détaillés. Vous validez uniquement quand la solution vous convient."],
          ["box", "Votre équipement vous rejoint", "Votre matériel arrive configuré et prêt à l’emploi, au moment convenu avec vous."],
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
  ["Au démarrage", "Tout le matériel à payer", "Un loyer mensuel fixe"],
  ["Maintenance", "À organiser vous-même", "Incluse dans le loyer"],
  ["En cas de panne", "Réparation à gérer", "Un interlocuteur, garantie incluse"],
  ["Nouvel agent à équiper", "Un nouvel achat", "Un poste en plus, sans gros achat"],
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
          reste sur le terrain.
        </h2>
        <p>Un loyer fixe pour l’ordinateur, le smartphone et leur suivi. Vos fonds restent disponibles pour votre agence.</p>
        <a className="text-link" href="#offre" onClick={() => onStart()}>
          Construire mon offre immo <span>↗</span>
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
        <p className="eyebrow">AVANT DE PASSER À LA SUITE</p>
        <h2>
          Les questions
          <br />
          de terrain.
        </h2>
        <p>
          Vos logiciels, votre mobilité, votre équipe.
          <br />
          On part de vos usages réels.
        </p>
        <a className="text-link" href="#offre" onClick={() => onStart()}>
          Parler de mon projet <span>↗</span>
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
  const { step, setStep, priority, setPriority, pack, setPack } = form;
  const navigate = useNavigate();
  const [contact, setContact] = useState(EMPTY_CONTACT);
  const [invalid, setInvalid] = useState(null);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);
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
    if (step === 2) return pack ? goTo(3) : setError("Choisissez un pack ou une offre personnalisée pour continuer.");

    const required = [
      ["firstName", "Indiquez votre prénom."],
      ["lastName", "Indiquez votre nom."],
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

    const choice = PACK_CHOICES[pack];
    const catalogPack = immobilier.packs.items.find((item) => item.name === choice.packName);
    setSending(true);
    try {
      await submitLead({
        vertical: immobilier.slug,
        profile: `Priorité ${priority.toLowerCase()}`,
        need: choice.packName ?? "Conseil ou offre équipe",
        packPrice: catalogPack?.price,
        packProducts: catalogPack?.products ?? [],
        ...contact,
        consent: true,
      });
      track("Lead", { content_category: immobilier.slug });
      navigate(`/lp/${immobilier.slug}/merci`);
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

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-top">
        <span>ÉTAPE {step} SUR 3</span>
        <span>Votre offre immobilier</span>
      </div>
      <div className="progress" aria-hidden="true">
        <span style={{ width: `${(step * 100) / 3}%` }} />
      </div>

      {step === 1 && (
        <fieldset>
          <legend tabIndex={-1} ref={(el) => (legendRefs.current[1] = el)}>
            Votre priorité au quotidien&nbsp;?
          </legend>
          <p className="form-hint">Choisissez ce qui ferait la différence pour vous.</p>
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
            Quel univers vous convient&nbsp;?
          </legend>
          <p className="form-hint">Votre conseiller affinera la configuration avec vous.</p>
          <div className="choice-stack">
            {Object.entries(PACK_CHOICES).map(([key, item]) => (
              <label className="choice" key={key}>
                <input
                  type="radio"
                  name="pack"
                  value={key}
                  checked={pack === key}
                  onChange={() => {
                    setPack(key);
                    setError(null);
                  }}
                />
                <Svg id={key === "Conseil" ? "headset" : "laptop"} className="choice-svg" />
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.detail}</small>
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
            Parlons de votre activité.
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
            Votre e-mail professionnel *
            <input
              {...fieldProps("email")}
              type="email"
              autoComplete="email"
              maxLength={180}
              placeholder="vous@votre-agence.be"
            />
          </label>
          <label className="field">
            Votre agence <span>(facultatif)</span>
            <input
              {...fieldProps("company")}
              autoComplete="organization"
              maxLength={200}
              placeholder="Indépendant ou nom de l’agence"
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
              placeholder="CRM, photo ou vidéo, nombre de collaborateurs…"
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
        <p className="eyebrow">VOTRE PROCHAIN PAS</p>
        <h2 id="offer-title">
          Moins de freins.{" "}
          <br />
          Plus de terrain.
        </h2>
        <p>Parlez-nous de votre activité. Nous composons une offre adaptée à votre façon de travailler.</p>
        <ul>
          {["Une configuration selon vos usages", "Un devis sans engagement", "Un interlocuteur en Belgique"].map((item) => (
            <li key={item}>
              <Svg id="check" /> {item}
            </li>
          ))}
        </ul>
        <div className="offer-signature">
          <Svg id="pin" />
          <p>
            Votre énergie, sur vos projets.
            <br />
            <strong>Vos outils, à la hauteur.</strong>
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
const MobileCta = ({ onStart }) => {
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
        <small>Pack ordinateur + smartphone dès</small>
        <strong>
          78,90 € <span>HTVA / mois</span>
        </strong>
      </div>
      <a className="button button-small" href="#offre" onClick={() => onStart()}>
        Mon offre immo <Svg id="arrow" />
      </a>
    </div>
  );
};

export const ImmobilierPage = () => {
  const [step, setStep] = useState(1);
  const [priority, setPriority] = useState(null);
  const [pack, setPack] = useState(null);

  // Tout appel à l'action ramène au début du formulaire ; un pack ou une situation pré-sélectionne son choix.
  const start = ({ pack: packKey, priority: priorityKey } = {}) => {
    if (packKey) setPack(packKey);
    if (priorityKey) setPriority(priorityKey);
    setStep(1);
  };

  return (
    <div className="immo-lp immo-page">
      <IconLibrary />
      <a href="#main" className="skip">
        Aller au contenu
      </a>
      <Header onStart={start} />
      <main id="main">
        <Hero onStart={start} />
        <BenefitsBar />
        <Packs onStart={start} />
        <Day onStart={start} />
        <Support />
        <Steps />
        <Comparison onStart={start} />
        <Faq onStart={start} />
        <Offer form={{ step, setStep, priority, setPriority, pack, setPack }} />
        <div className="conditions container">
          <p>
            Tarifs et compositions repris du catalogue iTakecare. Prix HTVA, leasing sur 36 mois. Disponibilité,
            configurations, logiciels et services à confirmer dans votre offre. Photos d’illustration.
          </p>
        </div>
      </main>
      <Footer />
      <MobileCta onStart={start} />
    </div>
  );
};

// Page de remerciement immobilier, dans le même style.
export const ImmobilierThankYou = () => (
  <div className="immo-lp immo-page">
    <IconLibrary />
    <header className="site-header">
      <div className="container nav">
        <Brand href="/lp/immobilier" label="iTakecare, retour à la page" />
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
              <p>Un conseiller iTakecare vous recontacte sous 24 h ouvrables avec une offre adaptée à votre activité.</p>
              <dl>
                <dt>1</dt>
                <dd>Vous recevez un e-mail de confirmation.</dd>
                <dt>2</dt>
                <dd>Votre conseiller vous appelle pour comprendre votre activité et vos logiciels.</dd>
                <dt>3</dt>
                <dd>Vous recevez votre offre personnalisée.</dd>
              </dl>
              <a className="button button-outline" href="/lp/immobilier">
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
