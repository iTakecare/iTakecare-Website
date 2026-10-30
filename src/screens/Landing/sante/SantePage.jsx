// Landing page santé, d'après la maquette « iTakecare Santé » du 30/10/2026
// (palette sauge / crème / vert profond, visuels générés, parcours en 8 temps).
// Le formulaire est le vrai : il passe par submitLead → landing-lead → Leazr (source funnelsante).

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitLead, track } from "../lib/leads";
import { sante } from "../verticals/sante";
import heroImage from "./assets/hero-soignante.webp";
import iwinImage from "./assets/pack-iwin.webp";
import idiscoveryImage from "./assets/pack-idiscovery.webp";
import kineImage from "./assets/quotidien-kine.webp";
import logo from "./assets/logo-itakecare.png";
import "./sante.css";

const PRIVACY_URL = "https://www.itakecare.be/politique-confidentialite";

// Choix « pack » du formulaire → pack du catalogue (prix + produits pour Leazr).
const PACK_CHOICES = {
  iWin: { label: "iWin · Windows", detail: "78,90 € HTVA / mois · 36 mois", packName: "Pack iWin" },
  iDiscovery: { label: "iDiscovery · Apple", detail: "89,90 € HTVA / mois · 36 mois", packName: "Pack iDiscovery" },
  Conseil: { label: "J’aimerais être conseillé·e", detail: "Ou composer un pack différent", packName: null },
};

const PROFESSIONS = [
  { value: "Infirmier·e", symbol: "+", hint: "À domicile ou en cabinet" },
  { value: "Kinésithérapeute", symbol: "⌁", hint: "Au cabinet et en déplacement" },
  { value: "Autre profession de santé", symbol: "♡", hint: "Une offre adaptée à votre pratique" },
];

