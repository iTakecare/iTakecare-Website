import React, { useState } from "react";
import { getConsent, setConsent } from "../lib/pixel";
import "./CookieBanner.css";

const PRIVACY_URL = "https://www.itakecare.be/politique-confidentialite";

// Bannière RGPD des LP : le pixel Meta ne se charge qu'après « Accepter ».
// Refuser est aussi simple qu'accepter ; le choix est retenu (localStorage).
export const CookieBanner = () => {
  const [visible, setVisible] = useState(() => !getConsent());
  if (!visible) return null;

  const decide = (value) => {
    setConsent(value);
    setVisible(false);
  };

  return (
    <div className="itc-cookie" role="dialog" aria-live="polite" aria-label="Gestion des cookies">
      <p>
        Nous utilisons des cookies de mesure publicitaire (Meta) pour savoir quelles annonces vous ont amené ici et
        améliorer nos campagnes.{" "}
        <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer">
          En savoir plus
        </a>
      </p>
      <div className="itc-cookie-actions">
        <button type="button" onClick={() => decide("denied")}>
          Refuser
        </button>
        <button type="button" onClick={() => decide("granted")}>
          Accepter
        </button>
      </div>
    </div>
  );
};
