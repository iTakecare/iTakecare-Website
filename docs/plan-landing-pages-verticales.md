# Plan — Landing pages verticales (funnel Facebook Ads)

> Objectif : tester 3 verticales via Meta Ads, chacune avec sa landing page dédiée, sur un même gabarit iTakecare.
> Une page = une cible = une promesse = **une seule action** (demander son pack / être rappelé).

---

## 0. Ce qu'on garde de l'ADN iTakecare

Repris du site actuel pour que la LP soit immédiatement reconnaissable :

| Élément | Valeur actuelle | Usage sur les LP |
|---|---|---|
| Couleur principale | `#48b5c3` (turquoise) — hover `#3da4b2` | CTA, mots-clés surlignés du H1, icônes |
| Texte | `#222222` | Titres et corps |
| Fond doux | `#f8f8f6` | Alternance des sections |
| Police | Inter (400 / 500 / 700 / 900) | H1 en 900, corps en 400/500 |
| Composants | `PixelBackground`, `GlowButton`, `ScrollReveal`, `FloatingCard` | Hero et cartes de bénéfices (avec parcimonie : perf mobile) |
| Promesses | Reconditionné haut de gamme, tout compris (maintenance + support), remplacement 24h, livraison 3–5 j gratuite, écoresponsable, logiciel de gestion de parc | Bloc réassurance commun |
| Preuve sociale | 4,8/5 satisfaction client | Sous le CTA du hero |

**Ton** : simple, direct, chaleureux, tutoiement interdit → vouvoiement, phrases courtes, zéro jargon IT. On parle *métier* du prospect, pas *matériel*.

**Valeurs à faire sentir** : sérénité (« on s'occupe de tout »), économie intelligente (pas d'investissement), durabilité (reconditionné), proximité (équipe belge, support humain).

---

## 1. Le funnel complet

```
Pub Facebook/Instagram (créa verticale)
        │  message-match : même accroche, même visuel, même couleur
        ▼
Landing page verticale  ──►  CTA unique « Recevoir mon pack »
        │
        ▼
Formulaire court en 2–3 étapes (dans la page, pas de redirection)
   1. Votre profil (choix en boutons : ex. Infirmier·e / Kiné / Autre)
   2. Votre besoin (portable / tablette / pack complet — nombre de postes)
   3. Coordonnées (prénom, e-mail, téléphone)
        │
        ▼
Page de remerciement verticale
   → prise de RDV directe (Calendly / agenda) « 15 min avec un conseiller »
   → rappel de l'offre + ce qui va se passer
        │
        ▼
Relance : e-mail J0 (récap pack) · SMS/WhatsApp J+1 si pas de RDV · e-mail J+3 (témoignage) · J+7 (dernière relance)
```

Règles du funnel :
- **Pas de menu de navigation** sur la LP (logo + bouton CTA uniquement). Chaque lien sortant = fuite de conversion.
- **Le formulaire commence par une question facile en boutons** (effet « pied dans la porte »), pas par l'e-mail.
- **Mobile d'abord** : ~90 % du trafic Meta est mobile → CTA sticky en bas d'écran.

---

## 2. Structure type d'une LP (ordre des sections)

Chaque section a un rôle précis dans la décision. Le gabarit est commun, seul le contenu change par verticale.

