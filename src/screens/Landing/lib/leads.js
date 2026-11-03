// Suivi des campagnes (UTM / fbclid), événements Meta Pixel et envoi des leads.

import { getConsent, readPixelCookies, trackPixel } from "./pixel";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"];
const STORAGE_KEY = "itc_attribution";

// À appeler à l'arrivée sur la LP : garde les paramètres de la pub pour le formulaire.
export const captureAttribution = () => {
  const params = new URLSearchParams(window.location.search);
  const found = {};
  UTM_KEYS.forEach((key) => {
    if (params.get(key)) found[key] = params.get(key);
  });
  try {
    if (Object.keys(found).length) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return found;
  }
};

// Identifiant du dernier lead envoyé : l'événement Lead du pixel le réutilise (dédoublonnage avec le serveur).
let lastLeadEventId = null;

// Événement Meta Pixel, envoyé seulement si le visiteur accepte les cookies (voir pixel.js).
export const track = (event, data = {}) => trackPixel(event, data, event === "Lead" ? lastLeadEventId : undefined);

// Lien sortant vers le site (fiche, configurateur) : les paramètres de la pub suivent le visiteur.
export const withAttribution = (href) => {
  const url = new URL(href);
  Object.entries(captureAttribution()).forEach(([key, value]) => url.searchParams.set(key, value));
  return url.toString();
};

// Téléphone obligatoire dans les formulaires : chiffres, espaces et + . / - ( ),
// de 9 à 15 chiffres (fixe ou mobile belge, format international).
export const isValidPhone = (value) =>
  /^\+?[\d\s./()-]+$/.test(value.trim()) && /^\d{9,15}$/.test(value.replace(/\D/g, ""));

// Les leads passent par la fonction `landing-lead` du backend itakecare.be,
// qui les transmet à Leazr avec la source du funnel (funnelsante, funnelimmo, funnelpme).
const API_URL = import.meta.env.VITE_ITAKECARE_API_URL;
const ANON_KEY = import.meta.env.VITE_ITAKECARE_ANON_KEY;

export const submitLead = async (lead) => {
  const eventId = crypto.randomUUID();
  const adConsent = getConsent() === "granted";
  const payload = {
    ...lead,
    ...captureAttribution(),
    page: window.location.pathname,
    pageUrl: window.location.href,
    eventId,
    adConsent,
    ...(adConsent && readPixelCookies()),
  };

  const response = await fetch(`${API_URL}/functions/v1/landing-lead`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: ANON_KEY,
      Authorization: `Bearer ${ANON_KEY}`,
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(`Lead non envoyé (${response.status})`);
  lastLeadEventId = eventId;
};
