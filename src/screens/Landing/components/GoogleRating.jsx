import React from "react";

// Note de la fiche Google iTakecare, relevée le 03/11/2026. À mettre à jour à la main
// quand elle change : on n'affiche jamais une note qu'on ne peut pas montrer sur Google.
const RATING = "4,6";
const REVIEWS = 12;

const style = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  marginTop: 10,
  fontSize: 13,
  color: "inherit",
};

export const GoogleRating = () => (
  <p style={style} aria-label={`Note Google : ${RATING} sur 5, ${REVIEWS} avis`}>
    <span style={{ color: "#f5a623", letterSpacing: 1 }} aria-hidden="true">
      ★★★★★
    </span>
    <span>
      <strong>{RATING}/5</strong> sur Google · {REVIEWS} avis clients
    </span>
  </p>
);