| # | Section | Rôle | Contenu |
|---|---|---|---|
| 1 | **Header minimal** | Confiance immédiate | Logo iTakecare + bouton « Recevoir mon pack » (+ n° de téléphone cliquable) |
| 2 | **Hero** | Capter en 3 secondes | H1 orienté métier (reprend la pub), sous-titre bénéfice, 3 puces ✅, CTA, prix d'appel « dès X €/mois HTVA », micro-preuve (4,8/5 + photo client) · Visuel : le pro *dans son contexte* avec le matériel |
| 3 | **Bandeau réassurance** | Lever le risque | 4 icônes : Garantie toute la durée · Remplacement 24h · Livraison gratuite 3–5 j · Matériel reconditionné testé |
| 4 | **Problème** | « Ils me comprennent » | 3 frustrations concrètes du métier, formulées avec leurs mots |
| 5 | **Le pack** | Rendre l'offre tangible | Carte produit : visuel du pack, contenu détaillé, prix mensuel, ce qui est inclus, CTA |
| 6 | **Comment ça marche** | Simplicité | 3 étapes (réutiliser `SectionEtapes`) : je choisis → je signe en ligne → je reçois |
| 7 | **Bénéfices** | Justifier | 3–4 cartes (`FloatingCard`) : trésorerie préservée, coût fixe, déductible, toujours à jour |
| 8 | **Témoignages** | Preuve sociale ciblée | 2–3 témoignages **du même métier** (photo, prénom, métier, ville), idéalement 1 vidéo courte |
| 9 | **Comparatif** | Ancrer la valeur | Acheter neuf vs. leasing iTakecare (investissement, panne, renouvellement, impact CO₂) |
| 10 | **FAQ objections** | Débloquer | 5–6 questions spécifiques au métier |
| 11 | **CTA final + garantie** | Passage à l'action | Rappel de l'offre, formulaire ou bouton, « Sans engagement, réponse sous 24h » |
| 12 | **Footer minimal** | Légal | Mentions légales, RGPD, contact |

---

## 3. Les 3 verticales

### 3.A — Professions libérales de santé (infirmier·es à domicile, kinés, …)

**Insight** : ils sont indépendants, travaillent seuls, n'ont ni le temps ni l'envie de gérer l'informatique, et une panne = journée de facturation perdue. Les données patients sont sensibles.

**Accroche pub / H1 (à tester)**
- A : « Votre matériel informatique de soignant, tout compris, dès X €/mois »
- B : « Soignez vos patients. On s'occupe de votre informatique. »
- C : « Une panne d'ordinateur ne doit plus vous empêcher de facturer. »

**Puces hero**
- ✅ Portable ou tablette léger pour vos tournées, prêt à l'emploi
- ✅ Remplacé sous 24h en cas de panne : vos tournées continuent
- ✅ Loyer déductible en frais professionnels *(à valider avec un comptable)*

**Pack « Soignant mobile »** *(contenu et prix à valider)* : portable léger ou tablette + lecteur de carte eID + housse + installation de base (navigateur, accès eHealth/MyCareNet prêt) + support.
Variante kiné « Cabinet » : PC fixe/écran pour le cabinet + portable.

**Frustrations à afficher** : « Mon PC rame pendant la facturation » · « Si mon ordi lâche, je perds une journée » · « Je n'ai pas le budget pour du neuf ».

**FAQ spécifique** : compatibilité avec mon logiciel de soins / facturation ? · lecteur eID inclus ? · données patients en cas de remplacement (effacement certifié) ? · puis-je déduire le loyer ? · que se passe-t-il si je change de statut ?

**Visuels** : infirmière en tenue, à domicile ou dans sa voiture avec tablette ; kiné dans son cabinet avec portable. Lumière naturelle, ton chaleureux. Éviter les photos de stock trop « hôpital ».

**Ciblage Meta** : intérêts infirmier·e, kinésithérapie, INAMI, indépendant santé · âge 25–55 · Belgique (FR) d'abord.

---

### 3.B — Agents immobiliers (angle mobilité)

**Insight** : ils vivent en déplacement (visites, estimations, signatures), leur image compte devant les clients, et leur matériel doit suivre : photos, fichiers lourds, visio, signature électronique.

**Accroche pub / H1 (à tester)**
- A : « Le bureau de l'agent immobilier tient dans un sac. »
- B : « Visites, estimations, signatures : un matériel qui suit votre rythme. »
- C : « Équipez votre agence sans toucher à votre trésorerie. »

**Puces hero**
- ✅ Portable léger et puissant + smartphone/tablette pour les visites
- ✅ Matériel premium (MacBook, iPad…) qui renforce votre image client
- ✅ Remplacement 24h : jamais bloqué entre deux visites

**Packs** *(à valider)* :
- « Agent nomade » (indépendant) : portable léger + smartphone ou tablette + accessoires.
- « Agence » (2–10 personnes) : postes de l'agence + matériel mobile + logiciel de gestion de parc inclus.

