import { immobilier } from "./immobilier";
import { pme } from "./pme";
import { sante } from "./sante";

// Ajouter une verticale = créer son fichier de config et l'enregistrer ici.
export const VERTICALS = {
  [sante.slug]: sante,
  [immobilier.slug]: immobilier,
  [pme.slug]: pme,
};
