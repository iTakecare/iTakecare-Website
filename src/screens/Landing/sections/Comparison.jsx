import React from "react";
import { SectionTitle } from "../components/ui";

const ROWS = [
  ["Investissement de départ", "Tout, tout de suite", "0 €"],
  ["Coût mensuel", "Imprévisible (pannes, réparations)", "Fixe, tout compris"],
  ["En cas de panne", "Réparation à vos frais, délai inconnu", "Remplacement sous 24h"],
  ["Matériel dépassé", "À revendre ou à jeter", "Renouvellement facile"],
  ["Impact environnemental", "Fabrication d'un appareil neuf", "Reconditionné, CO₂ évité"],
];

export const Comparison = () => (
  <section className="px-4 py-16 md:px-8 md:py-24">
    <div className="mx-auto max-w-[900px]">
      <SectionTitle title="Acheter ou [louer] ?" />
      <div className="overflow-hidden rounded-[28px] border-2 border-[#e1e1e1]">
        <div className="grid grid-cols-[1.1fr_1fr_1fr] bg-[#f8f8f6] text-sm font-bold md:text-base">
          <div className="p-4" />
          <div className="p-4 text-[#222222]/60">Achat classique</div>
          <div className="bg-[#48b5c3] p-4 text-white">Leasing iTakecare</div>
        </div>
        {ROWS.map(([label, buy, lease]) => (
          <div key={label} className="grid grid-cols-[1.1fr_1fr_1fr] border-t border-[#e1e1e1] text-sm md:text-base">
            <div className="p-4 font-bold text-[#222222]">{label}</div>
            <div className="p-4 text-[#222222]/60">{buy}</div>
            <div className="bg-[#48b5c312] p-4 font-medium text-[#222222]">{lease}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
