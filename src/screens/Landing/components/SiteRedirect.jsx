import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const SITE_URL = "https://www.itakecare.be/";

// En production, seules les URLs /lp/* sont servies par ce projet : une verticale inconnue
// renvoie vers le site principal plutôt que vers la page d'accueil de ce dépôt.
export const SiteRedirect = () => {
  useEffect(() => {
    if (import.meta.env.PROD) window.location.replace(SITE_URL);
  }, []);
  return import.meta.env.PROD ? null : <Navigate to="/" replace />;
};
