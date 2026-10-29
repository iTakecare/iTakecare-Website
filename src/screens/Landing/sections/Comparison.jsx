import React from "react";
import { Icon, SectionTitle } from "../components/ui";

const ROWS = [
  ["Investissement de départ", "Tout, tout de suite", "0 €"],
  ["Coût mensuel", "Imprévisible (pannes, réparations)", "Fixe, tout compris"],
  ["En cas de panne", "Réparation à vos frais, délai inconnu", "Remplacement sous 24h"],
  ["Matériel dépassé", "À revendre ou à jeter", "Renouvellement facile"],
  ["Impact environnemental", "Fabrication d'un appareil neuf", "Reconditionné, CO₂ évité"],
];

export const Comparison = () => (
  <section className="px-4 py-16 md:px-8 md:py-24">
    <div className="mx-auto max-w-[920px]">
      <SectionTitle eyebrow="Le bon calcul" title="Acheter ou [louer] ?" />
      <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_20px_60px_rgba(11,31,51,0.1)] ring-1 ring-[#0b1f33]/5">
        <div className="grid grid-cols-[1.1fr_1fr_1fr] text-sm font-bold md:text-base">
          <div className="p-4" />
          <div className="p-4 text-[#0b1f33]/50">Achat classique</div>
          <div className="bg-[linear-gradient(120deg,#48b5c3,#7c6cf0)] p-4 text-white">Leasing iTakecare ✦</div>
        </div>
        {ROWS.map(([label, buy, lease]) => (
          <div key={label} className="grid grid-cols-[1.1fr_1fr_1fr] border-t border-[#0b1f33]/5 text-sm md:text-base">
            <div className="p-4 font-bold text-[#0b1f33]">{label}</div>
            <div className="flex items-start gap-2 p-4 text-[#0b1f33]/50">
              <span className="mt-0.5 hidden h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#0b1f33]/5 text-xs md:flex">✕</span>
              {buy}
            </div>
            <div className="flex items-start gap-2 bg-[linear-gradient(120deg,rgba(72,181,195,0.1),rgba(124,108,240,0.08))] p-4 font-semibold text-[#0b1f33]">
              <span className="lp-icon lp-icon-0 mt-0.5 hidden h-5 w-5 flex-shrink-0 rounded-full md:flex">
                <Icon name="check" className="h-3.5 w-3.5" />
              </span>
              {lease}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