**Frustrations** : « Mon portable est trop lourd / trop lent pour les visites » · « Présenter une estimation sur un vieil écran, ça ne fait pas pro » · « Équiper un nouvel agent coûte une fortune ».

**FAQ spécifique** : compatible avec mon logiciel immo / mes portails ? · puis-je ajouter du matériel quand j'embauche ? · perte ou vol en déplacement ? · Mac ou PC ?

**Visuels** : agent devant une maison avec tablette montrant une estimation ; poignée de main avec portable ouvert ; mise en scène « sac + MacBook + iPad ».

**Ciblage Meta** : intérêts immobilier, Immoweb, IPI, agent immobilier · fonctions professionnelles · audience similaire aux clients existants.

---

### 3.C — Pack TPE / PME (généraliste)

**Insight** : le dirigeant gère l'IT « en plus », les achats de matériel pèsent sur la trésorerie, les pannes et l'arrivée d'un nouveau collaborateur sont des casse-têtes.

**Accroche pub / H1 (à tester)**
- A : « Votre parc informatique complet, pour un loyer fixe. Le reste, on s'en occupe. »
- B : « Arrêtez d'acheter vos ordinateurs. »
- C : « Un nouveau collaborateur ? Équipé en 3 jours, sans investissement. »

**Puces hero**
- ✅ Zéro investissement initial : trésorerie préservée
- ✅ Maintenance, support et remplacement 24h inclus
- ✅ Logiciel de gestion de parc IT inclus

**Packs** *(à valider)* : « Starter » (1–3 postes) · « Équipe » (4–10) · « Sur mesure » (10+). Afficher un **simulateur simple** (nombre de postes → mensualité estimée) : très engageant et qualifiant.

**Frustrations** : « Chaque achat de PC plombe la trésorerie » · « Personne ne gère vraiment l'informatique ici » · « Une panne = un collaborateur à l'arrêt ».

**FAQ spécifique** : durée du contrat (12–36 mois) ? · fin de contrat : renouvellement ou rachat ? · partenaire financier : pourquoi ? · ajout de postes en cours de contrat ? · impact comptable du leasing ?

**Visuels** : petite équipe dans un bureau lumineux ; capture du logiciel de gestion de parc ; dirigeant serein.

**Ciblage Meta** : gérants de PME, intérêts entrepreneuriat, comptabilité, UCM/UNIZO · audience similaire aux clients.

---

## 4. Visuels & créas

- **Message-match strict** : le visuel du hero = le visuel de la pub (même personne, même couleur turquoise). Le prospect doit sentir qu'il est « au bon endroit ».
- **Shooting réel** prioritaire (même smartphone, mais vrais pros, vrais lieux) > banque d'images. 1 demi-journée par verticale suffit.
- **Signature visuelle** : photo détourée du pro + matériel, sur le fond `PixelBackground` turquoise → cohérence avec la home.
- **Créas pub par verticale** (3 formats à tester) : image statique avec H1 · carrousel « ce que contient le pack » · vidéo verticale 15–20 s témoignage face caméra.
- **Images optimisées** : WebP, `loading="lazy"` sauf hero, hero < 150 Ko.

---

## 5. Réassurance (commune aux 3 pages)

- Garantie pendant toute la durée du contrat
- Remplacement sous 24h en cas de panne ou sinistre
- Livraison gratuite en 3–5 jours
- Matériel reconditionné haut de gamme, testé et certifié
- Effacement certifié des données en fin de contrat (argument fort pour la santé)
- Note clients 4,8/5 (lier à la source : Google / Trustpilot)
- Logos clients / « Ils nous font confiance » (déjà présents sur la home)
- Entreprise belge, conseiller humain joignable
- Équivalent CO₂ économisé vs. neuf (si chiffre disponible)

---

## 6. Témoignages — comment les obtenir

**Ne pas inventer de témoignages** (risque légal et de confiance). Plan de collecte :
1. Lister les clients actuels par verticale (santé, immo, PME).
2. Appeler 3–5 clients par verticale, proposer un geste (1 mois offert / accessoire) contre un témoignage écrit + photo, idéalement une vidéo de 20 s.
3. Format : photo, prénom + initiale, métier, ville, citation courte centrée sur *un* bénéfice (panne réglée, budget, image).
4. En attendant : utiliser les avis Google génériques + note 4,8/5, et lancer quand même (les témoignages ciblés seront un A/B test en phase 2).

