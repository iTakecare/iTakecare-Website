// Suivi des campagnes (UTM / fbclid), événements Meta Pixel et envoi des leads.

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

// Le pixel Meta (fbq) est chargé ailleurs, après consentement cookies. Sans lui, on ne fait rien.
export const track = (event, data = {}) => {
  if (typeof window.fbq === "function") window.fbq("track", event, data);
};

// Les leads passent par la fonction `landing-lead` du backend itakecare.be,
// qui les transmet à Leazr avec la source du funnel (funnelsante, funnelimmo, funnelpme).
const API_URL = import.meta.env.VITE_ITAKECARE_API_URL;
const ANON_KEY = import.meta.env.VITE_ITAKECARE_ANON_KEY;

export const submitLead = async (lead) => {
  const payload = { ...lead, ...captureAttribution(), page: window.location.pathname };

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
};
