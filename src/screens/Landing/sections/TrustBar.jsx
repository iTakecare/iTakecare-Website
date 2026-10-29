import React from "react";
import { Icon } from "../components/ui";

// Promesses iTakecare communes à toutes les verticales.
const ITEMS = [
  { icon: "shield", label: "Garantie pendant toute la durée du contrat" },
  { icon: "refresh", label: "Remplacement sous 24h" },
  { icon: "truck", label: "Livraison gratuite en 3 à 5 jours" },
  { icon: "check", label: "Reconditionné haut de gamme, testé" },
];

export const TrustBar = () => (
  <section className="border-y border-[#e1e1e1] bg-white">
    <ul className="mx-auto grid max-w-[1320px] grid-cols-2 gap-4 px-4 py-6 md:grid-cols-4 md:px-8 md:py-8">
      {ITEMS.map((item) => (
        <li key={item.label} className="flex items-center gap-3 text-sm font-medium text-[#222222] md:text-base">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#48b5c31f] text-[#48b5c3]">
            <Icon name={item.icon} className="h-5 w-5" />
          </span>
          {item.label}
        </li>
      ))}
    </ul>
  </section>
);