---

## 7. Architecture technique (dans ce repo)

État actuel : Vite + React + Tailwind, une seule page (`HomePage`), positionnement absolu hérité d'Anima, `react-router-dom` installé mais non utilisé.

1. **Router** : brancher `react-router-dom` dans `src/index.jsx` → `/` (home), `/lp/sante`, `/lp/immobilier`, `/lp/pme`, `/lp/:vertical/merci`.
2. **Un seul gabarit** `src/screens/Landing/LandingPage.jsx` piloté par un fichier de config par verticale (`src/screens/Landing/verticals/sante.js`, `immobilier.js`, `pme.js`) : textes, visuels, pack, FAQ, témoignages. Ajouter une verticale = ajouter un fichier.
3. **Sections en composants réutilisables** (`LandingHero`, `TrustBar`, `PainPoints`, `PackCard`, `Steps`, `Benefits`, `Testimonials`, `Comparison`, `FaqAccordion`, `FinalCta`, `StickyCta`, `LeadForm`), **en flex/grid responsive** — ne pas reprendre le positionnement absolu de la home.
4. **Formulaire** multi-étapes → envoi vers le CRM (HubSpot ou webhook) avec champs cachés : `vertical`, `utm_source`, `utm_campaign`, `utm_content`, `fbclid`.
5. **Tracking** : Meta Pixel (`PageView`, `ViewContent`, `Lead` sur envoi, `Schedule` sur RDV) + **Conversions API** côté serveur (indispensable post-iOS 14) · GA4 · Microsoft Clarity (heatmaps/replays gratuits).
6. **Perf** : objectif LCP < 2,5 s sur 4G, Lighthouse mobile > 90. Animations `ScrollReveal` légères uniquement, pas de `MovingBlob` dans le hero mobile.
7. **SEO/Meta** : `noindex` sur les LP (trafic payant, évite la cannibalisation), balises OG propres.
8. **RGPD** : bandeau cookies (pixel chargé après consentement), case de consentement au formulaire, mention spécifique sur les données de santé (on ne collecte aucune donnée patient).

---

## 8. Tests & KPIs

| KPI | Cible de départ |
|---|---|
| CTR pub | > 1 % |
| Taux de conversion LP (visite → lead) | 8–15 % |
| Coût par lead (CPL) | à fixer selon la marge par contrat |
| Taux lead → RDV | > 40 % |
| Taux RDV → contrat signé | à mesurer |

**Méthode de test**
- Phase 1 : même budget par verticale (ex. 15–20 €/jour × 3), 14 jours, 2–3 créas par verticale. Juger sur le **coût par RDV**, pas seulement le CPL.
- Phase 2 : couper la verticale la moins rentable, doubler la meilleure, A/B tester **une variable à la fois** sur la LP (H1 → visuel hero → prix affiché ou non → longueur du formulaire).
- Revue hebdo : Clarity (où ça décroche ?), taux de complétion de chaque étape du formulaire.

---

## 9. Planning proposé

| Semaine | Livrables |
|---|---|
| S1 | Valider packs & prix par verticale · rédaction des 3 LP · lancer la collecte de témoignages · brief shooting |
| S2 | Développement gabarit + config 3 verticales · formulaire + CRM · Pixel + CAPI · page merci + prise de RDV |
| S3 | Shooting & créas pub · intégration visuels · QA mobile + perf · séquence de relance e-mail/SMS |
| S4 | Lancement des campagnes (3 × budget égal) |
| S5–S6 | Lecture des résultats · arbitrage · premiers A/B tests |

---

## 10. Décisions à prendre avant de démarrer

1. Contenu et **prix mensuel** de chaque pack (afficher un « dès X €/mois » augmente fortement la conversion et qualifie les leads).
2. Outil CRM / réception des leads et outil de prise de RDV.
3. Clients prêts à témoigner par verticale.
4. Budget publicitaire de test et seuil de rentabilité (CPL max acceptable).
5. Offre de lancement éventuelle (ex. 1er mois offert, accessoire offert) pour créer l'urgence.
