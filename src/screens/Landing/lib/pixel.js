// Pixel Meta des landing pages (« Pixel de Compte pub - iTakecare »).
// RGPD : rien n'est chargé ni envoyé à Meta avant « Accepter » dans la bannière cookies.
// Les événements survenus avant la décision attendent ici et partent à l'acceptation.

const PIXEL_ID = "281347450810783";
const CONSENT_KEY = "itc_cookie_consent";
const pending = [];

export const getConsent = () => {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
};

const loadPixel = () => {
  if (window.fbq) return;
  // Code de base fourni par Meta.
  /* eslint-disable */
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable */
  window.fbq("init", PIXEL_ID);
  window.fbq("track", "PageView");
};

// « granted » ou « denied », retenu pour les visites suivantes.
export const setConsent = (value) => {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // navigation privée : le choix ne vaut que pour cette page
  }
  if (value === "granted") {
    loadPixel();
    pending.splice(0).forEach(([event, data, options]) => window.fbq("track", event, data, options));
  } else {
    pending.length = 0;
  }
};

// `eventId` : identifiant partagé avec l'envoi serveur (API Conversions), pour que Meta ne compte l'événement qu'une fois.
export const trackPixel = (event, data, eventId) => {
  const options = eventId ? { eventID: eventId } : undefined;
  const consent = getConsent();
  if (consent === "granted") {
    loadPixel();
    window.fbq("track", event, data, options);
  } else if (!consent) {
    pending.push([event, data, options]);
  }
};

// Cookies du pixel (_fbp, _fbc), transmis au serveur pour améliorer la correspondance.
export const readPixelCookies = () => {
  const cookies = Object.fromEntries(
    document.cookie.split("; ").map((part) => [part.split("=")[0], decodeURIComponent(part.split("=").slice(1).join("="))]),
  );
  return { fbp: cookies._fbp, fbc: cookies._fbc };
};