const FAQ = [
  [
    "Mon logiciel de soins sera-t-il compatible ?",
    "La compatibilité dépend du logiciel et du système choisi. Indiquez-nous le nom de votre outil de soins ou de facturation : nous vérifions ce point avant la livraison et vous orientons vers le pack adapté.",
  ],
  [
    "Que comprend exactement mon loyer ?",
    "Le matériel du pack, les accessoires et Office 2024, ainsi que la maintenance, la garantie et le remplacement sous 24 h en cas de panne, selon les conditions du contrat. Votre devis précise la configuration et les modalités.",
  ],
  [
    "Suis-je engagé pour 36 mois ?",
    "Les prix présentés correspondent à un leasing sur 36 mois. La demande de devis est gratuite et sans engagement : le contrat ne commence qu’après votre accord et sa signature.",
  ],
  [
    "Et les données de mes patients ?",
    "Un effacement certifié des données est prévu en cas de remplacement ou en fin de contrat. Votre conseiller peut préciser la procédure, les sauvegardes à prévoir et les responsabilités de chacun avant la souscription.",
  ],
  [
    "Je veux une tablette ou un lecteur eID. C’est possible ?",
    "Votre offre est personnalisable sur devis. Précisez les équipements souhaités et les outils que vous utilisez : votre conseiller vérifie la configuration adaptée.",
  ],
  [
    "Le matériel reconditionné est-il garanti ?",
    "Oui, le matériel est testé et bénéficie de la garantie prévue pendant le contrat. L’état, les caractéristiques et les modalités de prise en charge sont détaillés dans votre offre.",
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
      <symbol id="leaf" viewBox="0 0 24 24"><path d="M20 3S6 1 4 10s6 12 11 7 5-14 5-14ZM3 22 16 8" /></symbol>
      <symbol id="laptop" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="12" rx="1" /><path d="m4 16-3 4h22l-3-4M9 20h6" /></symbol>
      <symbol id="box" viewBox="0 0 24 24"><path d="m12 2 9 5v10l-9 5-9-5V7zm0 10 9-5M12 12 3 7m9 5v10M7 4.5l9 5" /></symbol>
    </defs>
  </svg>
);

const Header = ({ onStart }) => (
  <header className="site-header">
    <div className="container nav">
      <a className="brand" href="#main" aria-label="iTakecare, haut de page">
        <img src={logo} alt="iTakecare" width="167" height="38" />
        <span>pour les soignants</span>
      </a>
      <nav aria-label="Navigation de la page">
        <a href="#packs">Les packs</a>
        <a href="#accompagnement">L’accompagnement</a>
        <a href="#questions">Vos questions</a>
      </nav>
      <a className="button button-small" href="#offre" onClick={() => onStart()}>
        Mon offre personnalisée <Svg id="arrow" />
      </a>
    </div>
  </header>
);

const Hero = ({ onStart }) => (
  <section className="hero container" aria-labelledby="hero-title">
    <div className="hero-copy">
      <p className="eyebrow">
        <span className="live-dot" /> INFIRMIER·ES, KINÉS & SOIGNANTS INDÉPENDANTS
      </p>
      <h1 id="hero-title">
        Plus de temps
        <br />
        pour vos patients.
        <br />
        <em>
          Moins pour
          <br />
          l’informatique.
        </em>
      </h1>
      <p className="hero-description">
        Votre ordinateur, votre smartphone et une équipe qui s’occupe du reste. Un loyer fixe, l’esprit libre.
      </p>
      <div className="hero-actions">
        <a className="button" href="#offre" onClick={() => onStart()}>
          Je trouve mon pack <Svg id="arrow" />
        </a>
        <a className="text-link" href="#packs">
          Découvrir les packs <span>↗</span>
        </a>
      </div>
      <p className="reassurance">
        <Svg id="check" /> Devis sans engagement <span>·</span> Réponse sous 24 h ouvrables
      </p>
    </div>
    <div className="hero-visual">
      <div className="photo-frame">
        <img
          src={heroImage}
          alt="Une soignante termine son administration sur son ordinateur, dans un cadre calme et lumineux."
          width="1536"
          height="1024"
          fetchpriority="high"
        />
        <span className="photo-label">Votre quotidien, en plus simple.</span>
      </div>
      <div className="care-note">
        <span className="note-icon">
          <Svg id="headset" />
        </span>
        <div>
          <strong>Vous prenez soin des autres.</strong>
          <span>On prend soin de votre matériel.</span>
        </div>
      </div>
      <div className="hero-price">
        <span>Votre pack complet dès</span>
        <div>
          <strong>
            78,90<span> €</span>
          </strong>
          <span>HTVA / mois</span>
        </div>
        <small>Matériel + maintenance + garantie · 36 mois</small>
      </div>
      <span className="visual-caption">PHOTOGRAPHIE D’ILLUSTRATION</span>
    </div>
  </section>
);

const BenefitsBar = () => (
  <div className="benefits-bar">
    <div className="container benefits-grid">
      <div>
        <Svg id="refresh" />
        <p>
          <strong>Votre activité continue</strong>
          <span>Remplacement sous 24 h en cas de panne*</span>
        </p>
      </div>
      <div>
        <Svg id="box" />
        <p>
          <strong>Prêt à travailler</strong>
          <span>Livraison gratuite en 3 à 5 jours*</span>
        </p>
      </div>
      <div>
        <Svg id="shield" />
        <p>
          <strong>Un budget sans surprise</strong>
          <span>Maintenance et garantie incluses</span>
        </p>
      </div>
    </div>
  </div>
);

const PackCard = ({ apple, tag, image, alt, name, tagline, os, price, equipment, packKey, url, onChoose }) => (
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
        <Svg id="check" /> Maintenance, garantie & remplacement 24 h*
      </p>
      <a className={`button${apple ? "" : " button-outline"}`} href="#offre" onClick={() => onChoose(packKey)}>
        Personnaliser mon {packKey} <Svg id="arrow" />
      </a>
      <a className="catalogue" href={url} target="_blank" rel="noopener noreferrer">
        Voir la fiche complète <span>↗</span>
      </a>
    </div>
  </article>
);

const Packs = ({ onChoose }) => (
  <section className="section packs-section container" id="packs" aria-labelledby="packs-title">
    <div className="section-heading">
      <div>
        <p className="eyebrow">BIEN ÉQUIPÉ, TOUT SIMPLEMENT</p>
        <h2 id="packs-title">
          Votre métier vous ressemble.
          <br />
          Votre pack aussi.
        </h2>
      </div>
      <p>
        Au cabinet, en tournée ou à la maison.{" "}
        <br />
        Choisissez votre univers, on s’occupe du reste.
      </p>
    </div>
    <div className="pack-grid">
      <PackCard
        tag="L’ESSENTIEL WINDOWS"
        image={iwinImage}
        alt="Illustration du pack Windows : ordinateur portable, smartphone, hub et souris."
        name="Le pack iWin"
        tagline="Efficace au cabinet. Léger en tournée."
        os="Windows"
        price="78,90"
        equipment={[
          ["Ordinateur", "HP ProBook 440 G11"],
          ["Smartphone", "Samsung Galaxy S24 Ultra"],
          ["Et aussi", "Hub USB-C, souris, Office 2024"],
        ]}
        packKey="iWin"
        url="https://www.itakecare.be/catalogue/pack/265dce6d-454a-437d-a975-db4bb5acf466"
        onChoose={onChoose}
      />
      <PackCard
        apple
        tag="L’EXPÉRIENCE APPLE"
        image={idiscoveryImage}
        alt="Illustration du pack Apple : ordinateur portable, smartphone, hub et souris."
        name="Le pack iDiscovery"
        tagline="Votre univers Apple. Partout avec vous."
        os="macOS"
        price="89,90"
        equipment={[
          ["Ordinateur", "MacBook Air 13 M4"],
          ["Smartphone", "iPhone 16 Pro Max"],
          ["Et aussi", "Hub USB-C, Magic Mouse 2, Office 2024"],
        ]}
        packKey="iDiscovery"
        url="https://www.itakecare.be/catalogue/pack/fd591ae8-90ca-4668-9dd8-9c88984f9cb5"
        onChoose={onChoose}
      />
    </div>
    <div className="packs-footnote">
      <p>Prix HTVA, leasing de 36 mois. Visuels à titre d’illustration ; configuration détaillée sur devis.</p>
      <a href="#offre" onClick={() => onChoose("Conseil")}>
        Besoin d’un autre équipement ? Parlons-en <span>↗</span>
      </a>
    </div>
  </section>
);

const Care = ({ onStart }) => (
  <section className="care-section" id="accompagnement">
    <div className="container care-grid">
      <div className="care-photo">
        <img
          src={kineImage}
          alt="Deux professionnels échangent autour d’un ordinateur dans un cabinet de kinésithérapie."
          width="1536"
          height="1024"
          loading="lazy"
        />
        <div className="care-photo-note">
          <Svg id="leaf" />
          <p>
            <strong>
              Du bon matériel.
              <br />
              Une seconde vie.
            </strong>
            <span>Reconditionné, testé et garanti.</span>
          </p>
        </div>
      </div>
      <div className="care-copy">
        <p className="eyebrow">LE MATÉRIEL, C’EST LE DÉBUT</p>
        <h2>
          Le vrai confort ?
          <br />
          Se sentir accompagné.
        </h2>
        <p>Une journée de soins est déjà bien remplie. Votre informatique doit vous simplifier la vie.</p>
        <div className="service-list">
          {[
            [
              "Un équipement adapté à vos outils",
              "Dites-nous quel logiciel de soins ou de facturation vous utilisez. Nous vérifions sa compatibilité avant la livraison.",
            ],
            [
              "Un interlocuteur quand ça compte",
              "Une question, un souci technique ? Votre conseiller en Belgique vous accompagne, avec la maintenance incluse.",
            ],
            [
              "Une solution en cas de panne",
              "Le remplacement sous 24 h* vous aide à reprendre votre activité, sans attendre une longue réparation.",
            ],
          ].map(([title, text], i) => (
            <div key={title}>
              <span>0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
        <a className="text-link" href="#offre" onClick={() => onStart()}>
          Parlons de votre quotidien <span>↗</span>
        </a>
      </div>
    </div>
  </section>
);

const Steps = () => (
  <section className="section container steps-section" aria-labelledby="steps-title">
    <div className="center-heading">
      <p className="eyebrow">VOUS AVEZ D’AUTRES PRIORITÉS</p>
      <h2 id="steps-title">Trois étapes. Et vous voilà équipé.</h2>
      <p>Un parcours simple, avec quelqu’un pour vous guider.</p>
    </div>
    <div className="steps-grid">
      {[
        ["laptop", "On trouve votre pack", "Votre métier, vos logiciels, vos habitudes : on part de vos besoins pour composer votre offre."],
        ["check", "Vous validez sereinement", "Vous recevez un devis clair. Si tout vous convient, vous signez votre contrat en ligne."],
        ["box", "Vous ouvrez. Vous travaillez.", "Votre matériel arrive gratuitement en 3 à 5 jours*, configuré et prêt à l’emploi."],
      ].map(([icon, title, text], i) => (
        <article key={title}>
          <span className="step-number">0{i + 1}</span>
          <Svg id={icon} />
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </div>
  </section>
);

const Comparison = ({ onStart }) => (
  <section className="comparison-section">
    <div className="container comparison-grid">
      <div>
        <p className="eyebrow">UNE AUTRE FAÇON DE S’ÉQUIPER</p>
        <h2>
          Votre trésorerie
          <br />
          respire aussi.
        </h2>
        <p>
          Un loyer fixe pour le matériel et son suivi.
          <br />
          Vous savez où vous allez, mois après mois.
        </p>
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
        {[
          ["Au démarrage", "Prix du matériel à payer", "Un loyer mensuel", false],
          ["Maintenance", "À organiser", "Déjà incluse", true],
          ["En cas de panne", "Réparation à gérer", "Remplacement 24 h*", true],
          ["Votre matériel", "Neuf ou d’occasion", "Reconditionné garanti", true],
        ].map(([label, buy, lease, check]) => (
          <div className="comparison-row" role="row" key={label}>
            <span role="rowheader">{label}</span>
            <span role="cell">{buy}</span>
            <strong role="cell">
              {lease} {check && <span>✓</span>}
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
        <p className="eyebrow">ON VOUS RÉPOND</p>
        <h2>
          Les bonnes questions,
          <br />
          avant de se lancer.
        </h2>
        <p>
          Et si la vôtre n’est pas ici,
          <br />
          votre conseiller est là pour y répondre.
        </p>
        <a className="text-link" href="#offre" onClick={() => onStart()}>
          Être conseillé <span>↗</span>
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
  const { step, setStep, profession, setProfession, pack, setPack } = form;
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
    if (step === 1) return profession ? goTo(2) : setError("Choisissez votre profession pour continuer.");
    if (step === 2) return pack ? goTo(3) : setError("Choisissez un pack ou demandez conseil pour continuer.");

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
    // État réel de la case (l'auto-remplissage peut la cocher sans passer par onChange).
    if (!e.currentTarget.elements.consent?.checked) {
      return setError("Merci d’accepter d’être recontacté·e pour recevoir votre offre.");
    }

    const choice = PACK_CHOICES[pack];
    const catalogPack = sante.packs.items.find((item) => item.name === choice.packName);
    setSending(true);
    try {
      await submitLead({
        vertical: sante.slug,
        profile: profession,
        need: choice.packName ?? "Conseil personnalisé",
        packPrice: catalogPack?.price,
        packProducts: catalogPack?.products ?? [],
        ...contact,
        consent: true,
      });
      track("Lead", { content_category: sante.slug });
      navigate(`/lp/${sante.slug}/merci`);
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
        <span>Votre offre personnalisée</span>
      </div>
      <div className="progress" aria-hidden="true">
        <span style={{ width: `${(step * 100) / 3}%` }} />
      </div>

      {step === 1 && (
        <fieldset>
          <legend tabIndex={-1} ref={(el) => (legendRefs.current[1] = el)}>
            Quel est votre métier ?
          </legend>
          <p className="form-hint">Pour partir de votre réalité, tout simplement.</p>
          <div className="choice-stack profession-choices">
            {PROFESSIONS.map((item) => (
              <label className="choice" key={item.value}>
                <input
                  type="radio"
                  name="profession"
                  value={item.value}
                  checked={profession === item.value}
                  onChange={() => {
                    setProfession(item.value);
                    setError(null);
                  }}
                />
                <span className="choice-symbol">{item.symbol}</span>
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

      {step === 2 && (
        <fieldset>
          <legend tabIndex={-1} ref={(el) => (legendRefs.current[2] = el)}>
            Quel univers vous convient ?
          </legend>
          <p className="form-hint">Votre choix reste ajustable avec votre conseiller.</p>
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
            Faisons connaissance.
          </legend>
          <p className="form-hint">Les champs marqués d’un * sont obligatoires.</p>
          <div className="field-row">
            <label className="field">
              Votre prénom *
              <input {...fieldProps("firstName")} autoComplete="given-name" maxLength={80} placeholder="Ex. Camille" />
            </label>
            <label className="field">
              Votre nom *
              <input {...fieldProps("lastName")} autoComplete="family-name" maxLength={80} placeholder="Ex. Dubois" />
            </label>
          </div>
          <label className="field">
            Votre adresse e-mail *
            <input {...fieldProps("email")} type="email" autoComplete="email" maxLength={180} placeholder="vous@exemple.be" />
          </label>
          <label className="field">
            Téléphone <span>(facultatif)</span>
            <input {...fieldProps("phone")} type="tel" autoComplete="tel" maxLength={30} placeholder="Pour un échange plus direct" />
          </label>
          <label className="field">
            Votre cabinet ou société <span>(facultatif)</span>
            <input {...fieldProps("company")} autoComplete="organization" maxLength={200} placeholder="Ex. Cabinet Dubois" />
          </label>
          <label className="field">
            Votre logiciel ou besoin particulier <span>(facultatif)</span>
            <textarea {...fieldProps("message")} rows={2} maxLength={500} placeholder="Nom du logiciel, lecteur eID, tablette…" />
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
        <p className="eyebrow">À VOUS DE PRENDRE SOIN DE VOUS</p>
        <h2 id="offer-title">
          Votre prochain pack
          <br />
          commence par
          <br />
          une conversation.
        </h2>
        <p>Quelques informations pour vous proposer le bon équipement. Votre conseiller s’occupe de la suite.</p>
        <ul>
          {["Une offre adaptée à votre activité", "Un devis sans engagement", "Une réponse sous 24 h ouvrables"].map((item) => (
            <li key={item}>
              <Svg id="check" /> {item}
            </li>
          ))}
        </ul>
        <div className="offer-signature">
          <Svg id="headset" />
          <p>
            Des outils qui fonctionnent.
            <br />
            <strong>Des humains qui répondent.</strong>
          </p>
        </div>
      </div>
      <div className="form-card">
        <LeadForm form={form} />
      </div>
    </div>
  </section>
);

export const Footer = () => (
  <footer className="site-footer container">
    <div>
      <a href="#main" aria-label="Retour en haut">
        <img src={logo} alt="iTakecare" width="147" height="34" />
      </a>
      <p>Votre informatique. Notre attention.</p>
    </div>
    <div>
      <a href="https://www.itakecare.be/mentions-legales" target="_blank" rel="noopener noreferrer">
        Mentions légales
      </a>
      <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer">
        Confidentialité
      </a>
      <a href="https://www.itakecare.be/conditions-generales" target="_blank" rel="noopener noreferrer">
        Conditions générales
      </a>
      <span>© {new Date().getFullYear()} iTakecare</span>
    </div>
  </footer>
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
        <small>Pack complet dès</small>
        <strong>
          78,90 € <span>HTVA / mois</span>
        </strong>
      </div>
      <a className="button button-small" href="#offre" onClick={() => onStart()}>
        Mon offre <Svg id="arrow" />
      </a>
    </div>
  );
};

export const SantePage = () => {
  const [step, setStep] = useState(1);
  const [profession, setProfession] = useState(null);
  const [pack, setPack] = useState(null);

  // Tout appel à l'action ramène au début du formulaire ; un bouton de pack pré-sélectionne ce pack.
  const start = (packKey) => {
    if (packKey) setPack(packKey);
    setStep(1);
  };

  return (
    <div className="sante-lp">
      <IconLibrary />
      <Header onStart={start} />
      <main id="main">
        <Hero onStart={start} />
        <BenefitsBar />
        <Packs onChoose={start} />
        <Care onStart={start} />
        <Steps />
        <Comparison onStart={start} />
        <Faq onStart={start} />
        <Offer form={{ step, setStep, profession, setProfession, pack, setPack }} />
        <div className="conditions container">
          <p>* Délais de remplacement et de livraison selon les conditions du contrat, précisées dans votre devis.</p>
        </div>
      </main>
      <Footer />
      <MobileCta onStart={start} />
    </div>
  );
};

// Page de remerciement santé, dans le même style.
export const SanteThankYou = () => (
  <div className="sante-lp">
    <IconLibrary />
    <header className="site-header">
      <div className="container nav">
        <a className="brand" href="/lp/sante" aria-label="iTakecare, retour à la page">
          <img src={logo} alt="iTakecare" width="167" height="38" />
          <span>pour les soignants</span>
        </a>
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
                Merci, on s’occupe
                <br />
                de la suite.
              </h3>
              <p>Un conseiller iTakecare vous recontacte sous 24 h ouvrables avec une offre adaptée à votre pratique.</p>
              <dl>
                <dt>1</dt>
                <dd>Vous recevez un e-mail de confirmation.</dd>
                <dt>2</dt>
                <dd>Votre conseiller vous appelle pour comprendre vos besoins et vos logiciels.</dd>
                <dt>3</dt>
                <dd>Vous recevez votre offre personnalisée.</dd>
              </dl>
              <a className="button button-outline" href="/lp/sante">
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
